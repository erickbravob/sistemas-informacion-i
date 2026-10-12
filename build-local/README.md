# Espacio Build local

Aplicación de acompañamiento para definir y documentar el proyecto final de Sistemas de Información I. Se ejecuta en el equipo del estudiante y guarda los datos en SQLite.

## Inicio

1. Abre `iniciar.bat`.
2. Espera a que se abra el navegador en `http://127.0.0.1:8766`.
3. Para detener el servidor, cierra la ventana o presiona Ctrl+C.

Requiere Python 3 disponible en Windows mediante el comando `py -3`. No instala paquetes ni envía datos a servicios externos.

## Almacenamiento

La base de datos se crea automáticamente en `data/build.sqlite3`. Cada cambio de la idea inicial crea una versión del registro. La agenda se conserva entre sesiones. La base local está excluida del control de versiones.

El sitio de GitHub Pages contiene un enlace a esta aplicación. El servidor debe estar iniciado para que el enlace abra el espacio local.

## Alcance de esta primera etapa

Incluye una pregunta principal para registrar la idea inicial, un nombre provisional opcional, una agenda editable, el roadmap completo y una descarga Markdown del informe.

La guía todavía no usa un modelo de IA. No se ha elegido tecnología para el sistema final: esta base SQLite pertenece al registro local de la guía, y no decide qué base de datos usará el producto del estudiante.
