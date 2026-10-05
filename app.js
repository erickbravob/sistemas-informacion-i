const categories = [...new Set(concepts.map((item) => item.category))];
const page = document.querySelector('#page-content');
const searchInput = document.querySelector('#global-search');
const clearSearch = document.querySelector('#clear-search');
const searchResults = document.querySelector('#search-results');
const topicNav = document.querySelector('#topic-nav');
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('#menu-toggle');
let activeCategory = '';
const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const classDays = [...new Set(concepts.map((item) => item.day).filter(Boolean))].sort();
let selectedClassDay = classDays[classDays.length - 1] || '';
let calendarMonth = selectedClassDay ? new Date(selectedClassDay + 'T12:00:00') : new Date();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function normalize(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

function getConcept(slug) {
  return concepts.find((item) => item.slug === slug);
}

function topicLink(item, extraClass) {
  return '<a class="' + (extraClass || '') + '" href="#' + escapeHtml(item.slug) + '">' + escapeHtml(item.title) + '</a>';
}

function formatShortDate(day) {
  if (!day) return 'sin fecha';
  const [year, month, date] = day.split('-');
  return Number(date) + ' ' + monthNames[Number(month) - 1].slice(0, 3) + ' ' + year;
}
function renderTopicNav() {
  const latestClassDay = classDays[classDays.length - 1];
  document.querySelector('#latest-class-date').textContent = formatShortDate(latestClassDay);
  document.querySelector('#topic-count').textContent = concepts.length + ' conceptos';
  document.querySelector('#footer-course-progress').textContent = 'Apuntes en revisión · última clase ' + formatShortDate(latestClassDay);
  topicNav.innerHTML = categories.map((category) => {
    const items = concepts.filter((item) => item.category === category);
    const isOpen = activeCategory ? activeCategory === category : category === 'Fundamentos';
    return '<section class="topic-group">' +
      '<button class="category-toggle" type="button" data-category="' + escapeHtml(category) + '" aria-expanded="' + isOpen + '">' +
      '<span>' + escapeHtml(category) + '</span><small>' + String(items.length).padStart(2, '0') + '</small><span class="chevron" aria-hidden="true">⌄</span></button>' +
      '<ul class="topic-list"' + (isOpen ? '' : ' hidden') + '>' + items.map((item) =>
        '<li><a href="#' + escapeHtml(item.slug) + '" data-slug="' + escapeHtml(item.slug) + '">' + escapeHtml(item.title) + '</a></li>'
      ).join('') + '</ul></section>';
  }).join('');
}

function renderSearch() {
  const query = normalize(searchInput.value.trim());
  clearSearch.hidden = !query;
  if (!query) {
    searchResults.hidden = true;
    searchResults.innerHTML = '';
    return;
  }
  const matches = concepts.filter((item) => normalize(item.title + ' ' + item.definition + ' ' + (item.example || '') + ' ' + item.category).includes(query)).slice(0, 8);
  searchResults.innerHTML = matches.length
    ? '<span class="results-label">TEMAS ENCONTRADOS · ' + matches.length + '</span>' + matches.map((item) =>
      '<a role="option" href="#' + escapeHtml(item.slug) + '" class="search-result"><span><b>' + escapeHtml(item.title) + '</b><small>' + escapeHtml(item.category) + '</small></span><span class="result-arrow">↗</span></a>'
    ).join('')
    : '<p class="no-results">No hay coincidencias. Prueba con otra palabra.</p>';
  searchResults.hidden = false;
}

function tile(label, detail, active) {
  return '<div class="diagram-node' + (active ? ' is-active' : '') + '"><span class="node-dot"></span><b>' + escapeHtml(label) + '</b>' + (detail ? '<small>' + escapeHtml(detail) + '</small>' : '') + '</div>';
}

function diagramFor(item) {
  const flow = (items) => '<div class="diagram-flow">' + items.map((entry, index) =>
    (index ? '<span class="diagram-arrow" aria-hidden="true">→</span>' : '') + tile(entry[0], entry[1], entry[2])
  ).join('') + '</div>';
  const rows = (items, focus) => '<div class="diagram-rows">' + items.map((entry) =>
    '<div class="diagram-row' + (entry[0] === focus ? ' is-active' : '') + '"><span class="row-mark"></span><b>' + escapeHtml(entry[0]) + '</b><span>' + escapeHtml(entry[1]) + '</span></div>'
  ).join('') + '</div>';

  let graphic = '';
  switch (item.visual) {
    case 'flow':
      graphic = '<div class="system-boundary"><span class="boundary-label">ENTORNO</span>' + flow([['Entrada','datos y recursos'],['Proceso','transformación',true],['Salida','resultados']]) + '<div class="feedback-path"><span>RETROALIMENTACIÓN</span><i>↶</i> la información vuelve al sistema</div></div>';
      break;
    case 'parts':
      graphic = flow([['Personas','conocimientos'],['Procesos','coordinación'],['Tecnología','herramientas']]) + '<div class="diagram-outcome"><span>↓ interacción</span><b>Resultado compartido</b></div>';
      break;
    case 'elements':
      graphic = '<div class="system-boundary"><span class="boundary-label">LÍMITE DEL SISTEMA</span>' + flow([['Entradas','datos'],['Proceso','reglas'],['Salidas','información']]) + '<div class="boundary-footer"><span>Objetivo y control</span><span>Entorno · retroalimentación</span></div></div>';
      break;
    case 'hierarchy':
      graphic = '<div class="hierarchy-graphic"><div class="hierarchy-level level-top"><small>NIVEL MAYOR</small><b>' + (item.slug === 'subsistema' ? 'Sistema' : 'Macrosistema') + '</b></div><span class="vertical-arrow">↓</span><div class="hierarchy-level level-current"><small>PARTE RELACIONADA</small><b>' + escapeHtml(item.title) + '</b></div><span class="vertical-arrow">↓</span><div class="hierarchy-children"><span>Componentes</span><span>Procesos</span><span>Recursos</span></div></div>';
      break;
    case 'ecology':
      graphic = rows([['Microsistema','Interacción directa'],['Mesosistema','Relación entre entornos'],['Exosistema','Influencia indirecta'],['Macrosistema','Cultura y normas']], item.focus);
      break;
    case 'nature':
      graphic = '<div class="compare-grid">' + tile('Natural','Surge sin diseño humano') + tile('Artificial','Diseñado para un fin',true) + '</div><div class="diagram-note">Otra distinción relacionada: sistema físico ↔ sistema abstracto.</div>';
      break;
    case 'complexity':
      graphic = '<div class="compare-grid">' + tile('Simple','Pocos componentes') + tile('Complejo','Más relaciones e interdependencias',true) + '</div>';
      break;
    case 'automation':
      graphic = rows([['Manual','La persona realiza las tareas'],['Semiautomatizado','Personas y tecnología se reparten el trabajo'],['Automatizado','La tecnología ejecuta la mayor parte']], 'Semiautomatizado');
      break;
    case 'purpose':
      graphic = '<div class="compare-grid">' + tile('Propósito general','Sirve para distintas tareas') + tile('Propósito específico','Resuelve una función definida',true) + '</div>';
      break;
    case 'function':
      graphic = rows([['TPS','Registra transacciones'],['MIS','Organiza informes de gestión'],['DSS','Compara opciones para decidir'],['ESS / EIS','Resume información estratégica']], 'TPS') + '<div class="diagram-note">OAS apoya el trabajo de oficina · KMS organiza el conocimiento.</div>';
      break;
    case 'architecture':
      graphic = '<div class="architecture-grid"><div class="architecture-card"><b>Centralizada</b><div class="mini-network"><i></i><span></span><i></i></div><small>Un centro principal</small></div><div class="architecture-card is-active"><b>Cliente-servidor</b><div class="mini-network client"><i></i><span></span><i></i></div><small>Solicita ↔ responde</small></div><div class="architecture-card"><b>Distribuida</b><div class="mini-network spread"><i></i><span></span><i></i><span></span><i></i></div><small>Varios equipos conectados</small></div></div>';
      break;
    case 'scope':
      graphic = rows([['Personal','Una persona'],['Grupal','Un equipo o departamento'],['Empresarial','Una organización'],['Interorganizacional','Varias organizaciones']], 'Empresarial');
      break;
    case 'users':
      graphic = '<div class="user-map"><div class="user-side"><span class="person-icon">●</span><b>Usuarios internos</b><small>Personal y directivos</small></div><span class="user-join">↔</span><div class="user-side is-active"><span class="person-icon">●</span><b>Uso mixto</b><small>Internos y externos</small></div><span class="user-join">↔</span><div class="user-side"><span class="person-icon">●</span><b>Usuarios externos</b><small>Clientes y proveedores</small></div></div>';
      break;
    case 'synergy':
      graphic = '<div class="synergy-graphic"><div class="synergy-parts"><span>Parte A</span><span>Parte B</span><span>Parte C</span></div><span class="big-arrow">↓</span><div class="synergy-result">Resultado conjunto <small>supera el aporte aislado</small></div></div>';
      break;
    case 'entropy':
      graphic = '<div class="change-graphic"><div class="order-state"><b>Organización</b><small>datos y procesos alineados</small></div><span class="big-arrow">→</span><div class="order-state order-fade"><b>Pérdida de orden</b><small>sin renovación ni control</small></div></div>';
      break;
    case 'negentropy':
      graphic = flow([['Información','actualizada'],['Recursos','incorporados'],['Sistema','organización sostenida',true]]);
      break;
    case 'homeostasis':
      graphic = '<div class="balance-graphic"><div class="change-input"><span>Condiciones externas</span><b>cambian</b></div><span class="big-arrow">→</span><div class="regulator"><small>AJUSTE</small><b>Autorregulación</b></div><span class="big-arrow">→</span><div class="stable-range"><small>FUNCIONAMIENTO</small><b>Rango estable</b></div></div>';
      break;
    case 'environment':
      graphic = '<div class="environment-graphic"><div class="outside-zone"><small>MEDIO AMBIENTE</small><span>Personas · reglas · recursos</span><div class="system-boundary environment-boundary"><b>SISTEMA</b><div class="env-flow"><span>entrada ↘</span><strong>Proceso</strong><span>↗ resultado</span></div><small>límite de análisis</small></div><span>↖ efectos hacia el entorno</span></div></div>';
      break;
    case 'attributes':
      graphic = '<div class="attribute-grid"><div class="attribute-card is-active"><span>CUANTITATIVO</span><b>Se cuenta o mide</b><small>Ej.: 120 estudiantes<br>2 s de respuesta</small></div><div class="attribute-card"><span>CUALITATIVO</span><b>Se describe</b><small>Ej.: facilidad de uso<br>mensaje claro</small></div></div><p class="diagram-note">Define cómo observarás cada atributo.</p>';
      break;
    case 'relations':
      graphic = '<div class="relation-network"><div class="relation-center">Inscripción</div><span class="relation-edge edge-one">estudiante</span><span class="relation-edge edge-two">materia y cupos</span><span class="relation-edge edge-three">requisitos</span><span class="relation-edge edge-four">resultado</span></div><p class="diagram-note">Las conexiones hacen que un cambio pueda afectar otras partes.</p>';
      break;
    case 'regulation':
      graphic = '<div class="regulation-loop"><div class="reg-step"><small>01 · OBJETIVO</small><b>Cupo máximo</b></div><span>→</span><div class="reg-step"><small>02 · OBSERVAR</small><b>Inscripciones actuales</b></div><span>→</span><div class="reg-step is-active"><small>03 · COMPARAR</small><b>¿Hay cupo?</b></div><span>→</span><div class="reg-step"><small>04 · AJUSTAR</small><b>Avisar o bloquear</b></div><span class="reg-return">↶ retroalimentación</span></div>';
      break;
    case 'feedback':
      graphic = '<div class="control-loop"><div class="control-card"><small>OBJETIVO</small><b>30 cupos</b></div><span class="control-arrow">→</span><div class="control-card"><small>PROCESO</small><b>Inscripciones</b></div><span class="control-arrow">→</span><div class="control-card"><small>SALIDA MEDIDA</small><b>30 inscritos</b></div><span class="control-arrow">→</span><div class="control-card is-active"><small>COMPARAR Y AJUSTAR</small><b>Cerrar registro</b></div><span class="control-return">↶ El resultado vuelve como información para corregir</span></div>';
      break;
    case 'feedforward':
      graphic = '<div class="feedforward-flow"><div class="control-card"><small>ENTRADA PREVISTA</small><b>Solicitudes previas</b></div><span class="control-arrow">→</span><div class="control-card is-active"><small>ANTICIPAR</small><b>Estimar demanda</b></div><span class="control-arrow">→</span><div class="control-card"><small>ACTUAR ANTES</small><b>Abrir otro grupo</b></div><span class="control-arrow">→</span><div class="control-card"><small>PROCESO</small><b>Inscripción</b></div><p class="diagram-note">Se adelanta al efecto previsto. Después, la retroalimentación comprueba el resultado.</p></div>';
      break;
    case 'requirements':
      graphic = flow([['Necesidades','cliente y usuarios'],['Análisis','aclarar y priorizar'],['Requisitos','documentar',true],['Validación','confirmar con interesados']]);
      break;
    default:
      graphic = flow([['Entrada','recursos'],['Proceso','actividad',true],['Salida','resultado']]);
  }
  return '<figure class="explain-figure"><div class="figure-top"><span>ESQUEMA VISUAL</span><span>' + escapeHtml(item.category.toUpperCase()) + '</span></div><div class="diagram">' + graphic + '</div><figcaption>Lectura rápida · ejemplo de apoyo al concepto</figcaption></figure>';
}

function renderCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = document.querySelector('#calendar-grid');
  const monthLabel = document.querySelector('#calendar-month');
  monthLabel.textContent = monthNames[month].toLocaleUpperCase('es') + ' ' + year;
  const cells = Array.from({length: offset}, () => '<span class="calendar-blank" aria-hidden="true"></span>');
  for (let date = 1; date <= daysInMonth; date += 1) {
    const day = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(date).padStart(2, '0');
    if (classDays.includes(day)) {
      const count = concepts.filter((item) => item.day === day).length;
      cells.push('<button class="calendar-day is-class-day' + (day === selectedClassDay ? ' is-selected' : '') + '" type="button" data-class-day="' + day + '" aria-pressed="' + (day === selectedClassDay) + '" aria-label="' + date + ' de ' + monthNames[month] + ' de ' + year + ', día de clase, ' + count + ' conceptos"><span>' + date + '</span><i aria-hidden="true"></i></button>');
    } else {
      cells.push('<span class="calendar-day" aria-hidden="true">' + date + '</span>');
    }
  }
  grid.innerHTML = cells.join('');
}

