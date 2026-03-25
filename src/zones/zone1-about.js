/**
 * Zone 1 — ABOUT: Minimal floating wireframe cube
 */
import * as THREE from 'three';

export class Zone1About {
  constructor(scene) {
    this.group = new THREE.Group();
    this.meshes = [];
    this.createWireframes();
    this.createGrid();
  }

  createWireframes() {
    const geos = [
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.OctahedronGeometry(2.5, 0),
    ];
    geos.forEach((geo, i) => {
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 - i * 0.03 });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.position.set(22 + i * 8, 4 - i * 3, 47 - i * 5);
      mesh._phase = i * 1.2;
      mesh._speed = 0.2 + i * 0.08;
      this.meshes.push(mesh);
      this.group.add(mesh);
    });
  }

  createGrid() {
    const g = new THREE.GridHelper(50, 15, 0x222222, 0x161616);
    g.position.set(15, -8, 48);
    g.material.transparent = true;
    g.material.opacity = 0.6;
    this.group.add(g);
  }

  update(t) {
    this.meshes.forEach(m => {
      m.rotation.x = t * m._speed;
      m.rotation.y = t * m._speed * 0.7;
      m.position.y = m.position.y + Math.sin(t * 0.5 + m._phase) * 0.003;
    });
  }
}
