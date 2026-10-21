/*
 * ALLOY // THEME LAB
 * Runtime color overlay for visually testing primary, secondary (surface)
 * and background tokens. State persists across pages via localStorage.
 *
 * Contrast engine:
 *  - If the chosen background is light, the whole neutral ramp (white,
 *    zinc-200..zinc-950, border, surfaces) is re-derived from the background
 *    so headings, body text and panels stay legible automatically.
 *  - If the chosen background is dark but not the default, the ramp is
 *    re-derived as tints of the background so surfaces stay in harmony.
 *  - Text sitting on primary-colored elements (buttons, tiles, chips) is
 *    switched between dark and light ink depending on which contrasts
 *    better with the chosen primary color.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'alloy-theme-lab';
  var HIDDEN_KEY = 'alloy-theme-lab-hidden';

  var DARK_INK = '#09090b';
  var LIGHT_INK = '#fafafa';

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

  /* Neutral ramp, expressed as "how far from the background toward the
     ink color" each token sits. Mirrors the stock zinc scale. */
  var RAMP = {
    '--color-zinc-950': 0.02,
    '--color-zinc-900': 0.07,
    '--color-zinc-800': 0.13,
    '--color-border':   0.16,
    '--color-bg-alt':   0.07,
    '--color-zinc-700': 0.30,
    '--color-zinc-600': 0.44,
    '--color-zinc-500': 0.55,
    '--color-zinc-400': 0.66,
    '--color-zinc-300': 0.76,
    '--color-zinc-200': 0.85,
    '--color-zinc-100': 0.92,
    '--color-white':    0.97
  };
  var RAMP_VARS = Object.keys(RAMP);

  var root = document.documentElement;

  /* ---------- color math ---------- */

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16)
    ];
  }

  function rgbToHex(rgb) {
    return '#' + rgb.map(function (v) {
      v = Math.max(0, Math.min(255, Math.round(v)));
      return (v < 16 ? '0' : '') + v.toString(16);
    }).join('');
  }

  function mix(hexA, hexB, amount) {
    var a = hexToRgb(hexA);
    var b = hexToRgb(hexB);
    return rgbToHex([
      a[0] + (b[0] - a[0]) * amount,
      a[1] + (b[1] - a[1]) * amount,
      a[2] + (b[2] - a[2]) * amount
    ]);
  }

  function luminance(hex) {
    var rgb = hexToRgb(hex).map(function (v) {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

  function contrast(hexA, hexB) {
    var la = luminance(hexA);
    var lb = luminance(hexB);
    var hi = Math.max(la, lb);
    var lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  /* Nudge an accent color toward the page's ink until it reads at
     WCAG AA (4.5:1) against the given background. Returns the color
     unchanged when it is already legible. */
  function readableAccent(color, bg) {
    var ink = luminance(bg) > 0.45 ? '#000000' : '#ffffff';
    for (var t = 0; t <= 1.001; t += 0.05) {
      var candidate = mix(color, ink, t);
      if (contrast(candidate, bg) >= 4.5) return candidate;
    }
    return ink;
  }

  /* ---------- state ---------- */

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

  /* ---------- legibility rules ----------
     Injected once. Activated through data attributes on <html>, so the
     rules apply to every component on the page, including markup that is
     copied from the SOURCE dialogs. */

  function injectRules() {
    if (document.getElementById('themeLabRules')) return;
    var inkTargets = function (mode) {
      var sel = 'html[data-primary-ink="' + mode + '"] ';
      return [
        sel + '[class~="bg-primary"][class~="text-zinc-950"]',
        sel + '[class~="bg-primary"] [class~="text-zinc-950"]',
        sel + '[class~="bg-primary"][class~="text-bg"]',
        sel + '[class~="bg-primary"] [class~="text-bg"]',
        sel + '[class~="bg-primary"] [class*="text-zinc-950/"]',
        sel + '[class~="bg-primary"][class*="text-zinc-950/"]',
        sel + '[class~="hover:bg-primary"]:hover'
      ].join(',\n');
    };
    var chipScopes = '[class~="bg-emerald-500"],[class~="bg-amber-500"],[class~="bg-rose-500"]';
    var css = [
      '/* Ink on primary-colored surfaces follows the primary color\'s contrast */',
      inkTargets('dark') + ' { color: ' + DARK_INK + ' !important; }',
      inkTargets('light') + ' { color: ' + LIGHT_INK + ' !important; }',
      '/* Status chips keep dark ink even when the neutral ramp is inverted */',
      'html[data-theme-mode="light"] :is(' + chipScopes + ')[class~="text-zinc-950"],',
      'html[data-theme-mode="light"] :is(' + chipScopes + ') [class~="text-zinc-950"] { color: ' + DARK_INK + ' !important; }',
      '/* hover:bg-white fills: dark ink while white stays white, light ink when the ramp is inverted */',
      'html[data-theme-mode="dark"] [class~="hover:bg-white"]:hover { color: ' + DARK_INK + ' !important; }',
      'html[data-theme-mode="light"] [class~="hover:bg-white"]:hover { color: ' + LIGHT_INK + ' !important; }',
      '/* Outline buttons that empty their fill on hover revert to primary-colored text */',
      'html[data-theme-mode] [class~="hover:bg-transparent"]:hover { color: var(--color-primary) !important; }',
      '/* Group-hover primary fills follow the primary ink too */',
      'html[data-primary-ink="dark"] [class~="group"]:hover [class~="group-hover:bg-primary"] { color: ' + DARK_INK + ' !important; }',
      'html[data-primary-ink="light"] [class~="group"]:hover [class~="group-hover:bg-primary"] { color: ' + LIGHT_INK + ' !important; }',
      '/* Hover accents (sidebar filters, links, tiles) use a contrast-checked primary */',
      'html[data-theme-mode] [class~="hover:text-primary"]:hover,',
      'html[data-theme-mode] [class~="group"]:hover [class~="group-hover:text-primary"] { color: var(--tl-readable-primary, var(--color-primary)) !important; }'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'themeLabRules';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- application ---------- */

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
    /* Clear every override first so re-derivation starts clean. */
    RAMP_VARS.forEach(function (v) { root.style.removeProperty(v); });
    Object.keys(CHANNELS).forEach(function (key) {
      applyChannel(key, state[key] || null);
    });

    var bg = state.background || CHANNELS.background.fallback;
    var primary = state.primary || CHANNELS.primary.fallback;
    var isLight = luminance(bg) > 0.45;

    root.setAttribute('data-theme-mode', isLight ? 'light' : 'dark');

    /* Re-derive the neutral ramp from a custom background so text,
       borders and surfaces always read against it. */
    if (state.background) {
      var ink = isLight ? '#000000' : '#ffffff';
      RAMP_VARS.forEach(function (cssVar) {
        root.style.setProperty(cssVar, mix(bg, ink, RAMP[cssVar]));
      });
      /* An explicit secondary choice wins over the derived surface color. */
      if (state.secondary) {
        applyChannel('secondary', state.secondary);
      }
      /* Background channel owns bg + zinc-950; reapply after ramp. */
      applyChannel('background', state.background);
      root.style.setProperty('--color-zinc-950', mix(bg, ink, RAMP['--color-zinc-950']));
    }

    /* Choose the ink that contrasts best with the primary color. */
    var inkMode = contrast(primary, DARK_INK) >= contrast(primary, LIGHT_INK) ? 'dark' : 'light';
    root.setAttribute('data-primary-ink', inkMode);

    /* Hover accents must stay legible against the page background:
       darken (light mode) or lighten (dark mode) the primary as needed. */
    root.style.setProperty('--tl-readable-primary', readableAccent(primary, bg));
  }

  /* ---------- UI ---------- */

  function init() {
    injectRules();

    var panel = document.getElementById('themeLab');
    var openBtn = document.getElementById('themeLabOpen');
    var state = loadState();

    /* Apply stored theme even if the panel markup is missing. */
    applyAll(state);

    if (!panel || !openBtn) return;

    var hideBtn = document.getElementById('themeLabHide');
    var resetBtn = document.getElementById('themeLabReset');

    Object.keys(CHANNELS).forEach(function (key) {
      var input = panel.querySelector('[data-theme-channel="' + key + '"]');
      var readout = panel.querySelector('[data-theme-value="' + key + '"]');
      if (!input) return;

      var current = state[key] || CHANNELS[key].fallback;
      input.value = current;
      if (readout) readout.textContent = current.toUpperCase();

      input.addEventListener('input', function () {
        state[key] = input.value;
        applyAll(state);
        if (readout) readout.textContent = input.value.toUpperCase();
        saveState(state);
      });
    });

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
