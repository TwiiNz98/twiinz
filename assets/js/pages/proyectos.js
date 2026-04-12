/**
 * TWIINZ STUDIO — pages/proyectos.js
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const UI   = window.TwiiNz.UI;
  const Anim = window.TwiiNz.Animations;
  const Comp = window.TwiiNz.Components;

  UI.initLoader();
  UI.initCursor();
  UI.initScrollToTop();
  UI.initCommandMenu();
  UI.initPageTransitions();
  Anim.initReveal();
  Comp.initPortfolioFilter();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });
});
