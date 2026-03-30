/**
 * Zone 7 — CONTACT: Minimal safe deep field stars (no custom shader)
 */
import * as THREE from 'three';

export class Zone8Contact {
  constructor(scene) {
    this.group = new THREE.Group();
    this.createDeepField();
    this.createGeometry();
  }

  createDeepField() {
    const count = 800;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = -130 + r * Math.cos(phi) * 0.3;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
    });
    this.group.add(new THREE.Points(geo, mat));
  }

  createGeometry() {
    const geo = new THREE.TorusGeometry(10, 0.04, 8, 80);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    this.torus = new THREE.Mesh(geo, mat);
    this.torus.rotation.x = Math.PI / 2;
    this.torus.position.set(0, 0, -133);
    this.group.add(this.torus);
  }

  update(t) {
    if (this.torus) this.torus.rotation.z = t * 0.05;
  }
}
