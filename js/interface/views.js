import { PROPERTY_REGISTRY, CATEGORY_REGISTRY } from '../registry.js';
import { drawPolar } from './views/polar.js';
import { drawNumberLine } from './views/number-line.js';
import { drawSquareSpiral } from './views/square-spiral.js';
import { drawGaps } from './views/gaps.js';
import { drawDensity } from './views/density.js';
import { drawModular } from './views/modular.js';

const VIEWS = [
  {
    key: 'polar',
    label: 'Polar',
    description: 'Integers plotted at angle n and radius √n.',
    canvasClass: ''
  },
  {
    key: 'number-line',
    label: 'Number Line',
    description: 'Set members plotted on a linear number axis.',
    canvasClass: 'number-line-wrap'
  },
  {
    key: 'square-spiral',
    label: 'Square Spiral',
    description: 'Set members arranged on a square integer spiral.',
    canvasClass: 'square-spiral-wrap'
  },
  {
    key: 'gaps',
    label: 'Gaps',
    description: 'Distances between consecutive members of the set.',
    canvasClass: 'gap-chart-wrap'
  },
  {
    key: 'density',
    label: 'Density',
    description: 'Cumulative proportion of members up to each integer.',
    canvasClass: 'density-chart-wrap'
  },
  {
    key: 'modular',
    label: 'Modular',
    description: 'Distribution of members across residue classes modulo 12.',
    canvasClass: 'modular-chart-wrap'
  }
];

const RENDERERS = {
  polar: drawPolar,
  'number-line': drawNumberLine,
  'square-spiral': drawSquareSpiral,
  gaps: drawGaps,
  density: drawDensity,
  modular: drawModular
};

const PROPERTIES = PROPERTY_REGISTRY.filter(
  property =>
    property.visualizations?.includes('polar') ||
    property.visualizations?.includes('number-line')
);

const home = document.getElementById('explore-home');
const header = document.getElementById('polar-view-header');
const grid = document.getElementById('polar-grid');

let worker;
let requestId = 0;
let selectedCategory = null;
let selectedView = null;

const pending = new Map();
const cache = new Map();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function getPropertiesForView() {
  return PROPERTIES;
}

function getWorker() {
  if (worker) return worker;

  worker = new Worker(
    new URL('../workers/views.worker.js', import.meta.url),
    { type: 'module' }
  );

  worker.addEventListener('message', ({ data }) => {
    const callback = pending.get(data.requestId);
    if (!callback) return;

    pending.delete(data.requestId);

    if (data.error) {
      callback.reject(new Error(data.error));
    } else {
      callback.resolve(data.members);
    }
  });

  worker.addEventListener('error', error => {
    for (const callback of pending.values()) {
      callback.reject(new Error('The calculation worker failed.'));
    }

    pending.clear();
    worker = null;
    console.error('Views worker error:', error);
  });

  return worker;
}

function compute(key, scanLimit) {
  return new Promise((resolve, reject) => {
    const id = ++requestId;
    pending.set(id, { resolve, reject });

    try {
      getWorker().postMessage({
        key,
        scanLimit,
        requestId: id
      });
    } catch (error) {
      pending.delete(id);
      reject(error);
    }
  });
}

async function getMembers(property, scanLimit) {
  const key = `${property.key}:${scanLimit}`;

  if (cache.has(key)) return cache.get(key);

  const members = await compute(property.key, scanLimit);
  cache.set(key, members);

  return members;
}

function categoryCards(viewKey) {
  return Object.entries(CATEGORY_REGISTRY).map(([key, category]) => {
    const count = getPropertiesForView(viewKey).filter(
      property => property.category === key
    ).length;

    if (!count) return '';

    return `
      <button
        class="polar-category-card"
        data-category="${escapeHtml(key)}"
        type="button"
      >
        <span class="polar-category-title">
          ${escapeHtml(category.label)}
        </span>
        <span class="explore-card-description">
          ${escapeHtml(category.description)}
        </span>
        <span class="polar-category-count">${count} properties</span>
        <span class="polar-category-arrow">→</span>
      </button>
    `;
  }).join('');
}

function viewCards() {
  return VIEWS.map(view => `
    <button
      class="polar-category-card"
      data-view="${escapeHtml(view.key)}"
      type="button"
    >
      <span class="polar-category-title">
        ${escapeHtml(view.label)}
      </span>
      <span class="explore-card-description">
        ${escapeHtml(view.description)}
      </span>
      <span class="polar-category-arrow">→</span>
    </button>
  `).join('');
}

function setScreen(screen) {
  home.hidden = screen !== 'home';
  header.hidden = screen === 'home';
  grid.hidden = screen === 'home';
}

function renderHome() {
  selectedCategory = null;
  selectedView = null;

  setScreen('home');

  home.innerHTML = `
    <section class="explore-section">
      <h2 class="explore-section-title">Choose a view</h2>
      <div class="polar-category-grid">
        ${viewCards()}
      </div>
    </section>
  `;

  home.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      selectedView = button.dataset.view;
      renderCategoryPicker();
    });
  });
}

function changeView(nextView) {
  if (nextView === selectedView) return;

  selectedView = nextView;

  if (selectedCategory) {
    const categorySupported = getPropertiesForView(nextView).some(
      property => property.category === selectedCategory
    );

    if (categorySupported) {
      renderPropertyView(selectedCategory);
    } else {
      renderCategoryPicker();
    }
  } else {
    renderCategoryPicker();
  }
}