function renderDayDetail() {
  const detail = document.querySelector('#calendar-day-detail');
  if (!selectedClassDay) {
    detail.innerHTML = '<div class="calendar-empty-state"><span class="section-index">SIN REGISTROS ESTE MES</span><p>Aún no hay apuntes asociados a una jornada de clase para este mes.</p></div>';
    return;
  }  const dayConcepts = concepts.filter((item) => item.day === selectedClassDay);
  const categoriesForDay = [...new Set(dayConcepts.map((item) => item.category))];
  const summaries = {
    '2026-10-02': {
      title: 'Bases para analizar un sistema',
      text: 'Se organizaron los fundamentos, niveles y clasificaciones de los sistemas y de los sistemas de información. También se relacionaron sus propiedades, el entorno y la regulación para orientar el análisis del proyecto final.'
    },
    '2026-10-05': {
      title: 'Especificación de requisitos del sistema',
      text: 'Se registró el proceso de identificar, analizar, documentar y validar necesidades, y se distinguieron los roles del cliente y el usuario final.'
    }
  };
  const summary = summaries[selectedClassDay] || {
    title: 'Apuntes de la jornada',
    text: 'Se registraron ' + dayConcepts.length + ' conceptos en ' + categoriesForDay.join(', ') + '. La síntesis se completará con los puntos principales de la clase.'
  };
  const [year, month, date] = selectedClassDay.split('-');
  const exam = dayConcepts.find((item) => item.examQuestion);
  detail.innerHTML =
    '<article class="class-day-summary"><span class="section-index">RESUMEN DEL DÍA</span><div class="class-day-date">' + Number(date) + ' ' + monthNames[Number(month) - 1] + ' ' + year + '</div>' +
    '<h2>' + escapeHtml(summary.title) + '</h2><p>' + escapeHtml(summary.text) + '</p>' +
    '<div class="day-tags" aria-label="Temas incluidos">' + categoriesForDay.slice(0, 4).map((category) => '<span>' + escapeHtml(category) + '</span>').join('') + (categoriesForDay.length > 4 ? '<span>+' + (categoriesForDay.length - 4) + ' áreas</span>' : '') + '</div>' +
    '<p class="class-day-count">' + dayConcepts.length + ' conceptos en esta jornada</p>' +
    (selectedClassDay === '2026-10-02' ? '<a class="exam-trigger class-day-resource" href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ferickbravob.github.io%2Fsistemas-informacion-i%2Fmateriales%2Fteoria-general-sistemas-2026-10-02.pptx" target="_blank" rel="noopener noreferrer"><span><b>Presentación del docente</b><small>Teoría General de Sistemas · 2 de octubre</small></span><span aria-hidden="true">↗</span></a>' : '') +
    (exam ? '<button class="exam-trigger" type="button" data-highlight="' + escapeHtml(exam.slug) + '"><span><b>Repaso de examen</b><small>Pregunta de práctica · ' + escapeHtml(exam.title) + '</small></span><span aria-hidden="true">↗</span></button>' : '') +
    '</article>';
}

