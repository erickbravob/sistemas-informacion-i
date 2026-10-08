const activity1EvidenceDbName = 'sis1-actividad1-evidencias';
const activity1ImageUrls = new Map();
const activity1DefaultMembers = ['Ashley Aguilar Perez','Nicolas Soria Yabeta','Erick Bravo Borges','Jose Manuel Callecusi Guarachi','Ruben Churqui Limachi'];
function openActivity1EvidenceDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(activity1EvidenceDbName, 1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('photos')) { request.result.createObjectStore('photos', {keyPath:'slot'}); } };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getActivity1Photo(slot) {
  const db = await openActivity1EvidenceDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction('photos').objectStore('photos').get(slot);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}
async function saveActivity1Photo(record) {
  const db = await openActivity1EvidenceDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos','readwrite');
    transaction.objectStore('photos').put(record);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
async function removeActivity1Photo(slot) {
  const db = await openActivity1EvidenceDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos','readwrite');
    transaction.objectStore('photos').delete(slot);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
function getActivity1LocalData() {
  try {
    const data = JSON.parse(localStorage.getItem('sis1-actividad1-local') || '{}');
    return data && typeof data === 'object' ? data : {};
  } catch (error) { return {}; }
}
function saveActivity1LocalData() {
  const data = getActivity1LocalData();
  page.querySelectorAll('[data-photo-metadata]').forEach((field) => { data[field.dataset.photoMetadata] = field.value.trim(); });
  page.querySelectorAll('[data-team-member]').forEach((field) => { data['member-' + field.dataset.teamMember] = field.value.trim(); });
  try { localStorage.setItem('sis1-actividad1-local',JSON.stringify(data)); } catch (error) { }
}
function loadActivity1LocalData() {
  const data = getActivity1LocalData();
  page.querySelectorAll('[data-photo-metadata]').forEach((field) => { field.value = data[field.dataset.photoMetadata] || ''; });
  page.querySelectorAll('[data-team-member]').forEach((field) => { field.value = data['member-' + field.dataset.teamMember] || activity1DefaultMembers[Number(field.dataset.teamMember)] || ''; });
  page.querySelectorAll('[data-saved-member]').forEach((label) => {
    const name = data['member-' + label.dataset.savedMember];
    label.textContent = name || 'pendiente';
  });
}
function renderActivity1PhotoSlot(slot,title,description,isBook) {
  const metadata = isBook
    ? '<div class="evidence-metadata"><label>Título del libro<input data-photo-metadata="' + escapeHtml(slot+'-title') + '" placeholder="Título visible"></label><label>Autor y edición<input data-photo-metadata="' + escapeHtml(slot+'-author') + '" placeholder="Autor · edición"></label><label>Página<input data-photo-metadata="' + escapeHtml(slot+'-page') + '" placeholder="Número o rango"></label></div>'
    : '';
  return '<article class="evidence-slot" data-evidence-slot="' + escapeHtml(slot) + '"><div class="evidence-slot-head"><div><span class="section-index">' + escapeHtml(title) + '</span><p>' + escapeHtml(description) + '</p></div><span class="evidence-state" data-evidence-state>FOTO PENDIENTE</span></div><label class="evidence-file-label" for="photo-' + escapeHtml(slot) + '">Elegir imagen</label><input class="evidence-file-input" id="photo-' + escapeHtml(slot) + '" type="file" accept="image/jpeg,image/png,image/webp" data-evidence-file="' + escapeHtml(slot) + '"><div class="evidence-preview" data-evidence-preview><span>Espacio reservado para la fotografía</span></div>' + metadata + '<div class="evidence-actions"><a data-evidence-download hidden>Descargar copia</a><button type="button" data-evidence-remove="' + escapeHtml(slot) + '" hidden>Quitar foto</button></div><p class="evidence-message" data-evidence-message role="status">Se guarda solo en este navegador · JPG, PNG o WebP · hasta 8 MB.</p></article>';
}
function releaseActivity1PhotoUrls() {
  activity1ImageUrls.forEach((url) => URL.revokeObjectURL(url));
  activity1ImageUrls.clear();
}
async function loadActivity1Photos() {
  loadActivity1LocalData();
  for (const slotElement of page.querySelectorAll('[data-evidence-slot]')) {
    const slot = slotElement.dataset.evidenceSlot;
    try {
      const saved = await getActivity1Photo(slot);
      if (!saved || !slotElement.isConnected) { continue; }
      const url = URL.createObjectURL(saved.blob);
      activity1ImageUrls.set(slot,url);
      slotElement.querySelector('[data-evidence-preview]').innerHTML = '<img src="' + url + '" alt="' + escapeHtml(saved.name) + '"><span>' + escapeHtml(saved.name) + '</span>';
      slotElement.querySelector('[data-evidence-state]').textContent = 'GUARDADA EN ESTE NAVEGADOR';
      const download = slotElement.querySelector('[data-evidence-download]');
      download.href = url; download.download = saved.name; download.hidden = false;
      slotElement.querySelector('[data-evidence-remove]').hidden = false;
      slotElement.querySelector('[data-evidence-message]').textContent = 'Fotografía local guardada. Descarga una copia para incorporarla manualmente a Docs/Actividad 1.';
    } catch (error) {
      const message = slotElement.querySelector('[data-evidence-message]');
      if (message) { message.textContent = 'Este navegador no permite guardar la imagen localmente.'; }
    }
  }
}
async function handleActivity1Photo(input) {
  const slot = input.dataset.evidenceFile;
  const file = input.files && input.files[0];
  const message = page.querySelector('[data-evidence-slot="' + slot + '"] [data-evidence-message]');
  if (!file || !message) { return; }
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { message.textContent = 'Elige una imagen JPG, PNG o WebP.'; input.value = ''; return; }
  if (file.size > 8*1024*1024) { message.textContent = 'La imagen supera 8 MB. Reduce su tamaño y vuelve a elegirla.'; input.value = ''; return; }
  try {
    await saveActivity1Photo({slot,name:file.name,type:file.type,blob:file,savedAt:Date.now()});
    releaseActivity1PhotoUrls();
    await loadActivity1Photos();
  } catch (error) { message.textContent = 'No se pudo guardar la foto localmente. Comprueba el espacio disponible.'; }
}
async function deleteActivity1Photo(slot) {
  await removeActivity1Photo(slot);
  releaseActivity1PhotoUrls();
  await loadActivity1Photos();
}
function renderActivity1() {
  const progress = getActivity1Progress();
  const completed = activity1Steps.filter((step) => progress[step.id] === true).length;
  const topics = activity1Research.map((theme,index) =>
    '<a class="activity-topic-entry" href="#actividad-1-' + escapeHtml(theme.slug) + '"><span class="activity-topic-number">0' + (index+1) + '</span><span><b>' + escapeHtml(theme.shortTitle) + '</b><small>' + escapeHtml(theme.focus) + '</small></span><i aria-hidden="true">↗</i></a>'
  ).join('');
  const members = [0,1,2,3,4].map((n) =>
    '<label class="activity-member"><span>INTEGRANTE 0' + (n+1) + '</span><input type="text" data-team-member="' + n + '" value="' + escapeHtml(activity1DefaultMembers[n]) + '" placeholder="Editar nombre" autocomplete="name"></label>'
  ).join('');
  const tasks = activity1Steps.map((step) => {
    const related = step.related.map((slug) => getConcept(slug)).filter(Boolean).slice(0,2).map((concept) => topicLink(concept,'activity-concept-link')).join('');
    return '<li class="activity-task"><label class="activity-check"><input type="checkbox" data-activity-check="' + escapeHtml(step.id) + '" aria-label="Marcar como completado: ' + escapeHtml(step.title) + '"' + (progress[step.id] === true ? ' checked' : '') + '><span class="activity-checkmark" aria-hidden="true"></span></label><div class="activity-task-copy"><h3>' + escapeHtml(step.title) + '</h3><p>' + escapeHtml(step.detail) + '</p><p class="activity-evidence"><b>Comprueba con:</b> ' + escapeHtml(step.evidence) + '</p><div class="activity-connections"><span>RELACIONADO</span>' + related + '</div></div></li>';
  }).join('');
  const refs = activity1Research.flatMap((theme) => theme.references).filter((ref,index,all) => all.findIndex((item) => item[1]===ref[1])===index)
    .map((ref) => '<li><a href="' + escapeHtml(ref[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(ref[0]) + '</a></li>').join('');
  const reportDownload = '<section class="activity-report-card" aria-labelledby="activity1-report-title"><div><span class="section-index">INFORME DISPONIBLE · ACTIVIDAD 1</span><h2 id="activity1-report-title">Informe de la Actividad 1</h2><p>Documento del equipo en formato Word.</p></div><a href="materiales/actividad-1/informe-actividad-1.docx" download="Informe_Actividad1_SistemasInformacionI.docx">Descargar informe (DOCX) ↓</a></section>';
  page.innerHTML = '<article class="activity-page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span><span>Actividades</span><span>/</span><span>Actividad 1</span></div>' +
    '<header class="activity-header"><div><span class="eyebrow">GUÍA DEL DOCENTE · ACTIVIDAD 1</span><h1>Búsqueda de tesoros<br><em>en la biblioteca.</em></h1><p class="welcome-lead">Investigar los cuatro temas; el grupo expondrá el que asigne el docente. Cada tema tiene una página con conceptos, modelos y referencias.</p></div><section class="activity-meter" aria-label="Avance registrado"><span class="section-index">AVANCE REGISTRADO</span><strong id="activity1-count">' + completed + ' de ' + activity1Steps.length + ' pasos marcados</strong><div class="activity-progress-track" id="activity1-progress-track" role="progressbar" aria-label="Pasos marcados como cumplidos" aria-valuemin="0" aria-valuemax="' + activity1Steps.length + '" aria-valuenow="' + completed + '"><i id="activity1-progress-bar" style="width:' + Math.round(completed/activity1Steps.length*100) + '%"></i></div><small>El grupo registra su avance.</small></section></header>' +
    reportDownload +

    '<section class="activity-section"><div class="activity-section-heading"><span class="section-index">TEMAS DE EXPOSICIÓN</span><p>La actividad reúne cuatro temas relacionados; el docente asigna uno para la exposición.</p></div><nav class="activity-topic-index" aria-label="Investigaciones de la Actividad 1">' + topics + '</nav></section>' +
    '<section class="activity-section"><div class="activity-section-heading"><span class="section-index">EQUIPO · 5 INTEGRANTES</span><p>Los nombres editados se guardan en este navegador.</p></div><div class="activity-team-layout"><div class="activity-roster">' + members + '</div><figure class="activity-team-photo"><img src="assets/actividad-1/evidencias/foto-grupal.jpeg" alt="Integrantes del equipo reunidos con el libro Fundamentos de bases de datos"><figcaption>Equipo de trabajo · fotografía compartida por el grupo</figcaption></figure></div></section>' +
    '<section class="activity-checklist"><div class="activity-section-heading"><span class="section-index">CUMPLIMIENTO DE LA CONSIGNA</span><p>Marca cada paso después de realizarlo y reunir la evidencia indicada.</p></div><ol>' + tasks + '</ol></section>' +
    '<aside class="activity-source-note"><b>Consigna según la diapositiva del docente</b><p>La consigna contempla una exposición temática, consulta de fuentes digitales e impresas y registro de equipo, fuentes y hallazgos. La plantilla de origen ofrece seis espacios para integrantes; el equipo del curso está compuesto por cinco.</p><small>El tema y la fecha de entrega siguen pendientes. Las fotos de libros y del equipo incluidas en esta página forman parte del material publicado. Los cambios de nombres y los archivos que se agreguen desde el navegador permanecen guardados localmente.</small></aside>' +
    '<section class="source-details activity-research-sources"><h2>Fuentes de consulta iniciales</h2><p>La diapositiva del docente define la consigna. Las referencias técnicas respaldan el desarrollo de cada tema.</p><ul>' + refs + '</ul></section></article>';
  document.title='Actividad 1 · Búsqueda de tesoros · Sistemas de Información I';
}
function renderActivity1Diagram(theme) {
  if(theme.slug==='uml-requisitos') {
    return '<div class="research-diagram requirements-map" role="img" aria-label="Necesidad, requisito, modelo y comprobación"><div><small>NECESIDAD</small><b>Encontrar un libro</b></div><i>→</i><div><small>REQUISITO</small><b>Buscar por título</b></div><i>→</i><div><small>MODELO</small><b>Caso de uso</b></div><i>→</i><div><small>COMPROBACIÓN</small><b>Resultado esperado</b></div></div>';
  }
  if(theme.slug==='actores-casos') {
    return '<div class="research-diagram usecase-map"><div class="usecase-actor"><span aria-hidden="true">♙</span><b>Visitante</b><small>actor externo</small></div><span class="usecase-association" aria-hidden="true">⟷</span><div class="usecase-boundary"><small>LÍMITE DEL SISTEMA · CATÁLOGO DE BIBLIOTECA</small><span class="usecase-oval">Buscar libro</span><span class="usecase-oval">Consultar disponibilidad</span><span class="usecase-oval">Iniciar reserva*</span></div></div>';
  }
  if(theme.slug==='objetos-estados') {
    return '<div class="research-diagram state-map"><div class="state-object"><small>INSTANTÁNEA · OBJETO</small><b>ficha01 : RegistroBibliográfico</b><span>título = obra consultada</span><span>ejemplares = disponibilidad visible</span></div><div class="state-sequence"><span>Resultados</span><i>→ abrir</i><span>Ficha</span><i>→ revisar</i><span>Ejemplares</span><i>→ si aparece</i><span>Reserva</span></div></div>';
  }
  return '<div class="research-diagram data-level-map"><div><small>CONCEPTUAL</small><b>Entidades y reglas</b><span>Obra · Autor · Ejemplar</span></div><i>→</i><div><small>LÓGICO</small><b>Atributos y claves</b><span>PK · FK · multiplicidad</span></div><i>→</i><div><small>FÍSICO</small><b>Implementación</b><span>Tipos · índices · restricciones</span></div></div>';
}
function renderActivity1Topic(theme) {
  const idx=activity1Research.findIndex((item)=>item.slug===theme.slug);
  const study=activity1CaseStudies.find((item)=>item.slug===theme.slug);
  const related=theme.related.map((slug)=>getConcept(slug)).filter(Boolean).slice(0,2).map((concept)=>topicLink(concept,'activity-concept-link')).join('');
  const sections=theme.sections.map((section,n)=>'<section class="research-section"><span class="section-index">0'+(n+1)+' · CONTENIDO</span><h2>'+escapeHtml(section.heading)+'</h2><p>'+escapeHtml(section.body)+'</p><ul>'+section.points.map((point)=>'<li>'+escapeHtml(point)+'</li>').join('')+'</ul></section>').join('');
  const visuals=theme.visuals.map((visual)=>'<figure class="activity-graphic"><span class="section-index">DIAGRAMA · '+escapeHtml(visual.title)+'</span><img class="activity-topic-illustration" src="assets/actividad-1/diagramas/'+escapeHtml(visual.file)+'" alt="'+escapeHtml(visual.alt)+'" loading="lazy"><figcaption>'+escapeHtml(visual.caption)+' <a href="assets/actividad-1/diagramas/'+escapeHtml(visual.source)+'" target="_blank" rel="noopener">Abrir fuente editable ↗</a></figcaption></figure>').join('');
  const illustration='<figure class="activity-topic-image"><img src="assets/actividad-1/tema-'+String(idx+1).padStart(2,'0')+'-'+escapeHtml(theme.slug)+'.webp" alt="Ilustración sobre '+escapeHtml(theme.title)+'" loading="lazy"></figure>';
  const books=study.books.map((book,n)=>'<article class="digital-book-card"><span class="section-index">LIBRO DIGITAL</span><h3>'+escapeHtml(book.title)+'</h3><p>'+escapeHtml(book.authors)+' · '+escapeHtml(book.edition)+' · '+escapeHtml(book.year)+'</p><p>'+escapeHtml(book.focus||'')+'</p><a href="'+escapeHtml(book.url)+'" target="_blank" rel="noopener noreferrer">Abrir registro y PDF ↗</a></article>').join('');
  const physical=study.physical;
  const physicalCard='<article class="physical-book-suggestion"><b>'+escapeHtml(physical.title)+'</b><p>'+escapeHtml(physical.authors)+' · '+escapeHtml(physical.publisher)+' · '+escapeHtml(physical.year)+' · '+escapeHtml(physical.pages)+'</p><a href="'+escapeHtml(physical.url)+'" target="_blank" rel="noopener noreferrer">Consultar ficha bibliográfica ↗</a><small>'+escapeHtml(physical.status)+'</small></article>';
  const slideFiles=['tema-01-uml-requisitos-v26.pptx','tema-02-actores-casos-v10.pptx','tema-03-objetos-estados-v5.pptx','tema-04-modelo-datos-v5.pptx'];
  const deckUrl='https://erickbravob.github.io/sistemas-informacion-i/materiales/actividad-1/'+slideFiles[idx]+'?v=20261007-uml-tools-1';
  const slideLink='<section class="topic-slide-link"><span class="section-index">PRESENTACIÓN · TEMA 0'+(idx+1)+'</span><p>'+escapeHtml(theme.title)+'</p><a href="https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(deckUrl)+'" target="_blank" rel="noopener noreferrer">Ver presentación en línea ↗</a></section>';
  const caseStudy='<section class="implementation-case"><div class="case-heading"><span class="section-index">CASO REAL · CATÁLOGO PÚBLICO UPDS</span><h2>'+escapeHtml(study.title)+'</h2><p>'+escapeHtml(study.summary)+'</p><a class="case-source-link" href="'+escapeHtml(study.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(study.sourceTitle)+' ↗</a></div><figure class="activity-graphic case-diagram"><span class="section-index">MODELO APLICADO · '+escapeHtml(theme.shortTitle)+'</span><img class="activity-topic-illustration" src="https://www.plantuml.com/plantuml/svg/'+study.editor.split('/').pop()+'" alt="'+escapeHtml(study.alt)+'" loading="lazy"><figcaption>'+escapeHtml(study.boundary)+'</figcaption><a class="case-editor-link" href="'+escapeHtml(study.editor)+'" target="_blank" rel="noopener noreferrer">Abrir y editar el UML en PlantUML ↗</a></figure><div class="case-facts"><h3>Aplicación al sistema</h3><ul>'+study.observations.map((point)=>'<li>'+escapeHtml(point)+'</li>').join('')+'</ul></div></section>';
  const umlToolkit=theme.slug==='uml-requisitos'?'<section class="uml-toolkit"><span class="section-index">MODELOS Y HERRAMIENTAS UML</span><h2>Una notación para cada vista del sistema</h2><div class="uml-model-grid"><article><b>Casos de uso</b><p>Objetivos de los actores; ejemplo: Estudiante busca una obra.</p></article><article><b>Actividad y secuencia</b><p>Flujo de acciones y mensajes entre participantes.</p></article><article><b>Clases y estados</b><p>Estructura del dominio y cambios durante el ciclo de vida.</p></article><article><b>Componentes y despliegue</b><p>Organización del software y su instalación en equipos.</p></article></div><div class="uml-tool-links"><a href="'+escapeHtml(study.editor)+'" target="_blank" rel="noopener noreferrer"><b>PlantUML</b><span>Editar el caso de uso aplicado ↗</span></a><a href="https://app.diagrams.net/" target="_blank" rel="noopener noreferrer"><b>diagrams.net</b><span>Crear modelos con biblioteca UML ↗</span></a><a href="https://staruml.io/" target="_blank" rel="noopener noreferrer"><b>StarUML</b><span>Modelado UML en entorno dedicado ↗</span></a></div></section>':'';
  page.innerHTML='<article class="activity-topic-page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span><a href="#actividad-1">Actividad 1</a><span>/</span><span>'+escapeHtml(theme.shortTitle)+'</span></div>'+
    '<header class="activity-topic-hero"><span class="eyebrow">ACTIVIDAD 1 · TEMA 0'+(idx+1)+' DE 04</span><h1>'+escapeHtml(theme.title)+'</h1><p class="welcome-lead">'+escapeHtml(theme.focus)+'</p><p class="topic-question">'+escapeHtml(theme.question)+'</p><span class="topic-assignment-state">TEMA ASIGNADO · PENDIENTE DEL DOCENTE</span></header>'+
    '<section class="research-overview"><span class="section-index">IDEA CENTRAL</span><p>'+escapeHtml(theme.summary)+'</p></section>'+illustration+visuals+
    '<section class="research-body">'+sections+'</section>'+caseStudy+umlToolkit+
    '<section class="book-evidence-section"><div class="activity-section-heading"><span class="section-index">LIBROS DE CONSULTA · TEMA 0'+(idx+1)+'</span></div><div class="digital-book-grid">'+books+'</div><div class="physical-book-heading"><h3>Referencia impresa</h3></div>'+physicalCard+'<div class="physical-evidence-label">Fotografías únicas del ejemplar y las páginas vinculadas con este tema:</div><div class="book-photo-gallery">'+study.photos.map((photo)=>'<figure><img src="assets/actividad-1/evidencias/'+escapeHtml(photo[0])+'" alt="'+escapeHtml(photo[1])+'" loading="lazy"><figcaption>'+escapeHtml(photo[1])+'</figcaption></figure>').join('')+'</div><details class="additional-photo-evidence"><summary>Añadir otras fotos de la fuente</summary><div class="book-evidence-grid">'+renderActivity1PhotoSlot(theme.slug+'-libro-portada','PORTADA O PÁGINA LEGAL','Título, autor, edición y editorial visibles.',true)+renderActivity1PhotoSlot(theme.slug+'-libro-pagina','PÁGINA CONSULTADA','Página o rango relacionado con este tema.',true)+'</div></details></section>'+
    slideLink+
    '<section class="source-details activity-topic-references"><h2>Fuentes técnicas complementarias</h2><ul>'+theme.references.map((ref)=>'<li><a href="'+escapeHtml(ref[1])+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(ref[0])+'</a></li>').join('')+'</ul></section>'+
    '<section class="activity-topic-related"><span class="section-index">CONEXIONES CON LA MATERIA</span><div>'+related+'</div></section>'+
    '<nav class="topic-pager" aria-label="Navegación entre temas"><a href="#actividad-1">← Volver a la actividad</a>'+(idx>0?'<a href="#actividad-1-'+escapeHtml(activity1Research[idx-1].slug)+'">Tema anterior</a>':'')+(idx<activity1Research.length-1?'<a href="#actividad-1-'+escapeHtml(activity1Research[idx+1].slug)+'">Tema siguiente →</a>':'')+'</nav></article>';
  document.title=theme.title+' · Actividad 1 · Sistemas de Información I';
}
function renderActivity1Route() {
  const slug=decodeURIComponent(location.hash.slice(1));
  if(slug==='actividad-1'){releaseActivity1PhotoUrls();renderActivity1();void loadActivity1Photos();return;}
  const theme=activity1Research.find((item)=>slug==='actividad-1-'+item.slug);
  if(theme){releaseActivity1PhotoUrls();renderActivity1Topic(theme);void loadActivity1Photos();}
}
document.addEventListener('input',(event)=>{
  if(event.target.matches('[data-team-member],[data-photo-metadata]')){
    const field=event.target;
    const key=field.hasAttribute('data-team-member')?'member-'+field.dataset.teamMember:field.dataset.photoMetadata;
    const data=getActivity1LocalData();data[key]=field.value.trim();
    try{localStorage.setItem('sis1-actividad1-local',JSON.stringify(data));}catch(error){}
    page.querySelectorAll('[data-saved-member]').forEach((label)=>{label.textContent=data['member-'+label.dataset.savedMember]||'pendiente';});
  }
});
document.addEventListener('change',(event)=>{
  const input=event.target.closest('[data-evidence-file]');
  if(input){void handleActivity1Photo(input);}
});
document.addEventListener('click',(event)=>{
  const button=event.target.closest('[data-evidence-remove]');
  if(button){void deleteActivity1Photo(button.dataset.evidenceRemove);}
});
window.addEventListener('hashchange',renderActivity1Route);
renderActivity1Route();
