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

  // Sin efectos en portfolio cards

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

  // ── ACID RAIN EFFECT ──
  (function initAcidRain() {
    const container = document.getElementById('acid-rain');
    if (!container) return;

    const colors = ['#CCFF00', '#88CC00', '#AAFF00', '#99FF00'];

    function createDrop(immediate = false) {
      const drop = document.createElement('div');
      drop.className = 'acid-drop';
      
      const startX = Math.random() * 100;
      const duration = 4 + Math.random() * 6;
      const delay = immediate ? Math.random() * 0.5 : Math.random() * 5;
      const size = 2 + Math.random() * 3;
      const height = 8 + Math.random() * 16;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      drop.style.left = `${startX}%`;
      drop.style.width = `${size}px`;
      drop.style.height = `${height}px`;
      drop.style.background = color;
      drop.style.animationDuration = `${duration}s`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.filter = `blur(${size * 0.4}px)`;
      
      container.appendChild(drop);
      
      setTimeout(() => {
        drop.remove();
      }, (duration + delay + 1) * 1000);
    }

    function startRain() {
      createDrop();
      const nextDrop = 100 + Math.random() * 250;
      setTimeout(startRain, nextDrop);
    }

    for (let i = 0; i < 12; i++) {
      setTimeout(() => createDrop(true), i * 80);
    }
    startRain();
  })();

  // ── CARD SPIN ON CLICK ──
  (function initCardSpin() {
    document.querySelectorAll('.service-card[data-plan]').forEach(card => {
      card.addEventListener('click', function() {
        if (this.classList.contains('spinning')) return;
        this.classList.add('spinning');
        setTimeout(() => {
          this.classList.remove('spinning');
        }, 500);
      });
    });
  })();

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
