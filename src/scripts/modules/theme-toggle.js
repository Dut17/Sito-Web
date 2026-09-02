// Gestione tema chiaro/scuro: preferenza salvata > preferenza di sistema
const STORAGE_KEY = 'theme';
const toggleBtn = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

// Se l'utente non ha mai scelto manualmente, segue il sistema anche a runtime
prefersDark.addEventListener('change', (event) => {
  if (!getStoredTheme()) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});
