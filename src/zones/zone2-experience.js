/**
 * Zone 2 — EXPERIENCE: Minimal vertical lines (timeline feel)
 */
import * as THREE from 'three';

export class Zone2Experience {
  constructor(scene) {
    this.group = new THREE.Group();
    this.particles = null;
    this.particlePos = null;
    this.createVerticalLines();
    this.createParticles();
  }

  createVerticalLines() {
    // Vertical white lines — visual metaphor for timeline
    for (let i = 0; i < 5; i++) {
      const x = -14 + i * 2.5;
      const geo = new THREE.BufferGeometry();
      geo.setFromPoints([new THREE.Vector3(x, -12, 18), new THREE.Vector3(x, 14, 18)]);
      const opacity = i === 0 ? 0.3 : 0.06 + i * 0.02;
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity });
      this.group.add(new THREE.Line(geo, mat));
    }
    // Horizontal tick marks at intervals
    for (let i = 0; i < 4; i++) {
      const y = 8 - i * 5.5;
      const geo = new THREE.BufferGeometry();
      geo.setFromPoints([new THREE.Vector3(-14, y, 18), new THREE.Vector3(-8, y, 18)]);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
      this.group.add(new THREE.Line(geo, mat));
    }
  }

  createParticles() {
    const count = 200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = -12 + (Math.random() - 0.5) * 10;
      pos[i*3+1] = (Math.random() - 0.5) * 25;
      pos[i*3+2] = 18 + (Math.random() - 0.5) * 8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.particlePos = pos;
    this.particleGeo = geo;
    const mat = new THREE.PointsMaterial({ size: 0.08, color: 0xffffff, transparent: true, opacity: 0.25, depthWrite: false });
    this.group.add(new THREE.Points(geo, mat));
  }

  update(t) {
    const pos = this.particlePos;
    if (!pos) return;
    const count = pos.length / 3;
    for (let i = 0; i < count; i++) {
      pos[i*3+1] -= 0.03;
      if (pos[i*3+1] < -12) pos[i*3+1] = 12;
    }
    this.particleGeo.attributes.position.needsUpdate = true;
  }
}
