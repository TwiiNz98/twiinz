/**
 * TWIINZ STUDIO — components.js
 * Componentes reutilizables: FAQ, carousel, FAB, carga de fragmentos HTML.
 */

'use strict';

window.TwiiNz = window.TwiiNz || {};
window.TwiiNz.Components = {};

/* ────────────────────────────────────────
   CARGAR COMPONENTE HTML
──────────────────────────────────────── */
window.TwiiNz.Components.loadComponent = async function(slotId, path) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  try {
    const res  = await fetch(path);
    if (!res.ok) return;
    const html = await res.text();
    slot.innerHTML = html;
    slot.dispatchEvent(new CustomEvent('component:loaded', { bubbles: true }));
    if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });
    // Re-run active link and transitions after nav is loaded
    if (slotId === 'navbar-slot') {
      window.TwiiNz.UI.setActiveNavLink && window.TwiiNz.UI.setActiveNavLink();
      window.TwiiNz.UI.initNavbar && window.TwiiNz.UI.initNavbar();
      window.TwiiNz.UI.initPageTransitions && window.TwiiNz.UI.initPageTransitions();
    }
  } catch (e) {
    console.warn('TwiiNz: no se pudo cargar', path, e);
  }
};

/* ────────────────────────────────────────
   FAQ ACCORDION
──────────────────────────────────────── */
window.TwiiNz.Components.initFAQ = function() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => { i.classList.remove('open'); const a = i.querySelector('.faq-answer'); if (a) a.style.maxHeight = '0'; });
      if (!isOpen) { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });
};

/* ────────────────────────────────────────
   CAROUSEL (CSS Scroll Snap)
 ──────────────────────────────────────── */
window.TwiiNz.Components.initCarousel = function() {
  const carousel   = document.querySelector('.testimonials-carousel');
  const prevBtn    = document.getElementById('prev-btn');
  const nextBtn    = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!carousel) return;

  const cards = Array.from(carousel.querySelectorAll('.testimonial-card'));
  const totalSlides = cards.length;
  let current = 0;

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = (index + totalSlides) % totalSlides;
    cards[current].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    if (dotsContainer) dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Observar scroll para actualizar dots
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = cards.indexOf(entry.target);
        if (idx !== -1 && idx !== current) {
          current = idx;
          if (dotsContainer) dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
        }
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(card => observer.observe(card));

  buildDots();
};

/* ────────────────────────────────────────
    FAB
 ──────────────────────────────────────── */
window.TwiiNz.Components.initFAB = function() {
  window.TwiiNz.UI.initScrollToTop && window.TwiiNz.UI.initScrollToTop();
};

/* ────────────────────────────────────────
   PORTFOLIO FILTER
──────────────────────────────────────── */
window.TwiiNz.Components.initPortfolioFilter = function() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!btns.length) return;

  // Read filter from URL params
  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get('filter') || 'all';

  function applyFilter(filter) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    items.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
    // Update URL without reload
    if (history.pushState) {
      const url = filter === 'all' ? window.location.pathname : `${window.location.pathname}?filter=${filter}`;
      history.pushState(null, '', url);
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  applyFilter(initialFilter);
};
