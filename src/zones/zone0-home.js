/**
 * Zone 0 — HOME: Minimal sparse star field (safe, no custom shaders)
 */
import * as THREE from 'three';

export class Zone0Home {
  constructor(scene) {
    this.group = new THREE.Group();
    this.createStars();
    this.createFloatingLines();
  }

  createStars() {
    const count = 1200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    // Use safe PointsMaterial (no custom shader)
    const mat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    });
    this.group.add(new THREE.Points(geo, mat));
  }

  createFloatingLines() {
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const r = 15 + Math.random() * 20;
      const geo = new THREE.BufferGeometry();
      const p = [
        new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.5, 70 + Math.random() * 20),
        new THREE.Vector3(Math.cos(angle + 0.5) * (r + 6), Math.sin(angle + 0.5) * (r + 6) * 0.5, 60 + Math.random() * 10),
      ];
      geo.setFromPoints(p);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 + Math.random() * 0.06 });
      this.group.add(new THREE.Line(geo, mat));
    }
  }

  update(t) {
    this.group.rotation.y = t * 0.015;
  }
}
