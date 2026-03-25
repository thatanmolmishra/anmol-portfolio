/**
 * overlay.js — HTML zone overlay fade in/out, stack card interactivity
 */
export class Overlay {
  constructor(totalZones = 8) {
    this.totalZones = totalZones;
    this.overlays = [];
    this.currentZone = -1;
    for (let i = 0; i < totalZones; i++) {
      this.overlays.push(document.getElementById(`overlay-${i}`));
    }
    this.initExpStack();
  }

  initExpStack() {
    // Card stack interactivity for experience section
    const cards = document.querySelectorAll('.exp-card');
    const counter = document.getElementById('exp-counter');
    if (!cards.length) return;

    let current = 0;
    const total = cards.length;

    const render = () => {
      cards.forEach((card, i) => {
        const offset = (i - current + total) % total;
        card.style.setProperty('--i', offset);
        card.classList.toggle('top', offset === 0);
        card.style.zIndex = total - offset;
      });
      if (counter) counter.textContent = `${current + 1} / ${total}`;
    };

    render();

    document.getElementById('exp-next')?.addEventListener('click', () => {
      current = (current + 1) % total;
      render();
    });
    document.getElementById('exp-prev')?.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      render();
    });

    // Click top card to advance
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (parseInt(card.style.getPropertyValue('--i') || card.dataset.i) === 0) {
          current = (current + 1) % total;
          render();
        }
      });
    });
  }

  update(scrollProgress) {
    const zone = Math.min(Math.floor(scrollProgress * this.totalZones), this.totalZones - 1);
    if (zone !== this.currentZone) {
      this.currentZone = zone;
      this.overlays.forEach((overlay, i) => {
        if (!overlay) return;
        if (i === zone) {
          overlay.classList.add('active');
          overlay.style.opacity = '1';
        } else {
          overlay.classList.remove('active');
          overlay.style.opacity = '0';
        }
      });
    }
  }
}
