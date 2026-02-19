(function () {
  const STORAGE_KEY = 'theme-preference';
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const sunIcon = btn.querySelector('.icon-sun');
  const moonIcon = btn.querySelector('.icon-moon');

  function applyTheme(theme) {
    const lang = html.getAttribute('lang') || 'de';
    const labels = {
      de: { dark: 'Zum hellen Modus wechseln', light: 'Zum dunklen Modus wechseln' },
      en: { dark: 'Switch to light mode', light: 'Switch to dark mode' },
      es: { dark: 'Cambiar al modo claro', light: 'Cambiar al modo oscuro' }
    };
    const currentLabels = labels[lang] || labels.de;

    html.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', theme === 'dark' ? currentLabels.dark : currentLabels.light);

    // Update icons:
    // In Dark Mode -> Show Sun (to switch to Light)
    // In Light Mode -> Show Moon (to switch to Dark)
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Initial application
  applyTheme(getInitialTheme());

  // Event Listener
  btn.addEventListener('click', function () {
    const currentTheme = html.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  });
})();