import {
  PROPERTY_REGISTRY,
  CATEGORY_REGISTRY
} from '../registry.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderFormula(formula) {
  try {
    return katex.renderToString(formula, {
      throwOnError: false,
      displayMode: false
    });
  } catch {
    return escapeHtml(formula);
  }
}

function buildPopover(property) {
  return `
    <div class="popover">
      <div class="popover-formula">${renderFormula(property.formula)}</div>
      <p class="popover-desc">${escapeHtml(property.description)}</p>
    </div>`;
}

function buildMatchTags(rows, number) {
  const matches = rows.filter(row => row.result === true);

  let html =
    `<p class="results-heading">Properties of ` +
    `<span class="results-number">${escapeHtml(number)}</span></p>`;

  if (!matches.length) {
    return html +
      '<p class="no-matches">No properties found for this number.</p>';
  }

  html += '<ul class="match-list">';

  for (const row of matches) {
    const category = CATEGORY_REGISTRY[row.property.category];

    html += `
      <li class="match-tag" tabindex="0" role="button" aria-expanded="false" aria-haspopup="true">
        <span class="match-category">${escapeHtml(category.label)}</span>
        <span class="match-name">${escapeHtml(row.property.label)}</span>
        ${buildPopover(row.property)}
      </li>`;
  }

  return html + '</ul>';
}

function buildFullTable(rows) {
  let html = '';

  for (const [categoryKey, category] of Object.entries(CATEGORY_REGISTRY)) {
    const categoryRows = rows.filter(
      row => row.property.category === categoryKey
    );

    if (!categoryRows.length) continue;

    html += `
      <tbody>
        <tr class="category-header">
          <td colspan="2">
            <span class="category-header-name">${escapeHtml(category.label)}</span>
            <span class="category-header-desc">${escapeHtml(category.description)}</span>
          </td>
        </tr>
        <tr class="category-divider"><td colspan="2"></td></tr>`;

    for (const row of categoryRows) {
      const state =
        row.result === true
          ? 'row-yes'
          : row.result === false
            ? 'row-no'
            : 'row-error';

      const value =
        row.result === true
          ? '✓'
          : row.result === false
            ? '–'
            : escapeHtml(row.result);

      html += `
        <tr class="${state}">
          <td>
            <span class="set-name-wrap" tabindex="0" role="button" aria-expanded="false" aria-haspopup="true">
              ${escapeHtml(row.property.label)}
              ${buildPopover(row.property)}
            </span>
          </td>
          <td>${value}</td>
        </tr>`;
    }

    html += '</tbody>';
  }

  return `
    <div class="table-wrap">
      <table class="results-table">
        <thead>
          <tr><th>Set</th><th>Element of?</th></tr>
        </thead>
        ${html}
      </table>
    </div>`;
}

function closeAllPopovers() {
  document
    .querySelectorAll('.match-tag.open, .set-name-wrap.open')
    .forEach(trigger => {
      trigger.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });

  if (activeScrollCleanup) {
    activeScrollCleanup();
    activeScrollCleanup = null;
  }
}

let activeScrollCleanup = null;

function placePopover(trigger) {
  const popover = trigger.querySelector('.popover');
  if (!popover) return;

  const rect = trigger.getBoundingClientRect();
  const width = 300;
  const gap = 10;
  const arrowSize = 6;

  if (
    rect.bottom < 0 ||
    rect.top > window.innerHeight ||
    rect.right < 0 ||
    rect.left > window.innerWidth
  ) {
    closeAllPopovers();
    return;
  }

  let left = rect.left;

  if (left + width > window.innerWidth - 8) {
    left = window.innerWidth - width - 8;
  }

  if (left < 8) left = 8;

  const down = rect.top < 160;

  popover.dataset.direction = down ? 'down' : 'up';
  popover.style.top = `${down ? rect.bottom + gap : rect.top - gap}px`;
  popover.style.left = `${left}px`;

  let arrow = popover.querySelector('.popover-arrow');

  if (!arrow) {
    arrow = document.createElement('span');
    arrow.className = 'popover-arrow';
    popover.appendChild(arrow);
  }

  arrow.style.left = `${Math.min(
    Math.max(
      rect.left - left + rect.width / 2 - arrowSize,
      arrowSize * 2
    ),
    width - arrowSize * 4
  )}px`;
}

function openPopover(trigger) {
  closeAllPopovers();

  trigger.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');

  const popover = trigger.querySelector('.popover');
  if (!popover) return;

  popover.setAttribute('role', 'tooltip');

  const id = `popover-${Math.random().toString(36).slice(2)}`;
  popover.id = id;
  trigger.setAttribute('aria-describedby', id);

  const update = () => placePopover(trigger);

  update();
  window.addEventListener('scroll', update, { passive: true });

  document
    .querySelectorAll('.results, .results-full')
    .forEach(el =>
      el.addEventListener('scroll', update, { passive: true })
    );

  activeScrollCleanup = () => {
    window.removeEventListener('scroll', update);

    document
      .querySelectorAll('.results, .results-full')
      .forEach(el =>
        el.removeEventListener('scroll', update)
      );
  };
}

function handleTriggerClick(event) {
  const trigger = event.target.closest(
    '.match-tag, .set-name-wrap'
  );

  if (!trigger) return;

  event.stopPropagation();

  const wasOpen = trigger.classList.contains('open');

  closeAllPopovers();

  if (!wasOpen) {
    openPopover(trigger);
  }
}

function handleTriggerKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') return;

  const trigger = event.target.closest(
    '.match-tag, .set-name-wrap'
  );

  if (!trigger) return;

  event.preventDefault();
  event.stopPropagation();

  const wasOpen = trigger.classList.contains('open');

  closeAllPopovers();

  if (!wasOpen) {
    openPopover(trigger);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('num-form');
  const input = document.getElementById('number');
  const results = document.getElementById('results');

  document.addEventListener('click', closeAllPopovers);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllPopovers();
    }
  });

  results.addEventListener('click', handleTriggerClick);
  results.addEventListener('keydown', handleTriggerKeydown);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    closeAllPopovers();
    results.innerHTML = '';

    const number = Number(input.value);

    if (!Number.isInteger(number)) {
      results.innerHTML =
        '<p class="error-msg">Please enter a valid integer.</p>';
      return;
    }

    if (
      number < 0 ||
      number > Number.MAX_SAFE_INTEGER
    ) {
      results.innerHTML =
        '<p class="error-msg">Number must be between 0 and 9,007,199,254,740,991 (2⁵³ − 1).</p>';
      return;
    }

    results.innerHTML =
      '<p class="loading">Calculating…</p>';

    const rows = await Promise.all(
      PROPERTY_REGISTRY.map(async property => {
        try {
          return {
            property,
            result: Boolean(
              await Promise.resolve(
                property.predicate(number)
              )
            )
          };
        } catch (error) {
          console.error(
            `Error executing ${property.key}:`,
            error
          );

          return {
            property,
            result: `Error: ${error.message}`
          };
        }
      })
    );

    results.innerHTML = `
      <div class="results-matches">
        ${buildMatchTags(rows, number)}
      </div>
      <details class="results-full">
        <summary>Full table</summary>
        ${buildFullTable(rows)}
      </details>`;
  });
});