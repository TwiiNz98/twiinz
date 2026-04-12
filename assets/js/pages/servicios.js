/**
 * TWIINZ STUDIO — pages/servicios.js
 * Toggle USD/CLP, pre-fill por URL params.
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const UI   = window.TwiiNz.UI;
  const Anim = window.TwiiNz.Animations;
  const Comp = window.TwiiNz.Components;
  const CONFIG = window.TwiiNz.CONFIG;

  UI.initLoader();
  UI.initCursor();
  UI.initScrollToTop();
  UI.initCommandMenu();
  UI.initPageTransitions();
  Anim.initReveal();
  Comp.initFAQ();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });

  // ── TOGGLE USD / CLP ──
  const toggle     = document.getElementById('currency-toggle');
  const labelUSD   = document.getElementById('label-usd');
  const labelCLP   = document.getElementById('label-clp');
  const amounts    = document.querySelectorAll('.price-amount');
  const currencies = document.querySelectorAll('.price-currency');
  if (!toggle || !CONFIG) return;

  const PRICES = CONFIG.PRECIOS;
  const RATE   = CONFIG.CONVERSION_USD_CLP;
  const plans  = ['starter', 'pro', 'elite'];
  let isCLP = false;

  function formatCLP(n) { return '$' + Math.round(n).toLocaleString('es-CL'); }

  function updatePrices() {
    amounts.forEach((el, i) => {
      const plan = plans[i];
      if (!PRICES[plan]) return;
      if (isCLP) {
        el.textContent = formatCLP(PRICES[plan].usd * RATE);
      } else {
        el.textContent = '$' + PRICES[plan].usd;
      }
    });
    currencies.forEach(el => { el.textContent = isCLP ? 'CLP' : 'USD'; });
    if (labelUSD) labelUSD.classList.toggle('active', !isCLP);
    if (labelCLP) labelCLP.classList.toggle('active', isCLP);
    toggle.classList.toggle('active', isCLP);
  }

  toggle.addEventListener('click', () => { isCLP = !isCLP; updatePrices(); });
  updatePrices();
});