function renderToolbar(title, subtitle, backLabel, onBack) {
  header.innerHTML = `
    <div class="polar-view-label">
      ${escapeHtml(subtitle)}
    </div>
    <div class="polar-view-title">
      ${escapeHtml(title)}
    </div>
    <div class="explore-toolbar">
      <div
        class="explore-view-switch"
        role="group"
        aria-label="Select visualization"
      >
        ${VIEWS.map(view => `
          <button
            class="explore-mode-btn ${view.key === selectedView ? 'active' : ''}"
            data-view="${escapeHtml(view.key)}"
            type="button"
            aria-pressed="${view.key === selectedView}"
            title="${escapeHtml(view.description)}"
          >${escapeHtml(view.label)}</button>
        `).join('')}
      </div>

      <label class="explore-mobile-view-wrap">
        <span class="explore-mobile-view-label">View</span>
        <select
          class="explore-mobile-view-select"
          data-mobile-view
          aria-label="Select visualization"
        >
          ${VIEWS.map(view => `
            <option
              value="${escapeHtml(view.key)}"
              ${view.key === selectedView ? 'selected' : ''}
            >${escapeHtml(view.label)}</option>
          `).join('')}
        </select>
      </label>

      <button class="polar-back-btn" data-back type="button">
        ${escapeHtml(backLabel)}
      </button>
    </div>
  `;

  header.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      changeView(button.dataset.view);
    });
  });

  header.querySelector('[data-mobile-view]').addEventListener(
    'change',
    event => {
      changeView(event.target.value);
    }
  );

  header.querySelector('[data-back]').addEventListener('click', onBack);
}

function renderCategoryPicker() {
  selectedCategory = null;

  setScreen('categories');

  const view = VIEWS.find(item => item.key === selectedView);

  renderToolbar(
    view.label,
    'Choose a category',
    '← All views',
    renderHome
  );

  grid.className = 'polar-category-grid';
  grid.innerHTML = categoryCards(selectedView);

  grid.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category;
      renderPropertyView(selectedCategory);
    });
  });
}

function renderPropertyView(categoryKey) {
  selectedCategory = categoryKey;

  setScreen('properties');

  const category = CATEGORY_REGISTRY[categoryKey];

  renderToolbar(
    category.label,
    'Properties',
    '← Categories',
    renderCategoryPicker
  );

  grid.className = 'polar-grid';
  grid.innerHTML = '';

  getPropertiesForView(selectedView)
    .filter(property => property.category === categoryKey)
    .forEach(property => {
      grid.appendChild(createPropertyCard(property, selectedView));
    });
}

function createPropertyCard(property, viewKey) {
  const view = VIEWS.find(item => item.key === viewKey);
  const renderer = RENDERERS[viewKey];

  const card = document.createElement('article');
  card.className = 'polar-card';

  card.innerHTML = `
    <div class="polar-card-header">
      <div>
        <div class="polar-card-title">
          ${escapeHtml(property.label)}
        </div>
        <div class="polar-card-category">
          ${escapeHtml(CATEGORY_REGISTRY[property.category].label)}
        </div>
      </div>
      <button class="polar-exhaustive-btn" type="button">
        + More
      </button>
    </div>
    <div class="polar-canvas-wrap ${view.canvasClass}">
      <canvas
        class="polar-canvas"
        aria-label="${escapeHtml(property.label)} in ${escapeHtml(view.label)} view"
      ></canvas>
      <div class="polar-loading">Rendering...</div>
    </div>
    <div class="polar-card-footer"></div>
  `;

  const canvas = card.querySelector('.polar-canvas');
  const loading = card.querySelector('.polar-loading');
  const footer = card.querySelector('.polar-card-footer');
  const moreButton = card.querySelector('.polar-exhaustive-btn');

  const state = {
    defaultMembers: [],
    showingMore: false,
    hasMore: property.defaultCount !== property.exhaustiveCount
  };

  function render(members, scanLimit) {
    renderer(canvas, members, scanLimit);
    loading.style.display = 'none';
    updateFooter(footer, members.length, scanLimit);
  }

  async function loadDefault() {
    try {
      state.defaultMembers = await getMembers(
        property,
        property.defaultCount
      );

      render(state.defaultMembers, property.defaultCount);
      moreButton.disabled = !state.hasMore;
    } catch (error) {
      loading.textContent = 'Error';
      moreButton.disabled = true;
      console.error(error);
    }
  }

  async function loadMore() {
    if (!state.hasMore || state.showingMore) return;

    moreButton.disabled = true;
    moreButton.textContent = '…';

    try {
      const members = await getMembers(
        property,
        property.exhaustiveCount
      );

      if (members.length <= state.defaultMembers.length) {
        state.hasMore = false;
        state.showingMore = false;
        moreButton.textContent = '+ More';
        render(state.defaultMembers, property.defaultCount);
        return;
      }

      state.showingMore = true;
      moreButton.textContent = '− Less';
      render(members, property.exhaustiveCount);
    } catch (error) {
      moreButton.textContent = '+ More';
      console.error(error);
    } finally {
      moreButton.disabled = !state.hasMore && !state.showingMore;
    }
  }

  function loadLess() {
    state.showingMore = false;
    moreButton.textContent = '+ More';
    moreButton.disabled = !state.hasMore;
    render(state.defaultMembers, property.defaultCount);
  }

  moreButton.disabled = !state.hasMore;

  moreButton.addEventListener('click', () => {
    if (state.showingMore) {
      loadLess();
    } else {
      loadMore();
    }
  });

  loadDefault();

  return card;
}

function updateFooter(footer, memberCount, scanned) {
  const density = scanned
    ? Number((memberCount / scanned * 100).toFixed(2))
    : 0;

  footer.innerHTML =
    `<span class="polar-count">${memberCount.toLocaleString()}</span> members in first ` +
    `<span class="polar-count">${scanned.toLocaleString()}</span> integers · ` +
    `<span class="polar-count">${density}%</span> density`;
}

renderHome();