/**
 * cursor.js — Magnetic custom cursor
 */
export class Cursor {
  constructor() {
    this.dot = document.getElementById('cursor-dot');
    this.ring = document.getElementById('cursor-ring');
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.init();
  }

  init() {
    window.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
    });

    // Magnetic: ring lags behind
    const animate = () => {
      this.ringX += (this.mouseX - this.ringX) * 0.12;
      this.ringY += (this.mouseY - this.ringY) * 0.12;
      this.ring.style.left = this.ringX + 'px';
      this.ring.style.top = this.ringY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    // Hover state
    const hoverEls = document.querySelectorAll('a, button, .stat-card, .ach-card, .proj-card, .global-card, .edu-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
}
