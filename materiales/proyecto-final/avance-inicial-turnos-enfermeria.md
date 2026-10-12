# SIS1-2026-10-12-001 — Avance inicial: sistema de turnos y gestión de enfermería

**Fecha de preparación:** 2026-10-11
**Fecha prevista de revisión:** 2026-10-12
**Estado:** Borrador preparatorio; propuesta del estudiante, pendiente de revisar con el docente.

## Propósito

Preparar el primer avance del proyecto final a partir de la idea comunicada por el estudiante: desarrollar desde cero un sistema para organizar los turnos y apoyar la gestión administrativa del personal de enfermería. El sistema actual de turnos de Jani se considera referencia para reconocer el flujo inicial de personal y elaboración del rol. El estudiante indica que está publicado en Hostinger; esa condición se registra como información declarada, no como una comprobación del estado del sitio. No se reutilizan su código, base de datos ni configuración.

## Idea inicial del producto

La propuesta va más allá de registrar personal y generar un rol. Busca apoyar a la responsable de enfermería en la coordinación del equipo y en tareas administrativas parecidas a una gestión de recursos humanos del área. El alcance real de esas responsabilidades todavía debe identificarse con Jani y validarse con el docente.

**Enunciado provisional:**
“Sistema de información para planificar los turnos y apoyar la gestión administrativa del personal de enfermería, con reglas, responsables y reportes que se definirán durante el análisis.”

El nombre definitivo, la institución usuaria, las reglas de turnos y los límites del proyecto siguen abiertos.

## Referencia revisada

La carpeta local RolTurnos contiene una interfaz Angular con secciones de personal y rol, además de una API PHP con operaciones de alta, consulta, modificación y eliminación de personal. Esta observación sirve solo para orientar preguntas de descubrimiento. No confirma cómo se usa actualmente el sistema en producción ni cuáles son todas las funciones de Jani.



## Problema e hipótesis por validar

**Hipótesis:** la planificación de turnos y el seguimiento administrativo del personal podrían requerir información dispersa o trabajo manual. Un sistema específico podría ayudar a organizar asignaciones, cambios y consultas de la responsable.

Esta hipótesis no se presenta como un problema confirmado. En la próxima revisión se debe preguntar cómo se planifica el rol hoy, qué excepciones ocurren, quién autoriza cambios, qué registros se mantienen y qué resultado espera la responsable.

## Actores candidatos

- Responsable de enfermería: posible administradora del proceso y aprobadora de decisiones, sujeto a validación.
- Personal de enfermería: podría consultar turnos, disponibilidad y cambios; confirmar qué acciones necesita realizar.
- Dirección, administración o recursos humanos: participación pendiente de aclarar; no se asume que serán usuarios del sistema.

## Alcance candidato para investigar

- Registro y consulta de personal con los datos estrictamente necesarios.
- Disponibilidad, ausencias y restricciones para asignar turnos.
- Planificación, revisión y publicación del rol.
- Solicitudes, cambios, cobertura y aprobación de turnos.
- Historial de decisiones y reportes para la responsable.
- Permisos por función y trazabilidad de cambios.

Son temas para levantar requisitos, no funcionalidades aprobadas. Deben priorizarse según las reglas reales de operación y el tiempo de la materia.

## Requisitos de ejemplo para orientar el análisis

Los siguientes ejemplos son borradores y todavía no forman parte de una especificación aprobada.

| Tipo | Ejemplo inicial | Qué falta acordar |
|---|---|---|
| Funcional | El sistema permitirá a la responsable asignar personal a turnos de un periodo y advertirá conflictos con la disponibilidad registrada. | Reglas de cobertura, límites de horas, excepciones y quién resuelve conflictos. |
| Funcional | El sistema registrará solicitudes de cambio y conservará quién las solicitó, quién las resolvió y cuándo. | Estados, aprobadores, plazos y evidencia necesaria. |
| No funcional | Las acciones administrativas deberán estar protegidas por autenticación y permisos según el rol. | Roles concretos, política de acceso y tratamiento de cuentas. |
| No funcional | Las consultas principales deberán responder dentro de un tiempo acordado bajo una carga de uso definida. | Medición, carga esperada y umbral aceptable con el docente y la usuaria. |
| No funcional | El sistema deberá mantener un historial suficiente para revisar cambios en turnos y datos administrativos. | Periodo de conservación, datos auditables y acceso al historial. |

## Metodología: análisis previo, sin selección cerrada

La consigna exacta que el docente habría indicado el viernes sobre metodología no aparece transcrita en los registros consultados. Por eso, este apartado prepara el análisis usando los temas que el estudiante señaló; no atribuye al docente una decisión o frase que no está documentada.

