/**
 * cursor.js — Magnetic custom cursor + Halley's Comet Trail
 */
export class Cursor {
  constructor() {
    this.dot = document.getElementById('cursor-dot');
    this.ring = document.getElementById('cursor-ring');
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.trail = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
    this.initTrailCanvas();
    this.animateTrail();
  }

  init() {
    window.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
      // Spawn comet particle
      this.spawnParticle(e.clientX, e.clientY);
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
    const hoverEls = document.querySelectorAll('a, button');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  initTrailCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'comet-trail';
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      zIndex: '9999',
      width: '100vw',
      height: '100vh',
    });
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  spawnParticle(x, y) {
    // Vary size: biggest at head, grows smaller toward tail
    const size = Math.random() * 4 + 1.5;
    const hue = Math.random() > 0.5 ? '240' : '220'; // ice blue / white
    this.trail.push({
      x, y,
      size,
      alpha: 0.9,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      hue,
      life: 1.0,
    });
    // Keep trail short for performance
    if (this.trail.length > 60) this.trail.shift();
  }

  animateTrail() {
    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = this.trail.length - 1; i >= 0; i--) {
        const p = this.trail[i];
        p.alpha -= 0.022;
        p.size *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.022;
        if (p.alpha <= 0 || p.size <= 0.2) { this.trail.splice(i, 1); continue; }
        const g = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, `hsla(${p.hue}, 80%, 95%, ${p.alpha})`);
        g.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = g;
        this.ctx.fill();
      }
      requestAnimationFrame(loop);
    };
    loop();
  }
}
