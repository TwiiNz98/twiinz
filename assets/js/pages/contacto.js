/**
 * TWIINZ STUDIO — pages/contacto.js
 * Formulario con pre-fill por URL params y redirección a WhatsApp.
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const UI     = window.TwiiNz.UI;
  const Anim   = window.TwiiNz.Animations;
  const Comp   = window.TwiiNz.Components;
  const CONFIG = window.TwiiNz.CONFIG;

  UI.initLoader();
  UI.initCursor();
  UI.initScrollToTop();
  UI.initCommandMenu();
  UI.initPageTransitions();
  Anim.initReveal();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });

  // ── PRE-FILL desde URL params ──
  const params  = new URLSearchParams(window.location.search);
  const planParam = params.get('plan');
  const select  = document.getElementById('servicio');
  if (select && planParam) {
    const map = { starter: 'landing', pro: 'ecommerce', elite: 'sistema' };
    const val = map[planParam] || planParam;
    const opt = select.querySelector(`option[value="${val}"]`);
    if (opt) select.value = val;
  }

  // ── FORMULARIO ──
  const form = document.getElementById('contact-form');
  if (!form || !CONFIG) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre   = (form.nombre?.value || '').trim();
    const negocio  = (form.negocio?.value || '').trim();
    const servicio = form.servicio?.value;
    const mensaje  = (form.mensaje?.value || '').trim();

    if (!nombre) { showError(form.nombre, 'Por favor ingresa tu nombre.'); return; }

    const labels = {
      landing:      'Landing de Conversión ($149+)',
      ecommerce:    'E-commerce SPA ($399+)',
      sistema:      'Sistema Digital Completo ($899+)',
      personalizado:'Proyecto personalizado'
    };

    const lines = [
      '👋 Hola! Me contacto desde tu portfolio.',
      '',
      `📝 *Nombre:* ${nombre}`,
      negocio  ? `🏪 *Negocio:* ${negocio}` : null,
      servicio ? `⚡ *Servicio:* ${labels[servicio] || servicio}` : null,
      mensaje  ? `💬 *Mensaje:*\n${mensaje}` : null,
    ].filter(Boolean).join('\n');

    window.open(`${CONFIG.WA_BASE_URL}?text=${encodeURIComponent(lines)}`, '_blank');
  });

  function showError(input, msg) {
    if (!input) return;
    input.style.borderColor = '#ff4444';
    input.focus();
    if (!input.parentElement.querySelector('.field-error')) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'display:block;font-size:0.7rem;color:#ff4444;margin-top:4px;font-family:var(--font-mono)';
      err.textContent = msg;
      input.parentElement.appendChild(err);
      setTimeout(() => err.remove(), 3000);
    }
    setTimeout(() => { input.style.borderColor = ''; }, 3000);
  }
});
