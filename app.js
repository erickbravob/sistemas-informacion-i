const categories = [...new Set(concepts.map((item) => item.category))];
const page = document.querySelector('#page-content');
const searchInput = document.querySelector('#global-search');
const clearSearch = document.querySelector('#clear-search');
const searchResults = document.querySelector('#search-results');
const topicNav = document.querySelector('#topic-nav');
const sidebar = document.querySelector('#sidebar');
const menuToggle = document.querySelector('#menu-toggle');
let activeCategory = '';

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

function renderTopicNav() {
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
      graphic = '<div class="feedback-graphic"><div class="loop-node">Sistema</div><span>resultado</span><div class="loop-node loop-result">Información</div><span>ajuste</span><div class="loop-node">Sistema</div></div><p class="diagram-note">El resultado vuelve como información para orientar una corrección.</p>';
      break;
    default:
      graphic = flow([['Entrada','recursos'],['Proceso','actividad',true],['Salida','resultado']]);
  }
  return '<figure class="explain-figure"><div class="figure-top"><span>ESQUEMA VISUAL</span><span>' + escapeHtml(item.category.toUpperCase()) + '</span></div><div class="diagram">' + graphic + '</div><figcaption>Lectura rápida · ejemplo de apoyo al concepto</figcaption></figure>';
}

function renderHome() {
  page.innerHTML =
    '<section class="welcome-page">' +
      '<span class="eyebrow">CUADERNO DE CLASE · 02 OCT 2026</span>' +
      '<h1>Un tema por vez.<br><em>Un sistema bien pensado.</em></h1>' +
      '<p class="welcome-lead">Consulta conceptos conectados y recorre una guía inicial para ordenar el proyecto final. Usa el buscador o el temario lateral para entrar a un tema.</p>' +
      '<div class="home-map"><div class="home-map-label">PUNTO DE PARTIDA</div><div class="home-map-flow"><a href="#sistema"><small>01</small><b>Comprender</b><span>Sistema y elementos</span></a><i>→</i><a href="#funcion"><small>02</small><b>Relacionar</b><span>Información y usuarios</span></a><i>→</i><a href="#ruta"><small>03</small><b>Desarrollar</b><span>Proyecto final</span></a></div></div>' +
      '<div class="home-shortcuts"><a href="#sistema"><span>FUNDAMENTOS</span><b>¿Qué hace que algo sea un sistema?</b><i>↗</i></a><a href="#arquitectura"><span>DISEÑO</span><b>¿Cómo se organizan sus componentes?</b><i>↗</i></a><a href="#ruta"><span>PROYECTO FINAL</span><b>¿Qué conviene resolver primero?</b><i>↗</i></a></div>' +
      '<p class="review-note"><i></i> Las síntesis de esta jornada siguen pendientes de contraste con el material de clase.</p>' +
    '</section>';
  document.title = 'Inicio · Sistemas de Información I';
}

function renderRoadmap() {
  const steps = [
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
      '<section class="roadmap-step"><div class="step-number">' + step[0] + '</div><div class="step-body"><h2>' + escapeHtml(step[1]) + '</h2><p>' + escapeHtml(step[2]) + '</p><div class="step-links">' + step[3].map((slug) => { const c = getConcept(slug); return c ? topicLink(c,'wiki-link') : ''; }).join('') + '</div></div><span class="step-connector" aria-hidden="true">↓</span></section>'
    ).join('') + '</div><p class="review-note"><i></i> Esta guía no sustituye la consigna del docente. Se completará con el tema, alcance y entregables definidos para el proyecto final.</p></article>';
  document.title = 'Ruta del proyecto final · Sistemas de Información I';
}

function renderArticle(item) {
  const related = (item.related || []).map((slug) => getConcept(slug)).filter(Boolean);
  page.innerHTML =
    '<article class="article-page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span><span>' + escapeHtml(item.category) + '</span><span>/</span><span>' + escapeHtml(item.title) + '</span></div>' +
    '<header class="article-head"><div class="article-meta"><span class="category-pill">' + escapeHtml(item.category) + '</span><span class="record-id">REGISTRO SIS1 · ' + escapeHtml(item.id) + '</span></div><h1>' + escapeHtml(item.title) + '</h1><p class="definition">' + escapeHtml(item.definition) + '</p></header>' +
    '<section class="example-panel"><span class="example-label">EJEMPLO</span><p>' + escapeHtml(item.example || 'Este concepto se relaciona con los elementos y objetivos del sistema que se esté analizando.') + '</p></section>' +
    diagramFor(item) +
    '<section class="related-section"><div class="related-heading"><span class="section-index">SIGUE EL HILO</span><h2>Temas relacionados</h2><p>Abre otro concepto para ver cómo se conecta.</p></div><div class="related-links">' + (related.length ? related.map((c) => topicLink(c,'related-link')).join('') : '<a href="#inicio" class="related-link">Volver al cuaderno</a>') + '</div></section>' +
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
window.addEventListener('hashchange', renderPage);
renderPage();



