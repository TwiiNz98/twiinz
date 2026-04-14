/**
 * TWIINZ STUDIO — pages/servicios.js
 * Pre-fill por URL params, Selector de Planes.
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
  Comp.initFAQ();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });

  // ── CARD SPIN ON CLICK ──
  document.querySelectorAll('.service-card[data-plan]').forEach(card => {
    card.addEventListener('click', function() {
      if (this.classList.contains('spinning')) return;
      this.classList.add('spinning');
      setTimeout(() => {
        this.classList.remove('spinning');
      }, 500);
    });
  });

  // ── SELECTOR DE PLANES INTERACTIVO ──
  const planCards = document.querySelectorAll('.service-card[data-plan]');
  
  if (planCards.length > 0) {
    // Seleccionar el plan desde URL si existe
    const urlParams = new URLSearchParams(window.location.search);
    const planFromUrl = urlParams.get('plan');
    
    if (planFromUrl) {
      const targetCard = document.querySelector(`.service-card[data-plan="${planFromUrl}"]`);
      if (targetCard) {
        targetCard.classList.add('selected');
      }
    }

    // Evento click en cada card
    planCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // No activar si el click fue en un botón/link dentro de la card
        if (e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        
        const isSelected = card.classList.contains('selected');
        
        // Cerrar todos
        planCards.forEach(c => c.classList.remove('selected'));
        
        // Si no estaba seleccionado, abrirlo
        if (!isSelected) {
          card.classList.add('selected');
        }
      });
    });

    // Click fuera para cerrar todos
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.service-card[data-plan]')) {
        planCards.forEach(c => c.classList.remove('selected'));
      }
    });

    // Tecla ESC para cerrar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        planCards.forEach(c => c.classList.remove('selected'));
      }
    });
  }
});