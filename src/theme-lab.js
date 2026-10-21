/*
 * ALLOY // THEME LAB
 * Runtime color overlay for visually testing primary, secondary (surface)
 * and background tokens. State persists across pages via localStorage.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'alloy-theme-lab';
  var HIDDEN_KEY = 'alloy-theme-lab-hidden';

  /* Each control drives one or more CSS variables so both the semantic
     tokens (bg / bg-alt / primary) and the raw zinc utilities respond. */
  var CHANNELS = {
    primary: {
      vars: ['--color-primary'],
      fallback: '#ff9531'
    },
    secondary: {
      vars: ['--color-secondary', '--color-bg-alt', '--color-zinc-900'],
      fallback: '#18181b'
    },
    background: {
      vars: ['--color-bg', '--color-zinc-950'],
      fallback: '#09090b'
    }
  };

  var root = document.documentElement;

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage unavailable */ }
  }

  function applyChannel(key, value) {
    CHANNELS[key].vars.forEach(function (cssVar) {
      if (value) {
        root.style.setProperty(cssVar, value);
      } else {
        root.style.removeProperty(cssVar);
      }
    });
  }

  function applyAll(state) {
    Object.keys(CHANNELS).forEach(function (key) {
      applyChannel(key, state[key] || null);
    });
  }

  function init() {
    var panel = document.getElementById('themeLab');
    var openBtn = document.getElementById('themeLabOpen');
    if (!panel || !openBtn) return;

    var hideBtn = document.getElementById('themeLabHide');
    var resetBtn = document.getElementById('themeLabReset');
    var state = loadState();

    applyAll(state);

    /* Wire the three color channels */
    Object.keys(CHANNELS).forEach(function (key) {
      var input = panel.querySelector('[data-theme-channel="' + key + '"]');
      var readout = panel.querySelector('[data-theme-value="' + key + '"]');
      if (!input) return;

      var current = state[key] || CHANNELS[key].fallback;
      input.value = current;
      if (readout) readout.textContent = current.toUpperCase();

      input.addEventListener('input', function () {
        state[key] = input.value;
        applyChannel(key, input.value);
        if (readout) readout.textContent = input.value.toUpperCase();
        saveState(state);
      });
    });

    /* Reset to the stock Alloy tokens */
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state = {};
        saveState(state);
        applyAll(state);
        Object.keys(CHANNELS).forEach(function (key) {
          var input = panel.querySelector('[data-theme-channel="' + key + '"]');
          var readout = panel.querySelector('[data-theme-value="' + key + '"]');
          if (input) input.value = CHANNELS[key].fallback;
          if (readout) readout.textContent = CHANNELS[key].fallback.toUpperCase();
        });
      });
    }

    /* Hide / restore the bar (persisted across pages) */
    function setHidden(hidden) {
      panel.classList.toggle('hidden', hidden);
      openBtn.classList.toggle('hidden', !hidden);
      try {
        localStorage.setItem(HIDDEN_KEY, hidden ? '1' : '0');
      } catch (e) { /* storage unavailable */ }
    }

    if (hideBtn) hideBtn.addEventListener('click', function () { setHidden(true); });
    openBtn.addEventListener('click', function () { setHidden(false); });

    var startHidden = false;
    try {
      startHidden = localStorage.getItem(HIDDEN_KEY) === '1';
    } catch (e) { /* storage unavailable */ }
    setHidden(startHidden);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
