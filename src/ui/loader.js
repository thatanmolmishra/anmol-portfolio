/**
 * loader.js — Loading screen management
 */
export class Loader {
  constructor() {
    this.el = document.getElementById('loader');
    this.bar = document.getElementById('loader-bar');
    this.text = document.getElementById('loader-text');
    this.progress = 0;
  }

  setProgress(p, label) {
    this.progress = p;
    if (this.bar) this.bar.style.width = `${p * 100}%`;
    if (this.text && label) this.text.textContent = label;
  }

  hide() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setProgress(1, 'Entering World...');
        setTimeout(() => {
          if (this.el) {
            this.el.classList.add('hidden');
            setTimeout(resolve, 800);
          } else {
            resolve();
          }
        }, 400);
      }, 200);
    });
  }
}
