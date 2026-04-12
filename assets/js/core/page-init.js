/**
 * TWIINZ STUDIO — page-init.js
 * Se incluye en TODAS las páginas. Carga navbar, footer, fab y command menu.
 * Luego cada página incluye su propio script pages/X.js para lógica específica.
 */
'use strict';

(async function pageInit() {
  const LC = window.TwiiNz.Components.loadComponent;

  // Inyectar componentes compartidos en paralelo
  await Promise.all([
    LC('navbar-slot', '/components/navbar.html'),
    LC('footer-slot', '/components/footer.html'),
    LC('fab-slot',    '/components/fab.html'),
    LC('cmd-slot',    '/components/command-menu.html'),
  ]);

  // Después de cargar componentes, inicializar command menu
  window.TwiiNz.UI.initCommandMenu && window.TwiiNz.UI.initCommandMenu();
  window.TwiiNz.UI.setActiveNavLink && window.TwiiNz.UI.setActiveNavLink();
  window.TwiiNz.UI.initPageTransitions && window.TwiiNz.UI.initPageTransitions();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });
})();
