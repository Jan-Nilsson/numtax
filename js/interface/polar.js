import {
  PROPERTY_REGISTRY,
  CATEGORY_REGISTRY
} from '../registry.js';

const POLAR_PROPERTIES = PROPERTY_REGISTRY.filter(
  property => property.visualizations?.includes('polar')
);

const CATEGORIES = Object.entries(CATEGORY_REGISTRY);

let worker;
let requestId = 0;
let activeCategory = null;

const pending = new Map();
const cache = new Map();

function getWorker() {
  if (worker) return worker;

  worker = new Worker(
    new URL('../workers/polar.worker.js', import.meta.url),
    { type: 'module' }
  );

  worker.addEventListener('message', ({ data }) => {
    const resolve = pending.get(data.requestId);
    if (!resolve) return;

    pending.delete(data.requestId);

    if (data.error) {
      resolve({ error: data.error, members: [] });
      return;
    }

    resolve(data);
  });

  return worker;
}

function compute(key, scanLimit) {
  return new Promise(resolve => {
    const id = ++requestId;

    pending.set(id, resolve);
    getWorker().postMessage({
      key,
      scanLimit,
      requestId: id
    });
  });
}

function cacheKey(key, scanLimit) {
  return `${key}:${scanLimit}`;
}

async function getMembers(property, scanLimit) {
  const key = cacheKey(property.key, scanLimit);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const result = await compute(property.key, scanLimit);

  if (result.error) {
    throw new Error(result.error);
  }

  cache.set(key, result.members);
  return result.members;
}

function createCategoryView() {
  const header = document.getElementById('polar-view-header');
  const grid = document.getElementById('polar-grid');

  header.innerHTML = '';
  grid.className = 'polar-category-grid';

  grid.innerHTML = CATEGORIES.map(([key, category]) => `
    <button class="polar-category-card" data-category="${key}">
      <span class="polar-category-title">${category.label}</span>
      <span class="polar-category-count">
        ${POLAR_PROPERTIES.filter(property => property.category === key).length} properties
      </span>
      <span class="polar-category-arrow">→</span>
    </button>
  `).join('');

  grid.querySelectorAll('.polar-category-card').forEach(card => {
    card.addEventListener('click', () => {
      renderCategory(card.dataset.category);
    });
  });
}

function createPropertyCard(property) {
  const card = document.createElement('article');
  card.className = 'polar-card';

  card.innerHTML = `
    <div class="polar-card-header">
      <div>
        <div class="polar-card-title">${property.label}</div>
        <div class="polar-card-category">${CATEGORY_REGISTRY[property.category].label}</div>
      </div>
      <button class="polar-exhaustive-btn" type="button">
        + More
      </button>
    </div>
    <div class="polar-canvas-wrap">
      <canvas class="polar-canvas"></canvas>
      <div class="polar-loading">Rendering...</div>
    </div>
    <div class="polar-card-footer"></div>
  `;

  const canvas = card.querySelector('.polar-canvas');
  const loading = card.querySelector('.polar-loading');
  const footer = card.querySelector('.polar-card-footer');
  const moreButton = card.querySelector('.polar-exhaustive-btn');

  const state = {
    members: [],
    scanLimit: property.defaultCount,
    showingMore: false,
    moreChecked: false,
    hasMore: true
  };

  const render = members => {
    state.members = members;
    drawPolar(canvas, members, state.scanLimit);
    loading.style.display = 'none';
    updateFooter(
      footer,
      members.length,
      state.scanLimit
    );
  };

  const loadDefault = async () => {
    try {
      const members = await getMembers(
        property,
        property.defaultCount
      );

      render(members);
    } catch (error) {
      loading.textContent = 'Error';
      console.error(error);
    }
  };

  const loadMore = async () => {
    if (!state.hasMore || state.showingMore) return;

    moreButton.disabled = true;
    moreButton.textContent = '− Less';

    try {
      const members = await getMembers(
        property,
        property.exhaustiveCount
      );

      state.moreChecked = true;
      state.hasMore = members.length > state.members.length;

      if (!state.hasMore) {
        state.showingMore = false;
        state.scanLimit = property.defaultCount;
        moreButton.textContent = '− Less';
        moreButton.disabled = true;
        render(state.members);
        return;
      }

      state.showingMore = true;
      state.scanLimit = property.exhaustiveCount;
      render(members);
      moreButton.disabled = false;
      moreButton.textContent = '− Less';
    } catch (error) {
      moreButton.disabled = false;
      moreButton.textContent = '+ More';
      console.error(error);
    }
  };

  const loadLess = async () => {
    state.showingMore = false;
    state.scanLimit = property.defaultCount;
    moreButton.disabled = false;
    moreButton.textContent = '+ More';

    try {
      const members = await getMembers(
        property,
        property.defaultCount
      );

      render(members);
    } catch (error) {
      console.error(error);
    }
  };

  moreButton.addEventListener('click', () => {
    if (state.showingMore) {
      loadLess();
    } else {
      loadMore();
    }
  });

  if (property.defaultCount === property.exhaustiveCount) {
    state.hasMore = false;
    moreButton.disabled = true;
  }

  loadDefault();

  return card;
}

function renderCategory(categoryKey) {
  activeCategory = categoryKey;

  const category = CATEGORY_REGISTRY[categoryKey];
  const header = document.getElementById('polar-view-header');
  const grid = document.getElementById('polar-grid');

  header.innerHTML = `
    <div class="polar-view-label">Category</div>
    <div class="polar-view-title">${category.label}</div>
    <button class="polar-back-btn" type="button">← Back</button>
  `;

  header.querySelector('.polar-back-btn').addEventListener('click', () => {
    activeCategory = null;
    createCategoryView();
  });

  grid.className = 'polar-grid';
  grid.innerHTML = '';

  POLAR_PROPERTIES
    .filter(property => property.category === categoryKey)
    .forEach(property => {
      grid.appendChild(createPropertyCard(property));
    });
}

function drawPolar(canvas, members, scanLimit) {
  const size = canvas.offsetWidth * devicePixelRatio;

  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const scale = (size / 2 - 6) / Math.sqrt(scanLimit);

  context.clearRect(0, 0, size, size);

  const theme = document.documentElement.dataset.theme;
  const pointColor =
    theme === 'light'
      ? 'rgba(0,0,0,0.12)'
      : 'rgba(255,255,255,0.06)';

  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim();

  const step =
    scanLimit >= 500000
      ? 4
      : scanLimit >= 100000
        ? 2
        : 1;

  context.fillStyle = pointColor;

  for (let n = 1; n <= scanLimit; n += step) {
    const angle = n;
    const radius = Math.sqrt(n) * scale;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    context.fillRect(Math.round(x), Math.round(y), 1, 1);
  }

  context.fillStyle = accent;

  for (const n of members) {
    const angle = n;
    const radius = Math.sqrt(n) * scale;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    context.fillRect(
      Math.round(x) - 1,
      Math.round(y) - 1,
      2,
      2
    );
  }
}

function updateFooter(footer, memberCount, scanned) {
  footer.innerHTML =
    `<span class="polar-count">${memberCount}</span> members in first ` +
    `<span class="polar-count">${scanned.toLocaleString()}</span> integers` +
    `<span class="polar-count"> (${calculateDensity(memberCount, scanned)}</span>% density)`;
}

function calculateDensity(memberCount, scanned) {
  return Number(
    (memberCount / scanned * 100).toFixed(2)
  );
}

createCategoryView();