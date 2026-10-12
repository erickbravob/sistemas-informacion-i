const byId = (id) => document.getElementById(id);
const ideaInput = byId("initial-idea");
const nameInput = byId("working-name");
const saveButton = byId("save-idea");
const saveMessage = byId("save-message");
const draftIndicator = byId("draft-indicator");
const toast = byId("toast");
let workspace = null;
let toastTimer = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

async function request(path, options) {
  const response = await fetch(path, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers ? options.headers : {})
    }
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "No se pudo completar la solicitud.");
  }
  return payload;
}

function setConnection(ready, label) {
  const status = byId("connection-status");
  status.classList.toggle("is-ready", ready);
  status.querySelector("span").textContent = label;
}

function formatDate(value) {
  if (!value) return "sin fecha";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-BO", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function renderAgenda(items) {
  const list = byId("agenda-list");
  const empty = byId("agenda-empty");
  byId("agenda-count").textContent = items.length + (items.length === 1 ? " tarea" : " tareas");
  empty.hidden = items.length > 0;
  list.innerHTML = items.map((item) => {
    const due = item.due_date ? "Fecha prevista · " + item.due_date : "Sin fecha definida";
    const isDone = item.status === "done";
    return '<li class="agenda-item' + (isDone ? " is-done" : "") + '">' +
      '<button type="button" class="agenda-state" data-agenda-toggle="' + item.id + '" aria-label="' + (isDone ? "Reabrir" : "Completar") + ' tarea">' + (isDone ? "✓" : "·") + "</button>" +
      '<div class="agenda-copy"><b>' + escapeHtml(item.title) + '</b><small>' + escapeHtml(due) + "</small></div>" +
      '<select class="agenda-status" data-agenda-status="' + item.id + '" aria-label="Estado de la tarea">' +
        '<option value="pending"' + (item.status === "pending" ? " selected" : "") + ">Pendiente</option>" +
        '<option value="active"' + (item.status === "active" ? " selected" : "") + ">En curso</option>" +
        '<option value="done"' + (isDone ? " selected" : "") + ">Realizada</option>" +
      "</select><button type='button' class='agenda-delete' data-agenda-delete='" + item.id + "' aria-label='Quitar tarea'>×</button></li>";
  }).join("");
}

function renderVersions(versions) {
  const list = byId("version-list");
  const empty = byId("versions-empty");
  byId("version-count").textContent = versions.length + (versions.length === 1 ? " versión" : " versiones");
  empty.hidden = versions.length > 0;
  list.innerHTML = versions.map((version) =>
    '<li class="version-item"><span>V' + String(version.sequence).padStart(2, "0") +
    '</span><div><b>' + escapeHtml(version.summary) + '</b><small>' +
    escapeHtml(formatDate(version.created_at)) + "</small></div></li>"
  ).join("");
}

function renderWorkspace(data, populateFields) {
  workspace = data;
  const project = data.project;
  if (populateFields) {
    nameInput.value = project.working_name || "";
    ideaInput.value = project.initial_idea || "";
  }
  byId("character-count").textContent = ideaInput.value.length + " / 5000";
  const hasIdea = Boolean(project.initial_idea);
  byId("idea-stage-status").textContent = hasIdea ? "BORRADOR GUARDADO" : "EN CURSO";
  draftIndicator.textContent = hasIdea ? "último guardado · " + formatDate(project.updated_at) : "borrador sin guardar";
  byId("last-saved").textContent = hasIdea
    ? "Último guardado local · " + formatDate(project.updated_at)
    : "Los datos se guardan en SQLite dentro de este equipo.";
  renderAgenda(data.agenda);
  renderVersions(data.versions);
}

async function loadWorkspace() {
  try {
    const health = await request("/api/health", { method: "GET", headers: {} });
    const data = await request("/api/workspace", { method: "GET", headers: {} });
    setConnection(true, health.ai === "not-connected" ? "Servidor local · IA por integrar" : "Servidor local listo");
    renderWorkspace(data, true);
  } catch (error) {
    setConnection(false, "No se pudo cargar el espacio local");
    showToast("No se pudo leer la base local. Reinicia el servidor y vuelve a abrir esta página.");
  }
}

ideaInput.addEventListener("input", () => {
  byId("character-count").textContent = ideaInput.value.length + " / 5000";
  draftIndicator.textContent = "cambios sin guardar";
  saveMessage.textContent = "";
});

nameInput.addEventListener("input", () => {
  draftIndicator.textContent = "cambios sin guardar";
  saveMessage.textContent = "";
});

saveButton.addEventListener("click", async () => {
  saveButton.disabled = true;
  saveMessage.textContent = "Guardando…";
  try {
    const result = await request("/api/idea", {
      method: "PUT",
      body: JSON.stringify({
        working_name: nameInput.value,
        initial_idea: ideaInput.value
      })
    });
    renderWorkspace(result.workspace, false);
    saveMessage.textContent = result.changed ? "Versión " + result.version + " guardada" : "Ya estaba guardado";
    showToast(result.changed ? "Idea guardada en este equipo." : "No había cambios nuevos que guardar.");
  } catch (error) {
    saveMessage.textContent = error.message;
    showToast(error.message);
  } finally {
    saveButton.disabled = false;
  }
});

byId("agenda-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = byId("agenda-title-input").value.trim();
  const dueDate = byId("agenda-date").value;
  if (!title) return;
  try {
    const result = await request("/api/agenda", {
      method: "POST",
      body: JSON.stringify({ title, due_date: dueDate })
    });
    renderWorkspace(result.workspace, false);
    event.currentTarget.reset();
    showToast("Tarea agregada a tu agenda local.");
  } catch (error) {
    showToast(error.message);
  }
});

byId("agenda-list").addEventListener("click", async (event) => {
  const removeButton = event.target.closest("[data-agenda-delete]");
  if (removeButton) {
    if (!window.confirm("¿Quitar esta tarea de la agenda?")) return;
    try {
      const result = await request("/api/agenda/" + removeButton.dataset.agendaDelete, { method: "DELETE" });
      renderWorkspace(result.workspace, false);
      showToast("Tarea quitada de la agenda.");
    } catch (error) {
      showToast(error.message);
    }
    return;
  }
  const button = event.target.closest("[data-agenda-toggle]");
  if (!button || !workspace) return;
  const item = workspace.agenda.find((entry) => entry.id === Number(button.dataset.agendaToggle));
  if (!item) return;
  await updateAgendaStatus(item.id, item.status === "done" ? "pending" : "done");
});

byId("agenda-list").addEventListener("change", async (event) => {
  const select = event.target.closest("[data-agenda-status]");
  if (!select) return;
  await updateAgendaStatus(Number(select.dataset.agendaStatus), select.value);
});

async function updateAgendaStatus(id, status) {
  try {
    const result = await request("/api/agenda/" + id, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
    renderWorkspace(result.workspace, false);
  } catch (error) {
    showToast(error.message);
  }
}

loadWorkspace();
