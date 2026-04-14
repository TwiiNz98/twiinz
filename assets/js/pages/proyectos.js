/**
 * TWIINZ STUDIO — pages/proyectos.js
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const UI   = window.TwiiNz.UI;
  const Anim = window.TwiiNz.Animations;
  const Comp = window.TwiiNz.Components;

  // Sin efectos en portfolio cards

  UI.initLoader();
  UI.initCursor();
  UI.initScrollToTop();
  UI.initCommandMenu();
  UI.initPageTransitions();
  Anim.initReveal();
  Comp.initPortfolioFilter();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });

  // Tech Stack Tooltips Interactivos
  (function initStackTooltips() {
    const stackItems = document.querySelectorAll('.stack-item');
    if (!stackItems.length) return;

    // Cerrar tooltips al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.stack-item')) {
        stackItems.forEach(item => item.blur());
      }
    });

    // Keyboard navigation
    stackItems.forEach(item => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') item.blur();
      });
    });
  })();
});
