/**
 * ZeroNux Portfolio - Theme Management Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Default: Light Mode
 * - Solid flat colors for both Light & Dark modes
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'zeronux_theme';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Storage unavailable or disabled
    }

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    if (theme === 'dark') {
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun theme-icon';
      if (themeLabel) themeLabel.textContent = 'Light';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to Light mode');
    } else {
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon theme-icon';
      if (themeLabel) themeLabel.textContent = 'Dark';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to Dark mode');
    }
  }

  function initTheme() {
    const currentTheme = getStoredTheme();
    applyTheme(currentTheme);

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }
  }

  // Export to global window namespace
  window.ZeroNuxTheme = {
    init: initTheme,
    apply: applyTheme,
    get: getStoredTheme
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
