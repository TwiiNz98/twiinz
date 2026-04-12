/**
 * TWIINZ STUDIO — effects.js
 * Canvas dot-grid y cursor custom. Solo se carga en index.html.
 */

'use strict';

window.TwiiNz = window.TwiiNz || {};
window.TwiiNz.Effects = {};

window.TwiiNz.Effects.initCanvas = function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, dots = [];
  const DOT_SPACING = 36, DOT_RADIUS = 1;
  let mouse = { x: -9999, y: -9999 };
  const INFLUENCE_RADIUS = 100;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; buildDots(); }
  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / DOT_SPACING) + 1, rows = Math.ceil(H / DOT_SPACING) + 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING });
  }

  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY + window.scrollY; });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const scrollY = window.scrollY;
    dots.forEach(dot => {
      const dy = dot.y - scrollY, dx = dot.x - mouse.x, dy2 = dy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy2 * dy2);
      const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
      const r = DOT_RADIUS + influence * 2, alpha = 0.25 + influence * 0.6;
      ctx.beginPath(); ctx.arc(dot.x, dy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(204, 255, 0, ${alpha})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize(); draw();
};
