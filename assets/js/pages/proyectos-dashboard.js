/* ═══════════════════════════════════════════════════════
   TWIINZ STUDIO — proyectos-dashboard.js (V80 Premium)
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  initMetricsAnimation();
  initFilters();
  initProjectCards();
  initStackHover();
}

function initMetricsAnimation() {
  const metrics = document.querySelectorAll('.metric-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
      }
    });
  }, { threshold: 0.5 });

  metrics.forEach(metric => observer.observe(metric));
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card, index) => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = `card-reveal 0.5s ease-out ${index * 0.1}s forwards`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function initProjectCards() {
  const cards = document.querySelectorAll('.portfolio-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const overlay = card.querySelector('.portfolio-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const overlay = card.querySelector('.portfolio-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
      }
    });
  });
}

function initStackHover() {
  const stackItems = document.querySelectorAll('.stack-item');
  
  stackItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const info = item.querySelector('.stack-info');
      if (info) {
        info.style.display = 'block';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const info = item.querySelector('.stack-info');
      if (info) {
        info.style.display = 'none';
      }
    });
  });
}

// Smooth scroll para los filtros
document.querySelector('.portfolio-filter').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    const targetSection = document.querySelector('.portfolio-grid');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});