- **Scrum** es un marco de trabajo. Su guía describe responsabilidades, eventos y artefactos. Entre los artefactos están Product Backlog, Sprint Backlog e Increment; cada uno se relaciona con un compromiso: Product Goal, Sprint Goal y Definition of Done.
- **Extreme Programming (XP)** es un enfoque de desarrollo de software descrito por Kent Beck. Su obra desarrolla prácticas de ingeniería como pruebas frecuentes, integración y colaboración estrecha. La selección de prácticas debe explicarse según el equipo y el producto.
- Una opción por evaluar sería usar Scrum para organizar entregas y revisión del trabajo, junto con prácticas XP para cuidar el código y las pruebas. Es solo una hipótesis de comparación; aún no se decide combinar enfoques ni se da por hecho que el tamaño del equipo lo permita.

### Artefactos que conviene elaborar si el curso y el equipo los requieren

| Artefacto | Para qué serviría en este proyecto |
|---|---|
| Visión y alcance | Acordar a quién ayuda el producto, qué necesidad atiende y qué queda fuera. |
| Product Backlog | Ordenar necesidades y trabajo pendiente por valor y prioridad, si se adopta Scrum. |
| Historias de usuario y criterios de aceptación | Expresar necesidades desde la perspectiva de la responsable o del personal y definir cómo comprobarlas. |
| Sprint Goal y Sprint Backlog | Enfocar un periodo de trabajo y los elementos seleccionados, si se adopta Scrum. |
| Pruebas automatizadas y Definition of Done | Acordar cómo verificar cambios y qué significa que un incremento está terminado. |
| Registro de decisiones | Conservar las alternativas evaluadas, razones, evidencia y decisiones revisadas con el docente. |

Las herramientas concretas no se eligen hasta conocer las restricciones del curso, del equipo y del entorno de uso.

## Base de datos y datos por descubrir

Todavía no se selecciona un motor de base de datos. Primero se identificarán entidades, relaciones, reglas y datos sensibles. Como punto de partida para el modelo conceptual, se investigarán: personal, funciones o competencias, servicios/unidades, tipos de turno, disponibilidad, asignaciones, ausencias, solicitudes de cambio, aprobaciones y registro de auditoría.

La información de personal requiere limitar la recolección a lo necesario y definir quién puede ver o modificar cada dato. No se deben copiar datos personales reales de Jani al proyecto académico.

## Plan del siguiente encuentro

1. Confirmar con el docente la consigna del viernes y qué entregable espera sobre metodología.
2. Describir el proceso actual de planificación del rol con un ejemplo anonimizado.
3. Identificar usuaria principal, actores, objetivo, límites y restricciones del proyecto.
4. Contrastar la hipótesis del problema con la responsable de enfermería.
5. Comparar Scrum, XP u otra alternativa con criterios del proyecto y del curso; dejar la elección pendiente hasta tener esa información.
6. Iniciar visión y alcance, mapa de actores y preguntas para levantar requisitos.
7. Delimitar los datos candidatos y elaborar un primer modelo conceptual antes de elegir tecnología.

## Decisiones pendientes

- Nombre del sistema y organización donde se aplicará.
- Problema observado y evidencia de su impacto.
- Consigna exacta del docente y formato/calendario de entregas.
- Actores, permisos y responsabilidades administrativas reales.
- Reglas laborales y operativas para turnos, ausencias y cambios.
- Alcance de la primera versión y exclusiones.
- Método de trabajo y artefactos exigidos por la materia.
- Requisitos de privacidad, seguridad, respaldo y disponibilidad.
- Modelo de datos y motor de base de datos.

## Fuentes

- Scrum.org, [The Scrum Guide (2020)](https://scrumguides.org/scrum-guide.html).
- Kent Beck, Cynthia Andres, *Extreme Programming Explained: Embrace Change*, 2.ª ed., Addison-Wesley, 2004. Ficha editorial: [Pearson](https://www.pearson.com/en-us/subject-catalog/p/Beck-Extreme-Programming-Explained-Embrace-Change-2nd-Edition/P200000000118).
- Revisión local, en modo de solo lectura, de los módulos de personal y planificación del rol en el proyecto de referencia. No se revisó ni copió información de producción.
- Mensaje del estudiante en esta conversación, 2026-10-11: el proyecto se basará en el rol de turnos de Jani, comenzará desde cero y ampliará el alcance hacia la gestión administrativa de enfermería.

## Evidencia, estado y próximo paso

- **Evidencia:** estructura de carpetas y nombres de módulos revisados localmente; la revisión no verifica el sitio publicado ni las reglas operativas reales.
- **Estado:** borrador de análisis; sin requisitos ni tecnología aprobados.
- **Próximo paso:** revisar el planteamiento y la consigna con el docente y la responsable antes de convertir ejemplos en requisitos.
- **Git/publicación:** este avance queda local; no se realizó commit ni push.