function renderHome() {
  page.innerHTML =
    '<section class="welcome-page"><div class="daily-kicker"><span class="eyebrow">SISTEMAS DE INFORMACIÓN I</span><span class="day-total">' + classDays.length + ' jornadas con clase</span></div>' +
    '<h1>Calendario de<br><em>clases.</em></h1>' +
    '<p class="welcome-lead">Los días con apuntes registrados aparecen resaltados. Selecciona uno para consultar el resumen y los conceptos trabajados.</p>' +
    '<section class="calendar-panel" aria-label="Calendario de jornadas de clase"><div class="calendar-top"><span class="section-index">AVANCE DE LA MATERIA</span><div class="calendar-controls"><button type="button" data-calendar-step="-1" aria-label="Mes anterior">‹</button><h2 id="calendar-month"></h2><button type="button" data-calendar-step="1" aria-label="Mes siguiente">›</button></div></div>' +
    '<div class="calendar-body"><div class="calendar-left"><div class="calendar-weekdays" aria-hidden="true"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div><div class="calendar-grid" id="calendar-grid"></div><div class="calendar-legend"><i></i><span>Día con apuntes de clase</span></div></div><div id="calendar-day-detail" aria-live="polite"></div></div></section>' +
    '<p class="review-note"><i></i> El calendario resalta solo fechas con conceptos registrados; no agrega fechas de clase supuestas.</p></section>';
  renderCalendar();
  renderDayDetail();
  document.title = 'Calendario de clases · Sistemas de Información I';
}
const activity1StorageKey = 'sis1-activity-1-checklist-v1';
const activity1Steps = [
  {id:'team', title:'Completar el equipo y confirmar el tema', detail:'Llenar los nombres de integrantes en la diapositiva del grupo y confirmar cuál de las cuatro líneas temáticas le corresponde.', evidence:'Diapositiva del grupo completa y tema elegido o asignado.', related:['usuarios','alcance']},
  {id:'sources', title:'Buscar y registrar fuentes físicas y digitales', detail:'La guía muestra espacios separados para los libros físicos y digitales. Anotar título, autor, edición y código de biblioteca; incluir al menos un libro físico encontrado en la biblioteca.', evidence:'Tabla de hallazgos con los datos bibliográficos del libro físico y las fuentes digitales consultadas.', related:['requisitos','usuarios']},
  {id:'develop', title:'Desarrollar los puntos del tema seleccionado', detail:'Explicar los subtemas de la línea elegida con conceptos, ejemplos y diagramas basados en las fuentes consultadas.', evidence:'Contenido de la exposición relacionado con el tema asignado, con citas que permitan localizar las fuentes.', related:['requisitos','relaciones','atributos','arquitectura']},
  {id:'image', title:'Incluir una imagen tomada del libro físico', detail:'Agregar al menos una imagen extraída del libro y señalar de qué libro y página se obtuvo. La guía indica presentarla a los compañeros.', evidence:'Imagen legible en las diapositivas, título del libro y número de página visibles.', related:['requisitos','relaciones']},
  {id:'slides', title:'Completar las diapositivas y sus referencias', detail:'Usar la plantilla de la actividad para presentar el equipo, los hallazgos de biblioteca, el desarrollo del tema y las fuentes. Aplicar la guía APA 7 a citas, figuras y referencias, según las indicaciones del docente.', evidence:'Presentación revisada; datos de autoría y referencias completas, sin espacios de plantilla pendientes.', related:['usuarios','atributos','elementos']},
  {id:'rehearse', title:'Ensayar la exposición de 10 minutos', detail:'Distribuir el tiempo y la participación del grupo. La duración indicada en la diapositiva del docente es de 10 minutos.', evidence:'Ensayo cronometrado y reparto de partes acordado.', related:['usuarios','relaciones']},
  {id:'present', title:'Exponer y verificar la evidencia final', detail:'Presentar el tema a los compañeros y comprobar que la carpeta Actividad 1 conserva la versión final y las evidencias solicitadas.', evidence:'Exposición realizada y archivos finales guardados en Docs/Actividad 1.', related:['sistema','relaciones']}
];
const activity1Themes = [
  ['UML y requisitos','Tipos de diagramas UML; funciones, calidad y restricciones del sistema.'],
  ['Actores y casos de uso','Identificación de actores y diseño del diagrama de casos de uso.'],
  ['Objetos y estados','Diagrama de objetos y diagrama de estados.'],
  ['Datos y clases','Modelos conceptual, lógico y físico; diagrama de clases.']
];
function getActivity1Progress() {
  try {
    const saved = JSON.parse(localStorage.getItem(activity1StorageKey) || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch (error) {
    return {};
  }
}
function updateActivity1Progress() {
  const completed = page.querySelectorAll('[data-activity-check]:checked').length;
  const total = activity1Steps.length;
  const count = page.querySelector('#activity1-count');
  const bar = page.querySelector('#activity1-progress-bar');
  const track = page.querySelector('#activity1-progress-track');
  if (count) { count.textContent = completed + ' de ' + total + ' pasos marcados'; }
  if (bar) { bar.style.width = Math.round((completed / total) * 100) + '%'; }
  if (track) { track.setAttribute('aria-valuenow', String(completed)); }
}
function renderActivity1() {
  const progress = getActivity1Progress();
  const completed = activity1Steps.filter((step) => progress[step.id] === true).length;
  const topics = activity1Themes.map((theme, index) =>
    '<li><span class="activity-topic-number">0' + (index + 1) + '</span><div><b>' + escapeHtml(theme[0]) + '</b><p>' + escapeHtml(theme[1]) + '</p></div></li>'
  ).join('');
  const tasks = activity1Steps.map((step) => {
    const related = step.related.map((slug) => getConcept(slug)).filter(Boolean).map((concept) => topicLink(concept, 'activity-concept-link')).join('');
    return '<li class="activity-task"><label class="activity-check"><input type="checkbox" data-activity-check="' + escapeHtml(step.id) + '" aria-label="Marcar como completado: ' + escapeHtml(step.title) + '"' + (progress[step.id] === true ? ' checked' : '') + '><span class="activity-checkmark" aria-hidden="true"></span></label><div class="activity-task-copy"><h3>' + escapeHtml(step.title) + '</h3><p>' + escapeHtml(step.detail) + '</p><p class="activity-evidence"><b>Comprueba con:</b> ' + escapeHtml(step.evidence) + '</p><div class="activity-connections"><span>SE RELACIONA CON</span>' + related + '</div></div></li>';
  }).join('');
  page.innerHTML =
    '<article class="activity-page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span><span>Actividades</span><span>/</span><span>Actividad 1</span></div>' +
    '<header class="activity-header"><div><span class="eyebrow">GUÍA DEL DOCENTE · ACTIVIDAD 1</span><h1>Búsqueda de tesoros<br><em>en la biblioteca.</em></h1><p class="welcome-lead">Guía de avance basada en la presentación “Buscando tesoros en la biblioteca” y la guía APA 7 guardadas en Docs/Actividad 1.</p></div><section class="activity-meter" aria-label="Avance de la actividad"><span class="section-index">TU AVANCE</span><strong id="activity1-count">' + completed + ' de ' + activity1Steps.length + ' pasos marcados</strong><div class="activity-progress-track" id="activity1-progress-track" role="progressbar" aria-label="Pasos marcados como cumplidos" aria-valuemin="0" aria-valuemax="' + activity1Steps.length + '" aria-valuenow="' + completed + '"><i id="activity1-progress-bar" style="width:' + Math.round((completed / activity1Steps.length) * 100) + '%"></i></div><small>Se guarda en este navegador.</small></section></header>' +
    '<section class="activity-topics"><div class="activity-section-heading"><span class="section-index">ELIGE EL TEMA ASIGNADO</span><p>La presentación propone estas cuatro líneas. Confirma cuál trabajará el grupo.</p></div><ol>' + topics + '</ol></section>' +
    '<section class="activity-checklist"><div class="activity-section-heading"><span class="section-index">LISTA DE CUMPLIMIENTO</span><p>Marca cada paso cuando esté realizado y puedas mostrar su evidencia.</p></div><ol>' + tasks + '</ol></section>' +
    '<aside class="activity-source-note"><b>Qué exige la presentación</b><p>Exposición de 10 minutos, consulta de libros físicos y digitales, referencia de al menos un libro físico de la biblioteca e inclusión de una imagen de ese libro con su título y página. La plantilla también pide los integrantes del grupo y el registro de hallazgos.</p><small>Los checks registran tu avance; no revisan automáticamente el contenido de tus archivos. No se encontró una fecha de entrega en los documentos revisados.</small></aside></article>';
  document.title = 'Actividad 1 · Búsqueda en la biblioteca · Sistemas de Información I';
}

function renderRoadmap() {  const steps = [
    ['01','Definir el problema','Qué necesidad se atenderá, a quién afecta y qué resultado se espera.',['sistema','importancia','usuarios']],
    ['02','Delimitar el sistema','Precisar objetivo, límites, entorno, personas y subsistemas involucrados.',['elementos','subsistema','macrosistema']],
    ['03','Describir el proceso y la información','Identificar entradas, actividades, salidas, datos y retroalimentación.',['elementos','funcion','retroalimentacion']],
    ['04','Elegir cómo organizarlo','Relacionar la función del sistema con una arquitectura y el alcance necesario.',['funcion','arquitectura','alcance']],
    ['05','Planificar la solución','Definir qué se automatiza y qué tarea específica cumplirá el sistema.',['automatizacion','finalidad']],
    ['06','Revisar y ajustar','Observar resultados, detectar pérdida de organización y mantener el funcionamiento.',['sinergia','entropia','neguentropia','homeostasis']]
  ];
  page.innerHTML =
    '<article class="roadmap-page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span><span>Proyecto final</span></div>' +
    '<header class="article-head"><span class="eyebrow">GUÍA DE TRABAJO · BORRADOR</span><h1>Construir el sistema<br><em>en un orden claro.</em></h1><p class="welcome-lead">Una ruta de referencia para pasar de una necesidad a una solución de sistemas de información. La ajustaremos cuando tengamos las instrucciones y el tema del proyecto.</p></header>' +
    '<div class="roadmap-list">' + steps.map((step) =>
      '<section class="roadmap-step"><div class="step-number">' + step[0] + '</div><div class="step-body"><h2>' + escapeHtml(step[1]) + '</h2><p>' + escapeHtml(step[2]) + '</p><div class="step-links">' + step[3].slice(0, 1).map((slug) => { const c = getConcept(slug); return c ? topicLink(c,'wiki-link') : ''; }).join('') + '</div></div><span class="step-connector" aria-hidden="true">↓</span></section>'
    ).join('') + '</div><p class="review-note"><i></i> Esta guía no sustituye la consigna del docente. Se completará con el tema, alcance y entregables definidos para el proyecto final.</p></article>';
  document.title = 'Ruta del proyecto final · Sistemas de Información I';
}

function renderArticle(item) {
  const related = (item.related || []).map((slug) => getConcept(slug)).filter(Boolean);
  const roles = (item.roles || []).map((role) =>
    '<article class="requirement-role"><h3>' + escapeHtml(role.title) + '</h3><p>' + escapeHtml(role.text) + '</p></article>'
  ).join('');
  const roleSection = roles
    ? '<section class="requirements-roles"><div class="roles-heading"><span class="section-index">QUIÉN SOLICITA Y QUIÉN LO USA</span><h2>Cliente y usuario final</h2></div><div class="roles-grid">' + roles + '</div><p class="roles-note">' + escapeHtml(item.rolesNote || '') + '</p></section>'
    : '';
  const requirementTypes = (item.requirementTypes || []).map((type) =>
    '<article class="requirement-role"><h3>' + escapeHtml(type.title) + '</h3><p>' + escapeHtml(type.description) + '</p><p><b>Incluyen:</b> ' + escapeHtml(type.categories) + '</p><p class="requirement-example"><b>Ejemplo:</b> ' + escapeHtml(type.example) + '</p></article>'
  ).join('');
  const requirementTypesSection = requirementTypes
    ? '<section class="requirements-roles requirement-types"><div class="roles-heading"><span class="section-index">IDENTIFICACIÓN DE REQUISITOS</span><h2>Dos categorías principales</h2></div><div class="roles-grid">' + requirementTypes + '</div><p class="roles-note">Las listas son ejemplos de subcategorías; pueden variar según el método. Los requisitos de calidad necesitan criterios medibles y verificables.</p></section>'
    : '';
  const sources = (item.sources || []).map((source) =>    '<li><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.title) + '</a></li>'
  ).join('');
  const sourcesSection = sources
    ? '<details class="source-details"><summary>Fuentes consultadas (' + item.sources.length + ')</summary><ul>' + sources + '</ul></details>'
    : '';
  page.innerHTML =
    '<article class="article-page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span><span>' + escapeHtml(item.category) + '</span><span>/</span><span>' + escapeHtml(item.title) + '</span></div>' +
    '<header class="article-head"><div class="article-meta"><span class="category-pill">' + escapeHtml(item.category) + '</span><span class="record-id">REGISTRO SIS1 · ' + escapeHtml(item.id) + '</span></div><h1>' + escapeHtml(item.title) + '</h1><p class="definition">' + escapeHtml(item.definition) + '</p></header>' +
    '<section class="example-panel"><span class="example-label">EJEMPLO</span><p>' + escapeHtml(item.example || 'Este concepto se relaciona con los elementos y objetivos del sistema que se esté analizando.') + '</p></section>' +
    diagramFor(item) +
    requirementTypesSection +
    roleSection +
    '<section class="related-section"><div class="related-heading"><span class="section-index">SIGUE EL HILO</span><h2>Temas relacionados</h2><p>Abre otro concepto para ver cómo se conecta.</p></div><div class="related-links">' + (related.length ? related.slice(0, 2).map((c) => topicLink(c,'related-link')).join('') : '<a href="#inicio" class="related-link">Volver al cuaderno</a>') + '</div></section>' +
    sourcesSection +
    '<div class="article-status"><span class="status-dot"></span><span>Síntesis inicial · pendiente de contrastar con el material del docente</span></div></article>';
  document.title = item.title + ' · Sistemas de Información I';
}
function renderPage() {
  const slug = decodeURIComponent(location.hash.slice(1));
  const activeItem = getConcept(slug);
  activeCategory = activeItem ? activeItem.category : '';
  renderTopicNav();
  if (activeItem) {
    renderArticle(activeItem);
  } else if (slug === 'ruta') {
    renderRoadmap();
  } else if (slug === 'actividad-1') {
    renderActivity1();
  } else {
    renderHome();
  }
  sidebar.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'smooth'});
}

