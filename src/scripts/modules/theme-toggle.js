const STORAGE_KEY = 'theme';
const toggleBtn = document.getElementById('theme-toggle');
const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  if (toggleBtn) {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    toggleBtn.setAttribute('aria-label', isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro');
  }
}

function setThemeOrigin(x, y) {
  document.documentElement.style.setProperty('--theme-toggle-x', `${x}px`);
  document.documentElement.style.setProperty('--theme-toggle-y', `${y}px`);
}

function switchTheme(nextTheme, originX, originY) {
  localStorage.setItem(STORAGE_KEY, nextTheme);

  const supportsViewTransition = typeof document.startViewTransition === 'function';

  if (!supportsViewTransition || prefersReducedMotionQuery.matches) {
    applyTheme(nextTheme);
    return;
  }

  setThemeOrigin(originX, originY);

  const endRadius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY),
  );
  document.documentElement.style.setProperty('--theme-toggle-radius', `${endRadius}px`);

  document.startViewTransition(() => {
    applyTheme(nextTheme);
  });
}

function handleToggleClick(event) {
  const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  const rect = toggleBtn.getBoundingClientRect();
  const originX = event.clientX || rect.left + rect.width / 2;
  const originY = event.clientY || rect.top + rect.height / 2;

  switchTheme(nextTheme, originX, originY);
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', handleToggleClick);
}

prefersDarkQuery.addEventListener('change', (event) => {
  if (!getStoredTheme()) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});
