/**
 * TWIINZ STUDIO — animations.js
 * Reveal, typewriter, counters, strip.
 */

'use strict';

window.TwiiNz = window.TwiiNz || {};
window.TwiiNz.Animations = {};

/* ────────────────────────────────────────
   REVEAL (IntersectionObserver)
──────────────────────────────────────── */
window.TwiiNz.Animations.initReveal = function() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    const inHero = el.closest('.hero-section, .hero-mini, .hero-mini-dark');
    if (!inHero) observer.observe(el);
  });
};

/* ────────────────────────────────────────
   TYPEWRITER
──────────────────────────────────────── */
window.TwiiNz.Animations.initTypewriter = function(targetEl, phrases, opts) {
  const el = targetEl || document.getElementById('typewriter-target');
  if (!el) return;

  const defaultPhrases = [
    'que generan ventas',
    'que trabajan 24/7',
    'que convierten visitas',
    'para tu negocio'
  ];
  const p    = phrases || defaultPhrases;
  const delay = (opts && opts.startDelay) || 800;

  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = p[phraseIndex];
    const text = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
    el.textContent = text;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    let d = isDeleting ? 60 : 90;
    if (!isDeleting && charIndex === current.length) { d = 2200; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % p.length; d = 400; }
    setTimeout(type, d);
  }

  setTimeout(type, delay);
};

/* ────────────────────────────────────────
   COUNTERS
──────────────────────────────────────── */
window.TwiiNz.Animations.initCounters = function() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 1800, step = 16;
      const increment = target / (duration / step);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
};

/* ────────────────────────────────────────
   STRIP ANIMATION
──────────────────────────────────────── */
window.TwiiNz.Animations.initStrip = function() {
  // CSS animation handles it — just a placeholder for future JS control
};