function chooseSearchResult(event) {
  const link = event.target.closest('a[href^="#"]');
  if (link) {
    searchInput.value = '';
    renderSearch();
  }
}

topicNav.addEventListener('click', (event) => {
  const button = event.target.closest('.category-toggle');
  if (!button) return;
  const list = button.nextElementSibling;
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  list.hidden = isOpen;
});
searchInput.addEventListener('input', renderSearch);
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  renderSearch();
  searchInput.focus();
});
searchResults.addEventListener('click', chooseSearchResult);
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === 'Escape' && searchInput.value) {
    searchInput.value = '';
    renderSearch();
  }
});
menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded',String(isOpen));
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-row')) {
    searchResults.hidden = true;
  } else if (searchInput.value.trim()) {
    searchResults.hidden = false;
  }
});
const highlightDialog = document.querySelector('#highlight-dialog');
const closeHighlightButtons = document.querySelectorAll('[data-close-highlight]');
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-highlight]');
  if (!trigger || !highlightDialog) return;
  const item = getConcept(trigger.dataset.highlight);
  if (!item || !item.examQuestion) return;
  document.querySelector('#highlight-title').textContent = 'Sinergia';
  document.querySelector('#highlight-question').textContent = item.examQuestion;
  document.querySelector('#highlight-answer').textContent = item.examAnswer;
  highlightDialog.showModal();
});
closeHighlightButtons.forEach((button) => button.addEventListener('click', () => highlightDialog.close()));
document.addEventListener('click', (event) => {
  const monthButton = event.target.closest('[data-calendar-step]');
  if (monthButton) {
    calendarMonth.setMonth(calendarMonth.getMonth() + Number(monthButton.dataset.calendarStep));
    const monthKey = calendarMonth.getFullYear() + '-' + String(calendarMonth.getMonth() + 1).padStart(2, '0');
    selectedClassDay = classDays.find((day) => day.startsWith(monthKey)) || '';
    renderCalendar();
    renderDayDetail();
    return;
  }
  const dayButton = event.target.closest('[data-class-day]');
  if (dayButton) {
    selectedClassDay = dayButton.dataset.classDay;
    renderCalendar();
    renderDayDetail();
  }
});document.addEventListener('change', (event) => {
  const checkbox = event.target.closest('[data-activity-check]');
  if (!checkbox) { return; }
  const progress = getActivity1Progress();
  progress[checkbox.dataset.activityCheck] = checkbox.checked;
  try { localStorage.setItem(activity1StorageKey, JSON.stringify(progress)); } catch (error) { }
  updateActivity1Progress();
});
window.addEventListener('hashchange', renderPage);
renderPage();
