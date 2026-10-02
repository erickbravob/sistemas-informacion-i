# Cuaderno de Sistemas de Información I

Página estática de consulta para los conceptos y registros diarios de la materia. Se publica con GitHub Pages; no requiere servidor, base de datos ni ejecución local.

## Publicar por primera vez

1. Crea un repositorio dedicado y copia en él el contenido de esta carpeta.
2. En **Settings → Pages**, selecciona **GitHub Actions** como origen de publicación.
3. Al guardar cambios en la rama `main`, el flujo `.github/workflows/pages.yml` publica la nueva versión.

## Actualizar una jornada

1. Añade los conceptos nuevos al arreglo `concepts` de `conceptos.js`.
2. Conserva el estado «Síntesis inicial · por contrastar» hasta cotejar el contenido con el material del docente.
3. Actualiza el resumen de jornada en `index.html` cuando se registre una nueva clase.
4. Guarda los cambios en `main`. GitHub Actions despliega la actualización.

El sitio incluye solamente los conceptos de consulta pública. Los registros y evidencias completos permanecen en el espacio documental de la materia.

