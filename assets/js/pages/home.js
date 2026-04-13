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
  Anim.initCounters();

  FX.initCanvas();
  Comp.initCarousel();
  Comp.initFAQ();
  Comp.initFAB();

  if (typeof feather !== 'undefined') feather.replace({ width: '1em', height: '1em', 'stroke-width': 2 });

  // ── CLICK CONTADOR PARA PORTFOLIO ──
  (function initPortfolioClickCounter() {
    const popup = document.getElementById('click-popup');
    if (!popup) return;

    const popupCount = popup.querySelector('.click-popup-count');
    const popupText = popup.querySelector('.click-popup-text');
    
    let clickCount = 0;
    const requiredClicks = 3;
    let hideTimeout;

    function showPopup() {
      popup.classList.remove('hidden');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        popup.classList.add('hidden');
      }, 2500);
    }

    function updatePopup() {
      popupCount.textContent = clickCount;
      
      if (clickCount < requiredClicks) {
        const remaining = requiredClicks - clickCount;
        popupText.textContent = `click — ${remaining} ${remaining === 1 ? 'más' : 'más'} para ver proyectos ⚡`;
      } else {
        popupText.textContent = '¡Redirigiendo a proyectos! 🚀';
        setTimeout(() => {
          window.location.href = '/proyectos.html';
        }, 800);
      }
      showPopup();
    }

    // Agregar listeners a TODAS las cards de portfolio
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('click', () => {
        clickCount++;
        updatePopup();
      });
    });
  })();

  // ── ICONOS PREMIUM CON IMPULSO POR SCROLL ──
  (function initPremiumIconsScroll() {
    const icons = document.querySelectorAll('.icon-3d-wrapper');
    if (!icons.length) return;

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let baseRotation = 0;
    let animationId = null;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        scrollVelocity = 0;
      }, 150);
    });

    function animate() {
      const speed = Math.min(Math.abs(scrollVelocity) * 0.8, 12);
      const direction = scrollVelocity > 0 ? 1 : -1;
      
      baseRotation += 0.3 + speed * direction;
      
      icons.forEach((icon, index) => {
        const offset = index * 120;
        const rotation = baseRotation + offset;
        const tilt = Math.sin(rotation * 0.02) * 8;
        const scale = 1 + speed * 0.008;
        
        icon.style.transform = `perspective(600px) rotateY(${rotation}deg) rotateX(${tilt}deg) scale(${Math.min(scale, 1.1)})`;
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
  })();
});
