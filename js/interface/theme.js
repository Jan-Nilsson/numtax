const storageKey = 'numtax-theme';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getSavedTheme() {
  return localStorage.getItem(storageKey);
}

function initTheme() {
  const theme = getSavedTheme() ?? getSystemTheme();
  applyTheme(theme);
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next    = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(storageKey, next);
}

initTheme();

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (!getSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
});