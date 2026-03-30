/**
 * nav.js — Zone navigation dots + zone label
 */
export class Nav {
  constructor(totalZones = 9) {
    this.totalZones = totalZones;
    this.currentZone = 0;
    this.dots = document.querySelectorAll('#nav-dots li');
    this.zoneNum = document.getElementById('zone-number');
    this.zoneName = document.getElementById('zone-name');
    this.progressFill = document.getElementById('progress-fill');

    const zoneNames = ['HOME', 'ABOUT', 'EXPERIENCE', 'SKILLS', 'ACHIEVEMENTS', 'PROJECTS', 'GLOBAL', 'MEDIA', 'CONTACT'];

    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const zone = parseInt(dot.dataset.zone);
        const target = (zone / (this.totalZones - 1)) * (document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo({ top: target, behavior: 'smooth' });
      });
    });

    this._zoneNames = zoneNames;
  }

  update(scrollProgress) {
    const zone = Math.min(Math.floor(scrollProgress * this.totalZones), this.totalZones - 1);
    if (zone !== this.currentZone) {
      this.currentZone = zone;
      this.dots.forEach((d, i) => d.classList.toggle('active', i === zone));
      this.zoneNum.textContent = String(zone + 1).padStart(2, '0');
      this.zoneName.textContent = this._zoneNames[zone];
    }
    // Progress bar
    this.progressFill.style.height = `${scrollProgress * 100}%`;
  }
}
