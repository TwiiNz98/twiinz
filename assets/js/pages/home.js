/**
 * TWIINZ STUDIO — pages/home.js
 * Orquesta la inicialización específica de index.html.
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const UI   = window.TwiiNz.UI;
  const Anim = window.TwiiNz.Animations;
  const Comp = window.TwiiNz.Components;
  const FX   = window.TwiiNz.Effects;

  UI.initLoader();
  UI.initCursor();
  UI.initScrollToTop();
  UI.initCommandMenu();
  UI.initPageTransitions();

  Anim.initReveal();
  Anim.initTypewriter(null, null, { startDelay: 800 });
  Anim.initCounters();

  FX.initCanvas();
  Comp.initCarousel();
  Comp.initFAQ();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });
});
