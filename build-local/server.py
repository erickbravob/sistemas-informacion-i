from __future__ import annotations

import json
import os
import sqlite3
import threading
import webbrowser
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "web"
DATA_ROOT = ROOT / "data"
DB_PATH = DATA_ROOT / "build.sqlite3"
HOST = "127.0.0.1"
PORT = 8766
MAX_BODY = 16_384


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def connect_db() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


@contextmanager
def database():
    connection = connect_db()
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def initialize_database() -> None:
    DATA_ROOT.mkdir(parents=True, exist_ok=True)
    with database() as db:
        db.execute("PRAGMA journal_mode = WAL")
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS project (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                working_name TEXT NOT NULL DEFAULT '',
                initial_idea TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS project_versions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sequence INTEGER NOT NULL UNIQUE,
                snapshot_json TEXT NOT NULL,
                summary TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS agenda_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL CHECK (length(title) BETWEEN 1 AND 180),
                due_date TEXT NOT NULL DEFAULT '',
                status TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'active', 'done')),
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );
            """
        )
        timestamp = now_iso()
        db.execute(
            "INSERT OR IGNORE INTO project (id, created_at, updated_at) VALUES (1, ?, ?)",
            (timestamp, timestamp),
        )


def snapshot_workspace(db: sqlite3.Connection, summary: str) -> int:
    project = db.execute("SELECT * FROM project WHERE id = 1").fetchone()
    agenda = db.execute(
        "SELECT title, due_date, status, created_at, updated_at FROM agenda_items ORDER BY id"
    ).fetchall()
    sequence = db.execute(
        "SELECT COALESCE(MAX(sequence), 0) + 1 FROM project_versions"
    ).fetchone()[0]
    payload = {
        "project": dict(project),
        "agenda": [dict(row) for row in agenda],
    }
    db.execute(
        "INSERT INTO project_versions (sequence, snapshot_json, summary, created_at) "
        "VALUES (?, ?, ?, ?)",
        (sequence, json.dumps(payload, ensure_ascii=False), summary, now_iso()),
    )
    return sequence


def project_data(db: sqlite3.Connection) -> dict:
    project = db.execute("SELECT * FROM project WHERE id = 1").fetchone()
    versions = db.execute(
        "SELECT sequence, summary, created_at FROM project_versions "
        "ORDER BY sequence DESC LIMIT 12"
    ).fetchall()
    items = db.execute(
        "SELECT id, title, due_date, status, created_at FROM agenda_items "
        "ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, "
        "COALESCE(NULLIF(due_date, ''), '9999-12-31'), id DESC"
    ).fetchall()
    return {
        "project": dict(project),
        "versions": [dict(row) for row in versions],
        "agenda": [dict(row) for row in items],
    }


class BuildHandler(BaseHTTPRequestHandler):
    server_version = "SIS1BuildLocal/1.0"

    def log_message(self, fmt: str, *args: object) -> None:
        print("%s - %s" % (self.log_date_time_string(), fmt % args))

    def send_bytes(self, status: int, body: bytes, content_type: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "same-origin")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'")
        self.end_headers()
        self.wfile.write(body)

    def send_json(self, status: int, value: dict | list) -> None:
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_bytes(status, body, "application/json; charset=utf-8")

    def send_problem(self, status: int, message: str) -> None:
        self.send_json(status, {"error": message})

    def host_is_local(self) -> bool:
        return self.headers.get("Host", "").split(":")[0].lower() in {
            "127.0.0.1",
            "localhost",
        }

    def origin_is_local(self) -> bool:
        origin = self.headers.get("Origin", "")
        return origin in {
            "http://127.0.0.1:%d" % PORT,
            "http://localhost:%d" % PORT,
        }

    def mutation_is_allowed(self) -> bool:
        if not self.host_is_local() or not self.origin_is_local():
            self.send_problem(403, "La solicitud debe venir de esta aplicación local.")
            return False
        return True

    def read_json(self) -> dict | None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_problem(400, "Tamaño de solicitud no válido.")
            return None
        if length < 1 or length > MAX_BODY:
            self.send_problem(413, "La solicitud supera el tamaño permitido.")
            return None
        try:
            value = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_problem(400, "El contenido debe ser JSON válido.")
            return None
        if not isinstance(value, dict):
            self.send_problem(400, "El contenido debe ser un objeto.")
            return None
        return value

    def do_GET(self) -> None:
        path = unquote(urlparse(self.path).path)
        if not self.host_is_local():
            self.send_problem(403, "El servicio solo acepta conexiones locales.")
            return
        if path == "/api/health":
            self.send_json(200, {"status": "ready", "storage": "sqlite-local", "ai": "not-connected"})
            return
        if path == "/api/workspace":
            with database() as db:
                self.send_json(200, project_data(db))
            return
        if path == "/api/report.md":
            with database() as db:
                data = project_data(db)
            project = data["project"]
            idea = project["initial_idea"].strip() or "_La idea del producto todavía está pendiente._"
            name = project["working_name"].strip() or "Por definir"
            versions = data["versions"]
            lines = [
                "# Registro del proyecto final",
                "",
                "- Nombre provisional: " + name,
                "- Estado: borrador local",
                "- Última actualización: " + project["updated_at"],
                "",
                "## Idea inicial",
                "",
                idea,
                "",
                "## Agenda",
                "",
            ]
            lines.extend(
                "- [%s] %s%s"
                % (
                    "x" if item["status"] == "done" else " ",
                    item["title"],
                    (" — fecha: " + item["due_date"]) if item["due_date"] else "",
                )
                for item in data["agenda"]
            )
            if not data["agenda"]:
                lines.append("_Todavía no hay tareas registradas._")
            lines.extend(["", "## Historial de versiones", ""])
            lines.extend(
                "- v%s · %s · %s" % (version["sequence"], version["created_at"], version["summary"])
                for version in reversed(versions)
            )
            body = ("\n".join(lines) + "\n").encode("utf-8")
            self.send_bytes(200, body, "text/markdown; charset=utf-8")
            return
        self.serve_static(path)

    def serve_static(self, path: str) -> None:
        relative = "index.html" if path == "/" else path.lstrip("/")
        target = (WEB_ROOT / relative).resolve()
        if WEB_ROOT.resolve() not in target.parents and target != WEB_ROOT.resolve():
            self.send_problem(403, "Ruta no permitida.")
            return
        if not target.is_file():
            self.send_problem(404, "No se encontró el recurso.")
            return
        content_types = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "text/javascript; charset=utf-8",
            ".svg": "image/svg+xml",
        }
        self.send_bytes(200, target.read_bytes(), content_types.get(target.suffix, "application/octet-stream"))

    def do_PUT(self) -> None:
        if self.path != "/api/idea" or not self.mutation_is_allowed():
            if self.path != "/api/idea":
                self.send_problem(404, "Ruta no encontrada.")
            return
        payload = self.read_json()
        if payload is None:
            return
        name = str(payload.get("working_name", "")).strip()[:100]
        idea = str(payload.get("initial_idea", "")).strip()
        if not idea or len(idea) > 5000:
            self.send_problem(422, "Describe la idea en un máximo de 5000 caracteres.")
            return
        timestamp = now_iso()
        with database() as db:
            previous = db.execute("SELECT * FROM project WHERE id = 1").fetchone()
            if previous["working_name"] == name and previous["initial_idea"] == idea:
                self.send_json(200, {"saved": True, "changed": False, "workspace": project_data(db)})
                return
            db.execute(
                "UPDATE project SET working_name = ?, initial_idea = ?, updated_at = ? WHERE id = 1",
                (name, idea, timestamp),
            )
            current = db.execute("SELECT * FROM project WHERE id = 1").fetchone()
            sequence = snapshot_workspace(db, "Se guardó la idea inicial del proyecto.")
            data = project_data(db)
        self.send_json(200, {"saved": True, "changed": True, "version": sequence, "workspace": data})

    def do_POST(self) -> None:
        if self.path != "/api/agenda" or not self.mutation_is_allowed():
            if self.path != "/api/agenda":
                self.send_problem(404, "Ruta no encontrada.")
            return
        payload = self.read_json()
        if payload is None:
            return
        title = str(payload.get("title", "")).strip()
        due_date = str(payload.get("due_date", "")).strip()
        if not title or len(title) > 180:
            self.send_problem(422, "Escribe una tarea de hasta 180 caracteres.")
            return
        if due_date:
            try:
                datetime.strptime(due_date, "%Y-%m-%d")
            except ValueError:
                self.send_problem(422, "La fecha debe tener el formato indicado.")
                return
        timestamp = now_iso()
        with database() as db:
            cursor = db.execute(
                "INSERT INTO agenda_items (title, due_date, status, created_at, updated_at) "
                "VALUES (?, ?, 'pending', ?, ?)",
                (title, due_date, timestamp, timestamp),
            )
            item_id = cursor.lastrowid
            snapshot_workspace(db, "Se agregó una tarea a la agenda.")
            data = project_data(db)
        self.send_json(201, {"saved": True, "item_id": item_id, "workspace": data})

    def do_PATCH(self) -> None:
        prefix = "/api/agenda/"
        if not self.path.startswith(prefix) or not self.mutation_is_allowed():
            if not self.path.startswith(prefix):
                self.send_problem(404, "Ruta no encontrada.")
            return
        try:
            item_id = int(self.path[len(prefix):])
        except ValueError:
            self.send_problem(400, "Identificador no válido.")
            return
        payload = self.read_json()
        if payload is None:
            return
        status = payload.get("status")
        if status not in {"pending", "active", "done"}:
            self.send_problem(422, "Estado no válido.")
            return
        with database() as db:
            cursor = db.execute(
                "UPDATE agenda_items SET status = ?, updated_at = ? WHERE id = ?",
                (status, now_iso(), item_id),
            )
            if cursor.rowcount == 0:
                self.send_problem(404, "No se encontró la tarea.")
                return
            snapshot_workspace(db, "Se actualizó el estado de una tarea.")
            data = project_data(db)
        self.send_json(200, {"saved": True, "workspace": data})

    def do_DELETE(self) -> None:
        prefix = "/api/agenda/"
        if not self.path.startswith(prefix) or not self.mutation_is_allowed():
            if not self.path.startswith(prefix):
                self.send_problem(404, "Ruta no encontrada.")
            return
        try:
            item_id = int(self.path[len(prefix):])
        except ValueError:
            self.send_problem(400, "Identificador no válido.")
            return
        with database() as db:
            cursor = db.execute("DELETE FROM agenda_items WHERE id = ?", (item_id,))
            if cursor.rowcount == 0:
                self.send_problem(404, "No se encontró la tarea.")
                return
            snapshot_workspace(db, "Se eliminó una tarea de la agenda.")
            data = project_data(db)
        self.send_json(200, {"saved": True, "workspace": data})


def main() -> None:
    initialize_database()
    httpd = ThreadingHTTPServer((HOST, PORT), BuildHandler)
    httpd.daemon_threads = True
    url = "http://%s:%d/" % (HOST, PORT)
    print("Espacio Build local disponible en %s" % url)
    print("Los datos se guardan en: %s" % DB_PATH)
    print("Cierra esta ventana o presiona Ctrl+C para detener el servidor.")
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
