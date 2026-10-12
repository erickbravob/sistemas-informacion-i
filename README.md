# Cuaderno y espacio de proyecto de Sistemas de Información I

La página del curso se publica en GitHub Pages como acceso al material académico y al espacio de trabajo local. El espacio Build se ejecuta en el equipo del estudiante y conserva su información en una base de datos SQLite local.

## Iniciar el espacio de proyecto

En Windows, ejecuta build-local/iniciar.bat. Se abrirá el navegador en http://127.0.0.1:8766. Mantén abierta la ventana del servidor mientras trabajas. La página de GitHub solo puede abrir el espacio cuando el servidor local está activo.

## Datos y privacidad

El archivo build-local/data/build.sqlite3 conserva la idea, versiones y agenda. Se crea al iniciar la aplicación y está excluido de Git. El servidor se enlaza únicamente a 127.0.0.1; no se publica como servicio en internet.

La interfaz no usa IA todavía. En esta etapa registra y organiza respuestas localmente. El proveedor de IA, las condiciones de privacidad y el uso de información externa quedan para una etapa posterior.

La base SQLite solo guarda el informe de acompañamiento. No determina la tecnología ni la base de datos del sistema final del estudiante.

## Publicación

GitHub Pages publica los archivos del cuaderno y del lanzador de Build. No ejecutar el flujo de publicación automática de documentos para actualizar cambios del sitio; los cambios del sitio se revisan y se publican como una unidad cuando el estudiante cierre la etapa.