const categories = ['Todos', ...new Set(concepts.map((item) => item.category))];
const result = document.querySelector('#concept-results');
const search = document.querySelector('#search');
const empty = document.querySelector('#empty-state');
const filters = document.querySelector('#filters');
let activeCategory = 'Todos';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function renderFilters() {
  filters.innerHTML = categories.map((category) => `<button class="filter-button" type="button" aria-pressed="${category === activeCategory}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
}

function renderConcepts() {
  const query = search.value.trim().toLocaleLowerCase('es');
  const visible = concepts.filter((item) => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const haystack = `${item.title} ${item.definition} ${item.example || ''} ${item.category}`.toLocaleLowerCase('es');
    return matchesCategory && haystack.includes(query);
  });
  result.innerHTML = visible.map((item) => `<details class="concept-card reveal"><summary><span class="card-top"><span class="category-label">${escapeHtml(item.category)}</span><span class="card-id">SIS1 · ${escapeHtml(item.id)}</span></span><h3>${escapeHtml(item.title)}<span class="card-plus" aria-hidden="true">+</span></h3></summary><div class="card-content"><p>${escapeHtml(item.definition)}</p>${item.example ? `<div class="card-example"><b>Ejemplo</b> · ${escapeHtml(item.example)}</div>` : ''}<span class="source-state">Síntesis inicial · por contrastar</span></div></details>`).join('');
  document.querySelector('#visible-count').textContent = `${visible.length} ${visible.length === 1 ? 'CONCEPTO' : 'CONCEPTOS'}`;
  empty.hidden = visible.length > 0;
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderConcepts();
});
search.addEventListener('input', renderConcepts);
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    search.focus();
  }
});

const days = [...new Set(concepts.map((item) => item.day))];
document.querySelector('#day-count').textContent = String(days.length).padStart(2, '0');
document.querySelector('#topic-count').textContent = String(concepts.length).padStart(2, '0');
document.querySelector('#day-list').innerHTML = days.map((day) => {
  const [year, month, date] = day.split('-');
  const readable = new Date(`${day}T12:00:00`).toLocaleDateString('es-BO', {day:'2-digit',month:'short',year:'numeric'}).replace('.', '');
  const count = concepts.filter((item) => item.day === day).length;
  return `<a class="day-link" href="#bitacora"><strong>${escapeHtml(readable)}</strong><small>${count} CONCEPTOS · JORNADA 01</small></a>`;
}).join('');
document.querySelector('#current-date').textContent = new Date(`${days.at(-1)}T12:00:00`).toLocaleDateString('es-BO',{day:'2-digit',month:'long',year:'numeric'}).toUpperCase();
renderFilters();
renderConcepts();

