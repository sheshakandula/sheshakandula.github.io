/**
 * Theme Toggle for Minimal Mistakes
 * Switches between dark and light themes with localStorage persistence
 */

(function() {
  'use strict';

  // Theme configuration
  const THEMES = {
    dark: 'dark',
    light: 'default'
  };

  const STORAGE_KEY = 'mm-theme-preference';
  const BODY_CLASSES = {
    dark: 'dark-theme',
    light: 'light-theme'
  };

  /**
   * Get current theme from localStorage or default to dark
   */
  function getCurrentTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || 'dark';
  }

  /**
   * Apply theme to the page
   */
  function applyTheme(theme) {
    const body = document.body;

    // Remove both theme classes
    body.classList.remove(BODY_CLASSES.dark, BODY_CLASSES.light);

    // Add the current theme class
    body.classList.add(BODY_CLASSES[theme]);

    // Update data attribute for CSS targeting
    body.setAttribute('data-theme', theme);

    // Update localStorage
    localStorage.setItem(STORAGE_KEY, theme);

    // Update toggle button state
    updateToggleButton(theme);
  }

  /**
   * Toggle between themes
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  /**
   * Update toggle button appearance
   */
  function updateToggleButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const icon = button.querySelector('.theme-toggle-icon');
    const text = button.querySelector('.theme-toggle-text');

    if (theme === 'dark') {
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = 'Light';
      button.setAttribute('aria-label', 'Switch to light theme');
      button.setAttribute('title', 'Switch to light theme');
    } else {
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = 'Dark';
      button.setAttribute('aria-label', 'Switch to dark theme');
      button.setAttribute('title', 'Switch to dark theme');
    }
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Apply saved theme immediately (before page renders)
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);

    // Set up toggle button event listener
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.addEventListener('click', toggleTheme);
    }
  }

  // Apply theme as early as possible to prevent flash
  const savedTheme = getCurrentTheme();
  if (document.body) {
    applyTheme(savedTheme);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

})();
