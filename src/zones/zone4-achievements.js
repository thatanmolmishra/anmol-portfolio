/**
 * Zone 4 — ACHIEVEMENTS: Minimal ascending particles
 */
import * as THREE from 'three';

export class Zone4Achievements {
  constructor(scene) {
    this.group = new THREE.Group();
    this.ascPos = null;
    this.ascGeo = null;
    this.createAscendingParticles();
    this.createGeometric();
  }

  createAscendingParticles() {
    const count = 300;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = -5 + (Math.random() - 0.5) * 20;
      pos[i*3+1] = Math.random() * 30 - 5;
      pos[i*3+2] = -45 + (Math.random() - 0.5) * 16;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.ascPos = pos;
    this.ascGeo = geo;
    const mat = new THREE.PointsMaterial({ size: 0.15, color: 0xffffff, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending });
    this.group.add(new THREE.Points(geo, mat));
  }

  createGeometric() {
    // Minimal icosahedron wireframe
    const geo = new THREE.IcosahedronGeometry(3.5, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    this.icosa = new THREE.LineSegments(edges, mat);
    this.icosa.position.set(-5, 0, -44);
    this.group.add(this.icosa);
  }

  update(t) {
    const pos = this.ascPos;
    if (!pos) return;
    const count = pos.length / 3;
    for (let i = 0; i < count; i++) {
      pos[i*3+1] += 0.04;
      if (pos[i*3+1] > 25) pos[i*3+1] = -5;
    }
    this.ascGeo.attributes.position.needsUpdate = true;
    if (this.icosa) {
      this.icosa.rotation.x = t * 0.1;
      this.icosa.rotation.y = t * 0.15;
    }
  }
}
