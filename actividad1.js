const activity1Research = [
  {
    slug: 'uml-requisitos',
    title: 'UML y requisitos del sistema',
    shortTitle: 'UML y requisitos',
    focus: 'Expresar qué necesita el sistema y representar sus vistas con modelos UML.',
    question: '¿Cómo convertimos una necesidad en algo que se pueda diseñar y comprobar?',
    summary: 'Los requisitos describen necesidades, funciones y condiciones que el sistema debe cumplir. UML aporta una notación para representar aspectos de su comportamiento y estructura. Se complementan: los requisitos dicen qué se espera; los modelos ayudan a analizar y comunicar una solución.',
    sections: [
      { heading: 'Necesidad y requisito', body: 'Una necesidad expresa un problema u objetivo de una persona interesada. El análisis la convierte en requisitos con alcance claro, una fuente identificable y una forma de comprobar su cumplimiento. NASA recomienda conservar la trazabilidad hacia la fuente y planificar la verificación.', points: ['Requisito funcional: acción o servicio que el sistema debe ofrecer.', 'Requisito de calidad o restricción: condición medible sobre desempeño, seguridad, interfaz, entorno u operación.', '“Fácil de usar” es una expectativa; debe concretarse en condiciones observables para poder evaluarla.'] },
      { heading: 'UML como lenguaje de modelado', body: 'El Lenguaje Unificado de Modelado (UML) define una notación para especificar, visualizar y documentar modelos de sistemas. No es por sí mismo un método completo de desarrollo. Cada diagrama muestra una perspectiva distinta; no se deben incluir todos si no responden a una pregunta del análisis.', points: ['Comportamiento: casos de uso, actividades, secuencias y máquinas de estado.', 'Estructura: clases, objetos, componentes y despliegue.', 'Para esta actividad son relevantes los casos de uso, objetos, estados y clases de los cuatro temas.'] },
      { heading: 'Ejemplo aplicado a la biblioteca', body: 'Escenario didáctico, no tema asignado del proyecto final: un estudiante necesita localizar un libro. La búsqueda del catálogo es una función; un tiempo de respuesta acordado y verificable puede ser un requisito de desempeño.', points: ['RF-01: el sistema permitirá buscar ejemplares por título o autor.', 'RNF-01: bajo una carga y conjunto de datos acordados, el sistema responderá dentro de un tiempo objetivo definido por el cliente.', 'Relación: RF-01 se representa en un caso de uso y se comprueba con una prueba de búsqueda. El objetivo temporal no se inventa: debe acordarse.'] }
    ],
    speakers: [
      ['Planteamiento y requisito', 'Presentar la consigna, la necesidad y la diferencia entre necesidad y requisito.'],
      ['Funciones y condiciones', 'Explicar requisitos funcionales frente a condiciones de calidad, con los ejemplos RF-01 y RNF-01.'],
      ['UML y sus vistas', 'Definir UML y mostrar qué pregunta responden los diagramas de comportamiento y estructura.'],
      ['Trazabilidad', 'Recorrer el ejemplo desde una necesidad hasta requisito, modelo y forma de verificación.'],
      ['Hallazgo y conclusión', 'Resumir por qué los requisitos necesitan ser claros y comprobables; presentar las fuentes.']
    ],
    related: ['requisitos', 'arquitectura'],
    references: [
      ['Object Management Group. (2017). Unified Modeling Language (UML), Version 2.5.1.', 'https://www.omg.org/spec/UML/2.5.1/PDF'],
      ['NASA. (2016). NASA Systems Engineering Handbook (NASA/SP-2016-6105 Rev. 2), Appendix C: How to Write a Good Requirement.', 'https://www.nasa.gov/reference/system-engineering-handbook-appendix/'],
      ['NASA Software Engineering Handbook. (s. f.). SWE-109: Software Requirements Specification.', 'https://swehb.nasa.gov/spaces/7150/pages/16449740/SWE-109%2B-%2BSoftware%2BRequirements%2BSpecification']
    ]
  },
  {
    slug: 'actores-casos',
    title: 'Actores y casos de uso',
    shortTitle: 'Actores y casos de uso',
    focus: 'Delimitar quién interactúa con el sistema y qué objetivos espera alcanzar.',
    question: '¿Quién se comunica con el sistema y qué resultado valioso busca?',
    summary: 'Un actor representa un rol externo que intercambia información o acciones con el sistema. Un caso de uso describe el comportamiento que ofrece para alcanzar un objetivo observable. El diagrama muestra estas relaciones desde la perspectiva externa, sin revelar la implementación interna.',
    sections: [
      { heading: 'Actores y roles', body: 'Un actor es un rol desempeñado por una persona, organización o sistema externo; no equivale necesariamente a una persona específica. La misma persona puede desempeñar roles distintos. Un actor se encuentra fuera del límite del sistema que se analiza.', points: ['Actor primario: inicia una interacción para obtener un resultado.', 'Actor de apoyo: otro sistema o servicio que participa en una interacción.', 'Los nombres de actores deben indicar roles, como Estudiante o Bibliotecario.'] },
      { heading: 'Casos de uso y límite', body: 'Un caso de uso representa una meta alcanzable mediante interacciones con el sistema y debe producir un resultado observable de valor. El rectángulo de límite indica qué funciones pertenecen al sistema; los actores se ubican fuera y los casos de uso dentro.', points: ['Nombra cada caso con una acción y su objeto: Buscar libro, Reservar ejemplar.', 'Une el actor con los casos en los que participa.', '“include” modela comportamiento requerido reutilizado; “extend” añade comportamiento condicionado u opcional. Úsalos solo si la relación aporta claridad.'] },
      { heading: 'Ejemplo aplicado a la biblioteca', body: 'Escenario didáctico: el estudiante busca y reserva un ejemplar. El bibliotecario registra un préstamo y una devolución. El catálogo puede ofrecer resultados, pero las reglas de reserva pertenecen al sistema de biblioteca que se está delimitando.', points: ['Estudiante → Buscar libro; Consultar disponibilidad; Reservar ejemplar.', 'Bibliotecario → Registrar préstamo; Registrar devolución.', 'El diagrama no prueba que el proceso sea correcto: cada caso necesita su flujo principal, alternativas y reglas en una especificación textual.'] }
    ],
    speakers: [
      ['Situación y propósito', 'Presentar la necesidad de identificar personas y sistemas que interactúan con una solución.'],
      ['Actores', 'Explicar qué es un actor y diferenciar rol, persona y sistema externo.'],
      ['Casos de uso y límite', 'Explicar objetivos, el límite del sistema y la posición de actores y funciones.'],
      ['Diagrama de ejemplo', 'Recorrer las interacciones de búsqueda, reserva, préstamo y devolución.'],
      ['Hallazgo y conclusión', 'Explicar cómo los casos de uso ayudan a precisar funciones y preparar pruebas.']
    ],
    related: ['usuarios', 'funcion'],
    references: [
      ['Object Management Group. (2017). Unified Modeling Language (UML), Version 2.5.1, Clause 18: UseCases.', 'https://www.omg.org/spec/UML/2.5.1/PDF'],
      ['IBM. (s. f.). The use-case model.', 'https://www.ibm.com/docs/en/rsas/7.5.0?topic=model-use-case'],
      ['IBM. (s. f.). Use cases in modeling diagrams.', 'https://www.ibm.com/docs/en/dma?topic=diagrams-use-cases']
    ]
  },
  {
    slug: 'objetos-estados',
    title: 'Objetos y diagramas de estado',
    shortTitle: 'Objetos y estados',
    focus: 'Mostrar instancias concretas y cómo cambia su comportamiento ante eventos.',
    question: '¿Qué existe en un momento determinado y cómo cambia su estado?',
    summary: 'Un diagrama de objetos presenta instancias y valores en una situación concreta. Una máquina de estados representa los estados posibles de un elemento y las transiciones provocadas por eventos, a veces sujetas a condiciones. Uno describe una instantánea; el otro, comportamiento a través del tiempo.',
    sections: [
      { heading: 'Objeto e instancia', body: 'Una instancia es un objeto concreto de una clase, mostrado con sus valores en un instante. La notación habitual distingue el nombre de la instancia del nombre de la clase y puede mostrar sus atributos. El diagrama permite revisar si los objetos y sus enlaces representan un escenario coherente.', points: ['Ejemplo: ejemplar01:Ejemplar; codigo = E-104; estado = Prestado.', 'Un diagrama de objetos no sustituye al diagrama de clases: muestra ejemplos concretos, no la definición general de los tipos.', 'Los datos de este ejemplo son ficticios y solo ilustran la notación.'] },
      { heading: 'Estado, evento y transición', body: 'Un estado indica una condición durante la vida de un objeto. Una transición cambia de estado cuando ocurre un evento y se cumple la guarda, si existe. La acción asociada describe una respuesta. UML define notación y semántica para máquinas de estados.', points: ['Evento: devolver ejemplar.', 'Guarda posible: el préstamo corresponde a ese ejemplar.', 'Transición: Prestado → Disponible, con registro de la devolución.'] },
      { heading: 'Ciclo de un ejemplar', body: 'Escenario didáctico: un ejemplar disponible se reserva, se retira en préstamo y luego se devuelve. Si la reserva vence sin retiro, el ejemplar puede regresar a disponible. Las reglas concretas deben confirmarse con la política de la biblioteca.', points: ['Disponible → Reservado → Prestado → Disponible.', 'Evento de vencimiento: Reservado → Disponible.', 'No todas las bibliotecas usan los mismos estados: se modelan las reglas del dominio investigado.'] }
    ],
    speakers: [
      ['Problema y propósito', 'Presentar por qué interesa distinguir una instancia concreta del comportamiento de su tipo.'],
      ['Diagrama de objetos', 'Explicar objetos, clases y valores con la instantánea del ejemplar E-104.'],
      ['Máquina de estados', 'Explicar estado, evento, guarda y transición en UML.'],
      ['Ciclo del ejemplar', 'Recorrer reserva, préstamo, devolución y vencimiento, aclarando las reglas supuestas.'],
      ['Hallazgo y conclusión', 'Comparar lo que responde cada diagrama y presentar las fuentes.']
    ],
    related: ['sistema', 'relaciones'],
    references: [
      ['Object Management Group. (2017). Unified Modeling Language (UML), Version 2.5.1, Clauses 13 and 14: State Machines.', 'https://www.omg.org/spec/UML/2.5.1/PDF'],
      ['NASA Software Engineering Handbook. (s. f.). SWE-109: Software Requirements Specification, required states and modes.', 'https://swehb.nasa.gov/spaces/7150/pages/16449740/SWE-109%2B-%2BSoftware%2BRequirements%2BSpecification']
    ]
  },
  {
    slug: 'datos-clases',
    title: 'Datos, modelos y diagrama de clases',
    shortTitle: 'Datos y clases',
    focus: 'Pasar de conceptos del dominio a una estructura lógica y una base implementable.',
    question: '¿Qué datos debe conservar el sistema y cómo se relacionan?',
    summary: 'El modelado de datos separa decisiones del dominio de decisiones de implementación. Un modelo conceptual organiza entidades y reglas del negocio; uno lógico precisa atributos, claves y relaciones; uno físico adapta el diseño a un gestor concreto. Un diagrama de clases UML puede representar estructura y comportamiento de clases, pero no es idéntico a un esquema relacional.',
    sections: [
      { heading: 'Tres niveles de modelado', body: 'El nivel conceptual explica qué información existe y cómo se relaciona, sin comprometerse con un producto de base de datos. El lógico define entidades, atributos, identificadores y restricciones. El físico concreta tablas, tipos de datos, índices y reglas propias del motor elegido.', points: ['Conceptual: Estudiante realiza Préstamo; Préstamo corresponde a Ejemplar.', 'Lógico: Estudiante(estudiante_id, nombre); Prestamo(prestamo_id, estudiante_id, ejemplar_id, fecha).', 'Físico: tipos, longitudes, índices y sintaxis dependen del gestor elegido.'] },
      { heading: 'Clases, atributos y relaciones', body: 'En un diagrama de clases, una clase agrupa propiedades y operaciones de elementos del mismo tipo. Las asociaciones muestran relaciones; su multiplicidad indica cuántos objetos pueden participar. Una asociación entre clases no determina por sí sola las tablas físicas.', points: ['Estudiante 1 — 0..* Prestamo: una persona estudiante puede tener ninguno o varios préstamos.', 'Ejemplar 1 — 0..* Prestamo: un ejemplar puede participar en préstamos a lo largo del tiempo; cada préstamo corresponde a un ejemplar.', 'Las operaciones describen comportamiento de objetos; las tablas de una base relacional almacenan datos y restricciones.'] },
      { heading: 'Integridad y normalización', body: 'Las claves identifican filas y conectan tablas. Una clave foránea referencia una clave de otra tabla y ayuda a mantener integridad referencial. La normalización organiza datos para reducir repeticiones y anomalías; debe aplicarse con reglas del dominio y no como una receta separada del problema.', points: ['Cada entidad necesita un identificador estable.', 'Los vínculos de uno a muchos suelen representarse colocando la clave foránea en el lado “muchos”.', 'Separar Título y Ejemplar evita repetir la descripción bibliográfica por cada copia física.'] }
    ],
    speakers: [
      ['Información y problema', 'Presentar qué necesita conservar un sistema de biblioteca y por qué importa modelar antes de implementarlo.'],
      ['Niveles de datos', 'Comparar modelo conceptual, lógico y físico con el mismo ejemplo.'],
      ['Clases y multiplicidad', 'Explicar atributos, asociaciones y cardinalidad del diagrama.'],
      ['Claves e integridad', 'Mostrar la conexión entre Estudiante, Préstamo y Ejemplar y explicar PK/FK.'],
      ['Hallazgo y conclusión', 'Distinguir diagrama de clases de esquema físico y resumir la progresión de diseño.']
    ],
    related: ['arquitectura', 'elementos'],
    references: [
      ['Object Management Group. (2017). Unified Modeling Language (UML), Version 2.5.1, Clause 11: Classes.', 'https://www.omg.org/spec/UML/2.5.1/PDF'],
      ['Oracle. (2018). SQL Developer Data Modeler Concepts and Usage, Version 18.1, Section 1.4: Approaches to Data Modeling.', 'https://docs.oracle.com/database/sql-developer-data-modeler-18.1/DMDUG/data-modeler-concepts-usage.htm'],
      ['Microsoft. (s. f.). Primary and foreign key constraints.', 'https://learn.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints?view=sql-server-ver16'],
      ['Microsoft. (s. f.). Database normalization description.', 'https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description']
    ]
  }
];