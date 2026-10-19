const practiceQuestionBank = [
  {
    "q": "¿Qué define mejor a un sistema?",
    "o": [
      "Elementos relacionados que interactúan para alcanzar un propósito.",
      "Una colección de objetos sin relaciones entre sí.",
      "Un programa que siempre está automatizado.",
      "Un conjunto de datos sin entradas ni salidas."
    ],
    "a": 0,
    "e": "Un sistema se entiende por sus elementos, relaciones, propósito y contexto."
  },
  {
    "q": "En el análisis de un sistema, ¿para qué sirve delimitar su frontera?",
    "o": [
      "Para distinguir qué se estudia como parte del sistema y qué pertenece al entorno.",
      "Para impedir cualquier intercambio con el entorno.",
      "Para definir únicamente el diseño visual.",
      "Para eliminar los subsistemas."
    ],
    "a": 0,
    "e": "El límite fija el alcance del análisis y ayuda a identificar los intercambios con el entorno."
  },
  {
    "q": "¿Qué describe correctamente un subsistema?",
    "o": [
      "Una parte de un sistema mayor con una función propia que contribuye al objetivo general.",
      "Un sistema que no se relaciona con nada externo.",
      "El entorno completo de una organización.",
      "Una salida que nunca cambia."
    ],
    "a": 0,
    "e": "Un subsistema conserva relaciones y funciones propias dentro de un sistema mayor."
  },
  {
    "q": "¿Qué significa la frase de clase «conglomerado + sinergia = sistema»?",
    "o": [
      "Es una mnemotecnia para recordar que las partes relacionadas producen un resultado conjunto; no es una ecuación matemática.",
      "Es una fórmula para sumar cantidades físicas.",
      "Significa que cualquier grupo de objetos es un sistema aunque no interactúe.",
      "Es una ley de la teoría de la información."
    ],
    "a": 0,
    "e": "La expresión resume de forma didáctica la importancia de las relaciones y la sinergia; no es una igualdad formal."
  },
  {
    "q": "¿Qué es la sinergia?",
    "o": [
      "El resultado conjunto de las interacciones supera lo que las partes lograrían aisladas.",
      "La pérdida gradual de organización del sistema.",
      "La información que se anticipa antes de un evento.",
      "La división de un sistema en partes sin coordinación."
    ],
    "a": 0,
    "e": "Sinergia describe el valor que surge de la interacción coordinada de componentes."
  },
  {
    "q": "En teoría de la información, ¿qué mide H(X)?",
    "o": [
      "La incertidumbre promedio de una variable aleatoria discreta.",
      "La calidad total de un sistema.",
      "La cantidad de componentes físicos.",
      "El tiempo máximo de respuesta."
    ],
    "a": 0,
    "e": "La entropía de Shannon cuantifica incertidumbre promedio según las probabilidades de los resultados."
  },
  {
    "q": "¿Cuál es la fórmula de entropía discreta en bits?",
    "o": [
      "H(X)=−Σ p(x) log₂ p(x).",
      "H(X)=Σ x/p(x).",
      "H(X)=p(x)·log₁₀ x.",
      "H(X)=−log₂ Σx."
    ],
    "a": 0,
    "e": "Se suman los aportes −p(x) log₂ p(x) de todos los resultados posibles."
  },
  {
    "q": "¿Qué expresa la base 2 en la fórmula H(X)=−Σp(x)log₂p(x)?",
    "o": [
      "Que la unidad de la entropía es el bit.",
      "Que solo hay dos resultados posibles.",
      "Que cada probabilidad debe ser 0,2.",
      "Que se calcula el doble de la incertidumbre."
    ],
    "a": 0,
    "e": "Con logaritmo en base 2, la incertidumbre se mide en bits."
  },
  {
    "q": "Un dado justo tiene seis resultados equiprobables. ¿Cuál es su entropía?",
    "o": [
      "log₂(6) ≈ 2,585 bits.",
      "log₂(2) = 1 bit.",
      "6 bits exactos.",
      "0 bits, porque todos los resultados son posibles."
    ],
    "a": 0,
    "e": "Con seis resultados de probabilidad 1/6, H=−6(1/6)log₂(1/6)=log₂6≈2,585 bits."
  },
  {
    "q": "Si una variable tiene un único resultado posible con probabilidad 1, ¿cuál es su entropía?",
    "o": [
      "0 bits, porque no hay incertidumbre sobre el resultado.",
      "1 bit, porque ocurre siempre.",
      "2 bits, porque el resultado es seguro.",
      "No se puede calcular."
    ],
    "a": 0,
    "e": "−1·log₂(1)=0: un resultado seguro no deja incertidumbre."
  },
  {
    "q": "En 100 solicitudes, 90 son éxitos y 10 fallas. ¿Qué representa H≈0,469 bits por solicitud?",
    "o": [
      "La incertidumbre de la distribución entre éxito y falla, no la calidad del sistema.",
      "Una tasa de éxito de 46,9 %.",
      "La probabilidad de que una solicitud falle.",
      "El tiempo promedio de respuesta."
    ],
    "a": 0,
    "e": "La entropía no indica si el resultado es bueno o malo. Se interpreta junto con la proporción de éxito, fallas y otros indicadores."
  },
  {
    "q": "¿Qué diferencia la neguentropía de la entropía en el enfoque de sistemas?",
    "o": [
      "La neguentropía representa recursos, energía o información incorporados para sostener o recuperar organización.",
      "La neguentropía es la fórmula de entropía con signo positivo y siempre mide calidad.",
      "La neguentropía elimina la necesidad de control.",
      "La entropía es una forma de retroalimentación anticipada."
    ],
    "a": 0,
    "e": "La neguentropía alude a entradas que ayudan a mantener organizado un sistema abierto."
  },
  {
    "q": "¿Qué describe la homeostasis?",
    "o": [
      "La regulación que mantiene variables importantes en rangos aceptables ante cambios.",
      "La ausencia total de cambios en un sistema.",
      "La suma de todos los subsistemas.",
      "Una lista ordenada de tareas de Scrum."
    ],
    "a": 0,
    "e": "Homeostasis es equilibrio dinámico mediante regulación, no inmovilidad."
  },
  {
    "q": "¿Cuál ejemplo corresponde a retroalimentación (feedback)?",
    "o": [
      "El sistema revisa el número de cupos ocupados y cierra la inscripción al llegar al límite.",
      "El sistema reserva cupos antes de recibir solicitudes, según una proyección.",
      "El estudiante inicia sesión.",
      "El administrador crea una tabla."
    ],
    "a": 0,
    "e": "Feedback usa información del estado o resultado observado para ajustar la operación."
  },
  {
    "q": "¿Qué describe la alimentación anticipada (feedforward)?",
    "o": [
      "Una acción basada en información anticipada para prevenir un problema antes de observar el resultado.",
      "Una corrección que solo ocurre luego de medir la salida.",
      "Una asociación entre actor y caso de uso.",
      "Un resumen de indicadores ejecutivos."
    ],
    "a": 0,
    "e": "Feedforward intenta anticiparse al efecto; feedback corrige usando resultados observados."
  },
  {
    "q": "¿Qué sistema de información registra operaciones rutinarias como ventas o inscripciones?",
    "o": [
      "TPS, sistema de procesamiento de transacciones.",
      "DSS, sistema de apoyo a decisiones.",
      "ESS, sistema de soporte ejecutivo.",
      "KMS, sistema de gestión del conocimiento."
    ],
    "a": 0,
    "e": "TPS procesa transacciones cotidianas y detalladas."
  },
  {
    "q": "¿Qué sistema produce informes periódicos para apoyar a la gerencia?",
    "o": [
      "MIS.",
      "TPS.",
      "OAS.",
      "KMS."
    ],
    "a": 0,
    "e": "MIS transforma datos operativos en información útil para gestión."
  },
  {
    "q": "¿Qué sistema apoya el análisis de alternativas y decisiones semiestructuradas?",
    "o": [
      "DSS.",
      "TPS.",
      "OAS.",
      "KMS."
    ],
    "a": 0,
    "e": "DSS apoya la evaluación de alternativas y decisiones."
  },
  {
    "q": "¿Qué caracteriza a una arquitectura cliente-servidor?",
    "o": [
      "Un cliente solicita servicios o datos y un servidor procesa o responde.",
      "Todos los procesos ocurren necesariamente en un único equipo.",
      "No existe comunicación entre componentes.",
      "La base de datos reemplaza a los usuarios."
    ],
    "a": 0,
    "e": "Cliente y servidor tienen responsabilidades distintas y se comunican mediante solicitudes y respuestas."
  },
  {
    "q": "¿Cuál es un requisito funcional?",
    "o": [
      "El sistema permitirá buscar ejemplares por título o autor.",
      "El 95 % de las búsquedas responderá en menos de 2 segundos bajo carga definida.",
      "Las contraseñas se almacenarán con hash seguro.",
      "El sistema tendrá una interfaz fácil de usar."
    ],
    "a": 0,
    "e": "El requisito funcional define un servicio o comportamiento que el sistema debe realizar."
  },
  {
    "q": "¿Qué hace verificable un requisito no funcional de tiempo de respuesta?",
    "o": [
      "Fija un umbral y condiciones de prueba, como datos, concurrencia y porcentaje de solicitudes.",
      "Usa solo la frase «debe ser rápido».",
      "Describe la intención sin indicar cómo medirla.",
      "Se limita a nombrar una tecnología."
    ],
    "a": 0,
    "e": "Una medida necesita umbral, contexto y método de comprobación."
  },
  {
    "q": "¿Cuál afirmación sobre seguridad de contraseñas es correcta?",
    "o": [
      "Guardar un hash criptográfico con sal adecuada permite verificar la contraseña sin almacenar el texto original; el hash no es cifrado reversible.",
      "Cifrar y hashear son exactamente la misma operación reversible.",
      "Guardar la contraseña en texto plano facilita su verificación y es seguro.",
      "Un hash garantiza por sí solo que el sistema no tenga vulnerabilidades."
    ],
    "a": 0,
    "e": "Un hash de contraseña está diseñado para verificación, idealmente con sal y una función específica para contraseñas. No cifra para poder recuperar el texto."
  },
  {
    "q": "¿Qué es UML?",
    "o": [
      "Un lenguaje de modelado visual para especificar, visualizar y documentar sistemas.",
      "Una metodología ágil con sprints obligatorios.",
      "Un lenguaje de programación para bases de datos.",
      "Un producto exclusivo de Rational Rose."
    ],
    "a": 0,
    "e": "UML define notaciones y modelos; no prescribe por sí solo un proceso completo de desarrollo."
  },
  {
    "q": "¿Qué muestra principalmente un diagrama de casos de uso?",
    "o": [
      "Actores externos, objetivos y funciones dentro del límite del sistema.",
      "La secuencia exacta de cada instrucción de código.",
      "La distribución física de servidores y equipos.",
      "El estado interno de un objeto en cada instante."
    ],
    "a": 0,
    "e": "El diagrama de casos de uso representa la perspectiva externa de los objetivos y servicios del sistema."
  },
  {
    "q": "En UML, ¿qué representa un actor?",
    "o": [
      "Un rol externo que interactúa con el sistema, ejercido por una persona u otro sistema.",
      "Una clase que siempre se almacena en una base de datos.",
      "Una tarea automática dentro del sistema.",
      "El administrador del proyecto necesariamente."
    ],
    "a": 0,
    "e": "Actor es un rol externo; no tiene que ser una persona individual."
  },
  {
    "q": "¿Qué representa el rectángulo que encierra casos de uso?",
    "o": [
      "El límite del sistema modelado.",
      "El límite de la organización completa en todos los diagramas.",
      "Una clase abstracta.",
      "Un estado final."
    ],
    "a": 0,
    "e": "La frontera indica qué funciones se consideran responsabilidad del sistema estudiado."
  },
  {
    "q": "¿Qué agrega una descripción textual de un caso de uso al diagrama?",
    "o": [
      "Precondiciones, flujo normal, alternativas y resultado esperado.",
      "La implementación completa en código fuente.",
      "La distribución de discos y servidores.",
      "Una tabla con todas las contraseñas."
    ],
    "a": 0,
    "e": "El diagrama ofrece una vista resumida; la descripción textual conserva detalles del flujo."
  },
  {
    "q": "¿Qué muestra un diagrama de actividades?",
    "o": [
      "El flujo de acciones, decisiones y posibles rutas de un proceso.",
      "Los atributos y operaciones de cada clase únicamente.",
      "Los objetos desplegados en hardware.",
      "Los roles del equipo Scrum."
    ],
    "a": 0,
    "e": "El diagrama de actividades modela el flujo de trabajo y sus decisiones."
  },
  {
    "q": "¿Qué modela un diagrama de secuencia?",
    "o": [
      "Mensajes entre participantes ordenados a lo largo del tiempo.",
      "La jerarquía de paquetes de software únicamente.",
      "La estructura estática de datos.",
      "La relación entre un sistema y su entorno físico."
    ],
    "a": 0,
    "e": "La secuencia muestra interacciones y orden temporal de mensajes."
  },
  {
    "q": "¿Qué modela una máquina o diagrama de estados?",
    "o": [
      "Estados de un objeto y transiciones causadas por eventos o condiciones.",
      "Las tareas seleccionadas para un Sprint.",
      "Los módulos que se ejecutan en cada servidor.",
      "Los actores de un caso de uso."
    ],
    "a": 0,
    "e": "Un diagrama de estados describe el ciclo de vida de un objeto y sus transiciones."
  },
  {
    "q": "¿Qué contiene principalmente un diagrama de clases?",
    "o": [
      "Clases, atributos, operaciones y relaciones estructurales.",
      "Mensajes ordenados en el tiempo.",
      "Pasos de un flujo de trabajo.",
      "Eventos de revisión del Sprint."
    ],
    "a": 0,
    "e": "El diagrama de clases representa estructura estática y relaciones."
  },
  {
    "q": "¿Qué diferencia describe mejor los diagramas de componentes y despliegue?",
    "o": [
      "Componentes muestra módulos y dependencias; despliegue muestra nodos físicos y asignación de ejecutables.",
      "Ambos muestran solo actores y objetivos.",
      "Componentes modela estados; despliegue modela requisitos funcionales.",
      "No existe diferencia entre ellos."
    ],
    "a": 0,
    "e": "Uno organiza software modular; el otro representa el entorno físico de ejecución."
  },
  {
    "q": "¿Qué valora el Manifiesto Ágil?",
    "o": [
      "Individuos e interacciones, software funcionando, colaboración con el cliente y respuesta ante el cambio.",
      "Plan detallado por encima de la colaboración y de los resultados.",
      "Documentación exhaustiva como único indicador de progreso.",
      "Aprobaciones contractuales en cada cambio."
    ],
    "a": 0,
    "e": "El Manifiesto Ágil expresa cuatro valores que priorizan colaboración, entrega y adaptación, sin negar valor a los elementos de la derecha."
  },
  {
    "q": "¿Cuál describe correctamente la relación entre agilidad, Scrum y XP?",
    "o": [
      "Agilidad es un conjunto de valores y principios; Scrum es un marco de trabajo; XP es una metodología ágil con prácticas de ingeniería y puede combinarse con Scrum.",
      "Scrum es un lenguaje de programación y XP es una base de datos.",
      "Agilidad y Scrum son sinónimos exactos; XP es una herramienta gráfica.",
      "XP es una fase obligatoria del ciclo de Scrum."
    ],
    "a": 0,
    "e": "Scrum define un marco de trabajo; XP aporta prácticas técnicas. Pueden combinarse si se adaptan coherentemente."
  },
  {
    "q": "¿Quién es responsable de maximizar el valor del producto y ordenar el Product Backlog en Scrum?",
    "o": [
      "Product Owner.",
      "Scrum Master.",
      "Desarrolladores individualmente.",
      "Stakeholders como comité."
    ],
    "a": 0,
    "e": "El Product Owner responde por el valor y la gestión efectiva del Product Backlog."
  },
  {
    "q": "¿Cuál es una responsabilidad del Scrum Master?",
    "o": [
      "Ayudar a establecer Scrum y mejorar la efectividad del equipo, facilitando la eliminación de impedimentos.",
      "Asignar cada tarea diaria a cada desarrollador.",
      "Aceptar por sí solo todos los incrementos como cliente.",
      "Escribir todo el Product Backlog sin colaboración."
    ],
    "a": 0,
    "e": "El Scrum Master sirve al equipo y a la organización, ayudando a aplicar Scrum eficazmente."
  },
  {
    "q": "¿Cuál lista corresponde a los eventos de Scrum?",
    "o": [
      "Sprint, Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective.",
      "Inicio, análisis, programación, venta y cierre.",
      "Product Goal, Sprint Goal, Definition of Done y Daily.",
      "Requisito, caso de uso, clase, secuencia y estado."
    ],
    "a": 0,
    "e": "El Sprint contiene los otros cuatro eventos formales de Scrum."
  },
  {
    "q": "¿Cuál es el propósito principal del Daily Scrum?",
    "o": [
      "Inspeccionar el progreso hacia el Sprint Goal y ajustar el plan de trabajo próximo.",
      "Presentar el producto a los stakeholders y decidir el próximo Product Goal.",
      "Evaluar el proceso del Sprint y acordar mejoras.",
      "Aprobar cambios presupuestarios del producto."
    ],
    "a": 0,
    "e": "El Daily Scrum ayuda a los Developers a inspeccionar el progreso y adaptar el Sprint Backlog."
  },
  {
    "q": "¿Qué se revisa principalmente en la Sprint Review?",
    "o": [
      "El resultado del Sprint y los cambios del entorno para adaptar qué hacer después.",
      "La conducta individual de cada integrante como evaluación de desempeño.",
      "Solo el código fuente, sin stakeholders.",
      "La lista de impedimentos del Daily Scrum."
    ],
    "a": 0,
    "e": "El equipo y los stakeholders inspeccionan el resultado y colaboran sobre el siguiente paso."
  },
  {
    "q": "¿Qué busca la Sprint Retrospective?",
    "o": [
      "Planificar formas de aumentar la calidad y la efectividad del equipo.",
      "Demostrar el producto a clientes para aprobar el alcance anual.",
      "Reordenar el Product Backlog sin evaluar cómo trabaja el equipo.",
      "Asignar funciones permanentes a cada integrante."
    ],
    "a": 0,
    "e": "La retrospectiva inspecciona cómo fue el Sprint y acuerda mejoras de efectividad."
  },
  {
    "q": "¿Cuáles son los tres artefactos de Scrum y sus compromisos?",
    "o": [
      "Product Backlog–Product Goal; Sprint Backlog–Sprint Goal; Increment–Definition of Done.",
      "Product Backlog–Sprint Goal; Sprint Backlog–Product Goal; Increment–Daily Scrum.",
      "Historias–estimación; tareas–velocidad; pruebas–retrospectiva.",
      "Product Goal, Sprint Goal y Definition of Done son los tres artefactos."
    ],
    "a": 0,
    "e": "Cada artefacto tiene un compromiso que ofrece foco y transparencia."
  },
  {
    "q": "¿Cuál plantilla suele usarse para expresar una historia de usuario?",
    "o": [
      "Como [rol], quiero [objetivo] para [beneficio].",
      "Cuando [clase] ejecuta [método], entonces [tabla].",
      "El sistema debe ser rápido, seguro y moderno.",
      "Dado que existe una base de datos, se programa una función."
    ],
    "a": 0,
    "e": "La plantilla centra la historia en el rol, lo que busca y el beneficio esperado."
  },
  {
    "q": "¿Qué significan las 3 C de una historia de usuario?",
    "o": [
      "Card, Conversation y Confirmation: ficha breve, conversación para aclarar y confirmación mediante criterios verificables.",
      "Clase, Código y Compilación.",
      "Cliente, Costo y Calendario.",
      "Contexto, Caso y Contraseña."
    ],
    "a": 0,
    "e": "Las 3 C recuerdan que la historia escrita es un punto de inicio para conversación y confirmación."
  },
  {
    "q": "¿Qué hacen los criterios de aceptación?",
    "o": [
      "Definen condiciones observables para aceptar una historia concreta.",
      "Definen todas las reglas de calidad globales del producto.",
      "Sustituyen el objetivo del Product Goal.",
      "Describen exclusivamente la arquitectura física."
    ],
    "a": 0,
    "e": "Son condiciones específicas y comprobables para una historia o elemento de trabajo."
  },
  {
    "q": "¿Qué diferencia la Definition of Done de los criterios de aceptación?",
    "o": [
      "La Definition of Done establece el estándar común de calidad del incremento; los criterios de aceptación detallan condiciones propias de una historia.",
      "Son nombres distintos para el mismo criterio.",
      "Los criterios de aceptación son globales y la Definition of Done solo aplica a una historia.",
      "La Definition of Done es un evento y los criterios son artefactos."
    ],
    "a": 0,
    "e": "La Definition of Done es compartida para el incremento; los criterios verifican el comportamiento o alcance de una historia específica."
  },
  {
    "q": "En el modelo entrada–proceso–salida, ¿qué representa la entrada?",
    "o": ["Recursos, datos o información que el sistema recibe del entorno.", "El resultado que se entrega al entorno.", "La corrección que se realiza luego de una falla.", "El conjunto de pruebas de aceptación."],
    "a": 0,
    "e": "La entrada reúne los recursos, datos o información que llegan al sistema antes de su transformación."
  },
  {
    "q": "¿Qué caracteriza a un sistema abierto?",
    "o": ["Intercambia materia, energía o información con su entorno.", "Tiene necesariamente muchos componentes.", "Funciona siempre sin personas.", "No recibe entradas ni produce salidas."],
    "a": 0,
    "e": "En el material de Teoría General de Sistemas, un sistema abierto intercambia con el entorno."
  },
  {
    "q": "¿Cómo se relacionan un macrosistema y sus subsistemas?",
    "o": ["El macrosistema integra subsistemas relacionados cuyo desempeño afecta al propósito general.", "El macrosistema es siempre un componente aislado.", "Los subsistemas no tienen funciones propias.", "Un macrosistema solo puede ser una computadora."],
    "a": 0,
    "e": "Un subsistema cumple funciones propias y contribuye al sistema mayor del que forma parte."
  },
  {
    "q": "¿Cuál es una clasificación de sistemas de información presentada en clase?",
    "o": ["TPS, MIS, DSS y EIS según la función que cumplen.", "Cascada, espiral, Scrum y Kanban.", "Abierto, simple, manual y natural.", "Entrada, proceso, salida y control."],
    "a": 0,
    "e": "La presentación clasifica sistemas de información por función: transacciones, información gerencial, soporte a decisiones e información ejecutiva."
  },
  {
    "q": "¿Qué describe principalmente un TPS?",
    "o": ["Procesa las transacciones rutinarias diarias de una organización.", "Presenta solo indicadores ejecutivos de alto nivel.", "Elige automáticamente la metodología de desarrollo.", "Modela las relaciones entre clases UML."],
    "a": 0,
    "e": "Un sistema de procesamiento de transacciones registra y procesa operaciones habituales, como ventas."
  },
  {
    "q": "¿Cuál orden representa correctamente fases comunes del ciclo de vida de un sistema?",
    "o": ["Planeación, requisitos, diseño, desarrollo, pruebas, despliegue, mantenimiento y retirada.", "Pruebas, retirada, requisitos, planeación y diseño.", "Despliegue, diseño, planeación y requisitos.", "Desarrollo, mantenimiento y luego definición del problema."],
    "a": 0,
    "e": "El ciclo cubre desde identificar una necesidad hasta operar, mantener y retirar el sistema."
  },
  {
    "q": "¿Qué distingue al modelo en cascada?",
    "o": ["Organiza el trabajo en fases secuenciales y funciona mejor con requisitos estables.", "Organiza cada vuelta alrededor de un análisis de riesgos.", "Entrega trabajo continuo con límites WIP.", "Es una práctica de programación en pareja."],
    "a": 0,
    "e": "Cascada busca previsibilidad mediante fases y entregables; los cambios tardíos suelen ser costosos."
  },
  {
    "q": "¿Qué aporta el modelo en V?",
    "o": ["Relaciona niveles de requisitos y diseño con niveles de verificación y validación.", "Elimina las pruebas hasta después del despliegue.", "Reemplaza la planificación por un flujo sin límites.", "Define los cinco eventos de Scrum."],
    "a": 0,
    "e": "El modelo en V planifica pruebas asociadas a los distintos niveles del diseño y facilita trazabilidad."
  },
  {
    "q": "¿Qué actividad es central en cada vuelta del modelo en espiral?",
    "o": ["Identificar, evaluar y reducir riesgos antes de planificar la siguiente vuelta.", "Completar toda la documentación una sola vez al final.", "Evitar revisar alternativas técnicas.", "Limitar el trabajo en curso con un tablero Kanban."],
    "a": 0,
    "e": "La espiral organiza cada ciclo alrededor de objetivos, alternativas, riesgos, desarrollo y planificación."
  },
  {
    "q": "¿Cuáles son las cuatro fases de RUP?",
    "o": ["Inicio, elaboración, construcción y transición.", "Planeación, Scrum, Kanban y cierre.", "Análisis, TDD, pareja e integración.", "Preparación, riesgo, producto y mantenimiento."],
    "a": 0,
    "e": "RUP es iterativo e incremental; además se guía por casos de uso y se centra en la arquitectura."
  },
  {
    "q": "¿Qué expresan los valores del Manifiesto Ágil?",
    "o": ["Se valora más a las personas, el software funcionando, la colaboración y la respuesta al cambio, aunque los elementos de la derecha también tienen valor.", "La documentación y los contratos carecen de todo valor.", "Se debe evitar toda planificación y medición.", "Scrum debe usarse en cualquier proyecto."],
    "a": 0,
    "e": "El Manifiesto prioriza los elementos de la izquierda sin declarar inútiles los de la derecha."
  },
  {
    "q": "¿Qué resultado busca Scrum al terminar un Sprint?",
    "o": ["Un incremento útil que cumpla la Definición de Terminado.", "Una lista de tareas sin verificar.", "Un tablero de tareas sin producto integrado.", "Un documento final que sustituye la colaboración."],
    "a": 0,
    "e": "El incremento debe ser utilizable y cumplir la Definición de Terminado acordada."
  },
  {
    "q": "¿Qué compromiso corresponde al Product Backlog?",
    "o": ["La Meta del Producto.", "La Meta del Sprint.", "La Definición de Terminado.", "El límite WIP."],
    "a": 0,
    "e": "En Scrum, Product Backlog se vincula con la Meta del Producto; Sprint Backlog con la Meta del Sprint; Incremento con la Definición de Terminado."
  },
  {
    "q": "¿Para qué limita Kanban el trabajo en curso (WIP)?",
    "o": ["Para evitar saturación y ayudar a gestionar el flujo del trabajo.", "Para fijar la duración de cada Sprint.", "Para asignar obligatoriamente los roles de Scrum.", "Para posponer toda retroalimentación."],
    "a": 0,
    "e": "Limitar WIP hace visible la capacidad y ayuda a identificar bloqueos y mejorar el flujo."
  },
  {
    "q": "¿Qué es Jira en relación con Scrum y Kanban?",
    "o": ["Una herramienta que puede apoyar su planificación y seguimiento.", "Una metodología ágil con roles y eventos propios.", "Una práctica de pruebas antes del código.", "Un modelo de ciclo de vida predictivo."],
    "a": 0,
    "e": "Jira ofrece tableros, backlog, seguimiento e informes; la herramienta no define la metodología."
  },
  {
    "q": "¿Cómo pueden complementarse Scrum y XP?",
    "o": ["Scrum puede organizar el trabajo del equipo y XP aportar prácticas técnicas como TDD e integración continua.", "XP reemplaza toda necesidad de pruebas.", "Scrum define cómo escribir cada línea de código.", "No pueden combinarse porque resuelven exactamente el mismo nivel de trabajo."],
    "a": 0,
    "e": "Scrum organiza el trabajo y la inspección del producto; XP aporta prácticas de ingeniería que pueden fortalecer la calidad técnica."
  },
  {
    "q": "En programación en pareja, ¿qué hacen el conductor y el navegante?",
    "o": ["El conductor escribe; el navegante revisa, piensa el diseño y detecta problemas; luego intercambian roles.", "Ambos trabajan aislados en módulos sin revisar.", "El navegante asigna los roles de Scrum.", "El conductor escribe pruebas solo al final."],
    "a": 0,
    "e": "La práctica combina escritura y revisión continua, con intercambio frecuente de roles."
  },
  {
    "q": "¿Cuál es el ciclo de TDD?",
    "o": ["Escribir una prueba que falla, escribir el código mínimo para pasarla y refactorizar.", "Diseñar todo, desplegar y luego decidir qué probar.", "Planificar, estimar, revisar y retirar.", "Integrar, documentar, posponer las pruebas y publicar."],
    "a": 0,
    "e": "TDD suele describirse como rojo, verde y refactorizar."
  },
  {
    "q": "¿Qué práctica corresponde a integración continua?",
    "o": ["Integrar cambios con frecuencia y ejecutar construcciones y pruebas automáticas para detectar errores pronto.", "Agrupar todas las integraciones para el último día.", "Evitar automatizar las verificaciones.", "Usar un tablero visual sin integrar el código."],
    "a": 0,
    "e": "La integración frecuente con una construcción y pruebas automáticas reduce el tiempo hasta detectar problemas."
  },
  {
    "q": "¿Qué organiza FDD?",
    "o": ["El desarrollo en funcionalidades pequeñas con valor, usando cinco procesos y seguimiento por funcionalidades terminadas.", "El trabajo en Sprints sin roles ni producto.", "La verificación de cada nivel en un modelo en V.", "La programación de dos personas en un mismo puesto."],
    "a": 0,
    "e": "FDD significa Feature-Driven Development y hace visible el avance mediante funcionalidades completadas."
  },
  {
    "q": "¿Cuándo suele convenir más un enfoque predictivo o híbrido?",
    "o": ["Cuando los requisitos son estables, hay alcance contractual cerrado o se necesita verificación y documentación formal.", "Siempre que el cliente pueda cambiar prioridades cada día.", "Cuando no se requiere plan ni control.", "Solo cuando el equipo usa Jira."],
    "a": 0,
    "e": "La elección depende de requisitos, participación del cliente, equipo, riesgo, normativa y contrato."
  },
  {
    "q": "Un sistema para equipo médico debe demostrar que cada requisito fue probado y cumplir regulación. ¿Qué enfoque del material es adecuado como punto de partida?",
    "o": ["Modelo en V, con trazabilidad e iteraciones controladas según el riesgo.", "Kanban sin criterios de verificación.", "Scrumban por ser una opción universal.", "Programación en pareja como único modelo de ciclo de vida."],
    "a": 0,
    "e": "El ejemplo de la presentación asocia sistemas regulados y críticos con el modelo en V, que vincula diseño y pruebas."
  }
];
let currentPracticeAttempt = [];
let previousPracticeSet = '';
function escapePracticeHtml(value) { return String(value).replace(/[&<>]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[char])); }
function practiceShuffle(items) { const result = items.slice(); for (let i=result.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; } return result; }
function newPracticeAttempt() {
  let picked, fingerprint, tries=0;
  do { picked=practiceShuffle(practiceQuestionBank).slice(0,10); fingerprint=picked.map((item)=>item.q).sort().join('|'); tries++; } while(fingerprint===previousPracticeSet && tries<8);
  previousPracticeSet=fingerprint;
  currentPracticeAttempt=picked.map((item)=>({item, options:practiceShuffle(item.o.map((text,index)=>({text,correct:index===item.a})))}));
  renderPracticeAttempt();
}
function renderPracticeAttempt() {
 const root=document.querySelector('#practice-quiz-root'); if(!root) return;
 root.innerHTML='<form class=\"practice-form\" id=\"practice-form\">'+currentPracticeAttempt.map((entry,index)=>'<fieldset class=\"practice-question\" data-question=\"'+index+'\"><legend><span class=\"practice-number\">'+String(index+1).padStart(2,'0')+'</span>'+escapePracticeHtml(entry.item.q)+'</legend>'+entry.options.map((option,choice)=>'<label class=\"practice-option\"><input type=\"radio\" name=\"answer-'+index+'\" value=\"'+choice+'\"><span>'+escapePracticeHtml(option.text)+'</span></label>').join('')+'<div class=\"practice-feedback\" id=\"practice-feedback-'+index+'\" hidden></div></fieldset>').join('')+'<div class=\"practice-actions\"><button class=\"practice-submit\" type=\"submit\">Corregir test</button><span class=\"practice-progress\">10 preguntas · 1 punto cada una</span></div><div id=\"practice-result\" aria-live=\"polite\"></div></form>';
}
function renderPracticeExam() {
 page.innerHTML='<article class=\"practice-page\"><div class=\"breadcrumb\"><a href=\"#inicio\">Inicio</a><span>/</span><span>Estudio</span><span>/</span><span>Examen de práctica</span></div><header class=\"article-head practice-head\"><span class=\"eyebrow\">REPASO INTEGRADO · 10 PREGUNTAS POR INTENTO</span><h1>Repasa y comprueba<br><em>lo que ya puedes explicar.</em></h1><p class=\"welcome-lead\">Guía de estudio y examen aleatorio para practicar conceptos, relacionarlos con ejemplos y revisar por qué una respuesta es correcta.</p></header><aside class=\"practice-coverage\"><b>Alcance de los materiales</b><p>La última jornada registrada en el cuaderno es el 9 de octubre. El repositorio contiene las exposiciones y el informe de la Actividad 1. No están publicados aquí los informes o PowerPoint de las actividades 2 y 3; por eso el repaso no les atribuye temas no verificados. Incluye los temas de agilidad, Scrum e historias de usuario que pediste incorporar.</p></aside><nav class=\"evaluation-index practice-index\" aria-label=\"Secciones del repaso\"><a href=\"#pr-sistemas\">01 · Sistemas</a><a href=\"#pr-propiedades\">02 · Propiedades</a><a href=\"#pr-info\">03 · Sistemas de información</a><a href=\"#pr-requisitos\">04 · Requisitos y UML</a><a href=\"#pr-agil\">05 · Agilidad y Scrum</a><a href=\"#pr-historias\">06 · Historias</a><a href=\"#pr-test\">Test aleatorio</a></nav><section class=\"practice-study\"><section class=\"evaluation-section\" id=\"pr-sistemas\"><div class=\"evaluation-section-title\"><span>01</span><div><span class=\"section-index\">FUNDAMENTOS · 2 Y 9 DE OCTUBRE</span><h2>Qué hace que algo sea un sistema</h2></div></div><p>Un sistema reúne elementos relacionados que interactúan para cumplir un propósito. Para estudiarlo identifica su objetivo, límite, entorno, entradas, procesos, salidas, componentes, relaciones, control y retroalimentación. Un subsistema cumple una función dentro de un sistema mayor y también puede analizarse como sistema. Macrosistema, subsistema y niveles ecológicos micro, meso, exo y macro describen niveles distintos; no deben confundirse.</p><div class=\"study-example\"><b>Ejemplo aplicado</b><p>En una inscripción, las solicitudes y datos son entradas; validar requisitos y cupos es parte del proceso; la confirmación es una salida. La universidad puede ser el macrosistema y la inscripción un subsistema. La frase de clase “conglomerado + sinergia = sistema” sirve como mnemotecnia: no es una ecuación formal.</p></div></section><section class=\"evaluation-section\" id=\"pr-propiedades\"><div class=\"evaluation-section-title\"><span>02</span><div><span class=\"section-index\">PROPIEDADES · 8 DE OCTUBRE</span><h2>Sinergia, entropía y regulación</h2></div></div><div class=\"evaluation-cards\"><article><h3>Sinergia</h3><p>La interacción coordinada logra un resultado que las partes aisladas no alcanzarían. En un sistema de información, personas, procedimientos y tecnología pueden mejorar juntas la inscripción.</p></article><article><h3>Entropía e incertidumbre</h3><p>Cover y Thomas (1991) definen la entropía como incertidumbre promedio de una variable aleatoria discreta: H(X)=−Σ p(x) log₂ p(x). X es la variable, x un resultado, p(x) su probabilidad, Σ suma los resultados y la base 2 expresa bits. Dado justo: H=−6(1/6)log₂(1/6)=log₂6≈2,585 bits.</p></article><article><h3>Neguentropía y homeostasis</h3><p>La neguentropía describe información, energía o recursos que ayudan a sostener la organización. La homeostasis regula variables para mantenerlas en rangos aceptables: es equilibrio dinámico.</p></article></div><div class=\"study-example\"><b>Cómo usar la entropía al analizar un sistema</b><p>Cuenta la frecuencia de resultados, calcula sus probabilidades y luego H. En 100 solicitudes con 90 éxitos y 10 fallas, H≈0,469 bits por solicitud. La distribución inversa tiene la misma entropía; por sí sola no mide calidad. Acompaña el análisis con tasa de éxito, fallas, tiempo de respuesta y disponibilidad. Feedback corrige tras observar resultados; feedforward actúa con señales anticipadas.</p></div></section><section class=\"evaluation-section\" id=\"pr-info\"><div class=\"evaluation-section-title\"><span>03</span><div><span class=\"section-index\">CLASIFICACIÓN Y FUNCIONAMIENTO</span><h2>Sistemas de información en la organización</h2></div></div><div class=\"evaluation-cards\"><article><h3>Por función</h3><p>TPS procesa transacciones; MIS produce información gerencial; DSS apoya decisiones; ESS/EIS resume información ejecutiva; OAS apoya trabajo de oficina; KMS gestiona conocimiento.</p></article><article><h3>Por arquitectura</h3><p>Centralizada concentra procesamiento; cliente-servidor separa solicitudes y servicios; distribuida reparte tareas entre varios nodos.</p></article><article><h3>Por alcance y usuarios</h3><p>El alcance puede ser individual, departamental, organizacional o interorganizacional. Por usuarios puede ser interno, externo o mixto.</p></article></div><p>También se clasificaron sistemas según su naturaleza, complejidad, automatización y finalidad. La clasificación depende del criterio elegido y del límite del sistema analizado.</p></section><section class=\"evaluation-section\" id=\"pr-requisitos\"><div class=\"evaluation-section-title\"><span>04</span><div><span class=\"section-index\">ACTIVIDAD 1 · REQUISITOS Y UML</span><h2>De la necesidad al modelo comprobable</h2></div></div><div class=\"evaluation-cards\"><article><h3>Requisitos</h3><p>Un requisito funcional describe un servicio o comportamiento: “permitir buscar ejemplares por título”. Uno no funcional establece una cualidad o restricción: por ejemplo, “95 % de búsquedas en ≤2 s con 5 000 registros y 20 usuarios concurrentes”. Un umbral debe incluir condiciones para poder verificarse.</p></article><article><h3>Seguridad y hash</h3><p>Un hash criptográfico transforma datos en una huella no diseñada para recuperar el original. Para contraseñas se usan funciones específicas lentas y una sal única. No equivale a cifrar ni garantiza por sí solo la seguridad del sistema.</p></article><article><h3>UML y diagramas</h3><p>UML es un lenguaje de modelado visual, no una metodología de desarrollo. Casos de uso: objetivos de actores; actividades: flujo y decisiones; secuencia: mensajes en el tiempo; clases: estructura; estados: ciclo de vida; componentes: módulos; despliegue: nodos físicos y ejecutables.</p></article></div><div class=\"study-example\"><b>Casos de uso</b><p>El actor es un rol externo; el caso de uso expresa un objetivo con resultado observable; el rectángulo señala el límite del sistema. La descripción complementaria registra condiciones previas, flujo normal, alternativas y resultado. Un diagrama resume el contexto, no reemplaza toda la especificación.</p></div><h3>Exposiciones disponibles de la Actividad 1</h3><div class=\"practice-materials\"><a href=\"materiales/actividad-1/tema-01-uml-requisitos-v26.pptx\" download><b>01</b><span>UML y requisitos</span><small>PowerPoint</small></a><a href=\"materiales/actividad-1/tema-02-actores-casos-v10.pptx\" download><b>02</b><span>Actores y casos de uso</span><small>PowerPoint</small></a><a href=\"materiales/actividad-1/tema-03-objetos-estados-v5.pptx\" download><b>03</b><span>Objetos y estados</span><small>PowerPoint</small></a><a href=\"materiales/actividad-1/tema-04-modelo-datos-v5.pptx\" download><b>04</b><span>Datos y modelos</span><small>PowerPoint</small></a><a href=\"materiales/actividad-1/informe-actividad-1.docx\" download><b>DOC</b><span>Informe de la Actividad 1</span><small>Word</small></a></div></section><section class=\"evaluation-section\" id=\"pr-agil\"><div class=\"evaluation-section-title\"><span>05</span><div><span class=\"section-index\">METODOLOGÍAS Y MARCOS ÁGILES</span><h2>Ágil, Scrum y XP cumplen papeles distintos</h2></div></div><p>El Manifiesto Ágil valora individuos e interacciones, software funcionando, colaboración con el cliente y respuesta ante el cambio. “Ágil” describe valores y principios. Scrum es un marco de trabajo para abordar problemas complejos mediante ciclos iterativos e incrementales; no prescribe todos los métodos técnicos. XP (Extreme Programming) es una metodología ágil que aporta prácticas de ingeniería y puede combinarse con Scrum. La elección depende del contexto, el equipo, la incertidumbre, el riesgo y la necesidad de prácticas técnicas.</p><div class=\"evaluation-cards\"><article><h3>Responsabilidades</h3><p>Product Owner maximiza el valor y ordena el Product Backlog. Scrum Master ayuda a establecer Scrum y mejorar la efectividad. Developers crean el incremento y gestionan el trabajo técnico.</p></article><article><h3>Eventos</h3><p>Sprint contiene Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective. Planificar define por qué, qué y cómo; Daily inspecciona avance hacia la meta; Review inspecciona el resultado con stakeholders; Retrospective acuerda mejoras.</p></article><article><h3>Artefactos y compromisos</h3><p>Product Backlog–Product Goal; Sprint Backlog–Sprint Goal; Increment–Definition of Done. El backlog es una lista ordenada y emergente; el incremento debe cumplir la Definition of Done.</p></article></div><p>Scrum se apoya en transparencia, inspección y adaptación. Sus valores son compromiso, foco, apertura, respeto y coraje. Los artefactos deben hacer visible el trabajo y su progreso.</p></section><section class=\"evaluation-section\" id=\"pr-historias\"><div class=\"evaluation-section-title\"><span>06</span><div><span class=\"section-index\">HISTORIAS DE USUARIO</span><h2>Explicar el valor desde quien usa el producto</h2></div></div><p>Plantilla común: “Como [rol], quiero [objetivo], para [beneficio]”. Es una descripción breve que inicia conversación; no es una especificación completa. Aclara la historia con criterios de aceptación observables, por ejemplo en formato Dado/Cuando/Entonces. Una historia suele entrar al Product Backlog, refinarse y priorizarse; el equipo puede seleccionar trabajo para un Sprint al planificar.</p><div class=\"study-example\"><b>Ejemplo: responsable de enfermería</b><p>Como responsable de enfermería, quiero consultar los turnos asignados por fecha para detectar rápidamente vacíos de cobertura. Criterios: dada una fecha con rol publicado, cuando abro el calendario, entonces veo el personal asignado por turno; si existe una vacante, el sistema la identifica de forma visible. La historia describe valor; los criterios permiten comprobar el comportamiento.</p></div><p><b>3 C:</b> Card (ficha breve), Conversation (conversación que aclara necesidad y alternativas), Confirmation (criterios que permiten confirmar el resultado). Los criterios de aceptación pertenecen a una historia; la Definition of Done es el estándar compartido del incremento.</p></section><section class=\"practice-sources\"><span class=\"section-index\">FUENTES DE CONSULTA</span><a href=\"https://scrumguides.org/scrum-guide.html\" target=\"_blank\" rel=\"noopener\">Guía oficial de Scrum 2020</a><a href=\"https://agilemanifesto.org/iso/es/manifesto.html\" target=\"_blank\" rel=\"noopener\">Manifiesto Ágil · versión en español</a><a href=\"https://www.omg.org/spec/UML/2.5.1/PDF\" target=\"_blank\" rel=\"noopener\">OMG · UML 2.5.1</a><a href=\"https://www.atlassian.com/agile/project-management/user-stories\" target=\"_blank\" rel=\"noopener\">Historias de usuario · guía práctica</a><a href=\"https://doi.org/10.1002/0471200611\" target=\"_blank\" rel=\"noopener\">Cover y Thomas (1991) · teoría de la información</a></section></section><section class=\"practice-test-section\" id=\"pr-test\"><div class=\"evaluation-section-title\"><span>07</span><div><span class=\"section-index\">BANCO DE '+practiceQuestionBank.length+' PREGUNTAS</span><h2>Test de 10 preguntas</h2></div></div><p>En cada intento se eligen 10 preguntas distintas del banco y se mezclan las opciones. Corrige para ver el puntaje y una explicación. Puedes repetirlo cuantas veces quieras.</p><div id=\"practice-quiz-root\"></div></section></article>';
 document.title='Examen de práctica · Sistemas de Información I';
 newPracticeAttempt();
}
document.addEventListener('submit',(event)=>{
 if(event.target.id!=='practice-form') return;
 event.preventDefault();
 const form=event.target; let score=0;
 currentPracticeAttempt.forEach((entry,index)=>{
  const selected=form.querySelector('input[name=\"answer-'+index+'\"]:checked');
  const chosen=selected?entry.options[Number(selected.value)]:null;
  const correct=entry.options.find((option)=>option.correct);
  if(chosen&&chosen.correct) score++;
  const feedback=document.querySelector('#practice-feedback-'+index);
  feedback.hidden=false; feedback.className='practice-feedback '+(chosen&&chosen.correct?'is-correct':'is-wrong');
  feedback.innerHTML='<b>'+(chosen&&chosen.correct?'Correcta':'Revisa esta respuesta')+'</b><p>'+escapePracticeHtml(entry.item.e)+'</p><small>Respuesta: '+escapePracticeHtml(correct.text)+'</small>';
 });
 form.querySelectorAll('input').forEach((input)=>input.disabled=true);
 const submit=form.querySelector('.practice-submit'); submit.disabled=true; submit.textContent='Intento corregido';
 document.querySelector('#practice-result').innerHTML='<div class=\"practice-score\"><strong>'+score+'/10</strong><span>'+ (score>=8?'Buen dominio. Repasa las explicaciones de las preguntas falladas.':score>=6?'Vas avanzando. Revisa los temas que aún confundiste.':'Repasa la guía y vuelve a intentarlo.')+'</span><button type=\"button\" class=\"practice-restart\" data-practice-restart>Repetir con preguntas aleatorias</button></div>';
 document.querySelector('#practice-result').scrollIntoView({behavior:'smooth',block:'center'});
});
document.addEventListener('click',(event)=>{if(event.target.closest('[data-practice-restart]')) newPracticeAttempt();});

document.addEventListener('click',(event)=>{const link=event.target.closest('.practice-index a[href^="#pr-"]');if(link){event.preventDefault();const target=document.querySelector(link.getAttribute('href'));if(target) target.scrollIntoView({behavior:'smooth',block:'start'});}});
