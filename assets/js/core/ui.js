/**
 * TWIINZ STUDIO — ui.js
 * Lógica de UI que aplica en todas las páginas.
 * Responsabilidades: loader, navbar, page transitions, command menu.
 */

'use strict';

window.TwiiNz = window.TwiiNz || {};
window.TwiiNz.UI = {};

/* ────────────────────────────────────────
   LOADER
──────────────────────────────────────── */
window.TwiiNz.UI.initLoader = function() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  document.body.style.overflow = 'hidden';

  const hide = () => {
    loader.classList.add('loaded');
    document.body.style.overflow = '';
    // Reveal hero elements
    document.querySelectorAll('.hero-section .reveal, .hero-mini .reveal, .hero-mini-dark .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 100);
    });
  };

  // Hide when window loads OR after 600ms max, whichever comes first
  let hidden = false;
  const safeHide = () => { if (!hidden) { hidden = true; hide(); } };
  window.addEventListener('load', safeHide);
  setTimeout(safeHide, 600);
};

/* ────────────────────────────────────────
   CURSOR CUSTOM
──────────────────────────────────────── */
window.TwiiNz.UI.initCursor = function() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '0.6'; });
};

/* ────────────────────────────────────────
   NAVBAR
──────────────────────────────────────── */
window.TwiiNz.UI.initNavbar = function() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!navbar) return;

  // Dark hero mode — set via data attribute on nav
  const darkHero = navbar.dataset.darkHero === 'true';
  if (darkHero) navbar.classList.add('navbar--dark-hero');

  // Scroll → scrolled state
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      }
    });
  }
};

/* ────────────────────────────────────────
   ACTIVE NAV LINK (MPA — por pathname)
──────────────────────────────────────── */
window.TwiiNz.UI.setActiveNavLink = function() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const links = document.querySelectorAll('.nav-link, .mobile-link');

  links.forEach(link => {
    const href = (link.getAttribute('href') || '').split('?')[0];
    const normalized = href.replace(/\/$/, '') || '/';
    const isActive = normalized === pathname ||
      (pathname === '/' && (normalized === '/index.html' || normalized === '')) ||
      (pathname.endsWith('/index.html') && normalized === '/');
    link.classList.toggle('nav-link--active', isActive);
  });
};

/* ────────────────────────────────────────
   PAGE TRANSITIONS
──────────────────────────────────────── */
window.TwiiNz.UI.initPageTransitions = function() {
  // Remove entering class to fade in
  document.body.classList.remove('page-entering');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only internal pages
    if (!href || href.startsWith('http') || href.startsWith('#') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        link.target === '_blank' || link.dataset.noTransition !== undefined) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-exiting');
      setTimeout(() => { window.location.href = href; }, 200);
    });
  });
};

/* ────────────────────────────────────────
   SCROLL TO TOP
──────────────────────────────────────── */
window.TwiiNz.UI.initScrollToTop = function() {
  const btn = document.getElementById('fab-scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ────────────────────────────────────────
   COMMAND MENU
──────────────────────────────────────── */
window.TwiiNz.UI.initCommandMenu = function() {
  const overlay = document.getElementById('command-menu-overlay');
  const input   = document.getElementById('command-input');
  const results = document.getElementById('command-results');
  if (!overlay || !input || !results) return;

  const CONFIG = window.TwiiNz.CONFIG;
  const WA_URL = CONFIG ? CONFIG.WA_BASE_URL : 'https://wa.me/56950147783';
  const WA_MSG = CONFIG ? CONFIG.WA_MESSAGES.general : '';
  const IG_URL = CONFIG ? CONFIG.INSTAGRAM_URL : 'https://instagram.com/twiinz_x';
  const EMAIL  = CONFIG ? CONFIG.EMAIL : '';

  const commands = [
    { label: 'Inicio', desc: 'Volver a la página principal', icon: 'home',      action: () => goto('/') },
    { label: 'Servicios', desc: 'Ver planes y precios', icon: 'zap',            action: () => goto('/servicios.html') },
    { label: 'Proyectos', desc: 'Ver portafolio de trabajos', icon: 'briefcase',action: () => goto('/proyectos.html') },
    { label: 'Proceso', desc: 'Cómo trabajo contigo', icon: 'git-branch',      action: () => goto('/proceso.html') },
    { label: 'FAQ', desc: 'Preguntas frecuentes', icon: 'help-circle',         action: () => goto('/faq.html') },
    { label: 'Contacto', desc: 'Hablemos hoy', icon: 'mail',                   action: () => goto('/contacto.html') },
    { label: 'WhatsApp', desc: 'Abrir WhatsApp directo', icon: 'message-circle',action: () => window.open(`${WA_URL}?text=${encodeURIComponent(WA_MSG)}`, '_blank') },
    { label: 'Copiar email', desc: EMAIL, icon: 'copy',                         action: () => { navigator.clipboard.writeText(EMAIL); close(); } },
    { label: 'Instagram', desc: '@twiinz_x', icon: 'instagram',                action: () => window.open(IG_URL, '_blank') },
  ];

  function goto(url) { close(); window.location.href = url; }
  let focusedIndex = -1;

  function open() {
    overlay.classList.add('open');
    input.focus();
    render('');
  }
  function close() {
    overlay.classList.remove('open');
    input.value = '';
    focusedIndex = -1;
  }

  function render(query) {
    const q = query.toLowerCase().trim();
    const filtered = q ? commands.filter(c =>
      c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    ) : commands;

    results.innerHTML = filtered.map((c, i) => `
      <div class="command-item${i === focusedIndex ? ' focused' : ''}" data-index="${i}">
        <div class="command-item-icon"><i data-feather="${c.icon}"></i></div>
        <div>
          <div class="command-item-label">${c.label}</div>
          <div class="command-item-desc">${c.desc}</div>
        </div>
      </div>
    `).join('');

    if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });

    results.querySelectorAll('.command-item').forEach((el, i) => {
      el.addEventListener('click', () => { filtered[i].action(); });
      el.addEventListener('mouseenter', () => {
        focusedIndex = i;
        results.querySelectorAll('.command-item').forEach((e, j) => e.classList.toggle('focused', j === i));
      });
    });
  }

  input.addEventListener('input', (e) => { focusedIndex = -1; render(e.target.value); });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); }
    if (!overlay.classList.contains('open')) return;
    const items = results.querySelectorAll('.command-item');
    if (e.key === 'Escape') { close(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); focusedIndex = Math.min(focusedIndex + 1, items.length - 1); items.forEach((el, i) => el.classList.toggle('focused', i === focusedIndex)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); focusedIndex = Math.max(focusedIndex - 1, 0); items.forEach((el, i) => el.classList.toggle('focused', i === focusedIndex)); }
    if (e.key === 'Enter' && focusedIndex >= 0) {
      const q = input.value.toLowerCase().trim();
      const filtered = q ? commands.filter(c => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)) : commands;
      filtered[focusedIndex]?.action();
    }
  });

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  // Navbar search button
  document.querySelectorAll('[data-command-menu]').forEach(btn => {
    btn.addEventListener('click', open);
  });
};
