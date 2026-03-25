/**
 * Zone 5 — PROJECTS: Minimal wireframe planes
 */
import * as THREE from 'three';

export class Zone5Projects {
  constructor(scene) {
    this.group = new THREE.Group();
    this.planes = [];
    this.createPlanes();
  }

  createPlanes() {
    const configs = [
      { pos: [10, 3, -72], rot: [0.1, -0.15, 0.05] },
      { pos: [13, -1, -74], rot: [-0.05, 0.1, 0.08] },
      { pos: [16, -4, -70], rot: [0.08, -0.08, -0.04] },
    ];
    configs.forEach(({ pos, rot }, i) => {
      const geo = new THREE.PlaneGeometry(4, 2.5);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 - i * 0.03 });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh._baseY = pos[1];
      mesh._phase = i * 1.5;
      this.planes.push(mesh);
      this.group.add(mesh);

      // Cross diagonal
      const diagGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2, -1.25, 0), new THREE.Vector3(2, 1.25, 0),
      ]);
      const diagMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05 });
      const diag = new THREE.Line(diagGeo, diagMat);
      diag.position.set(...pos);
      diag.rotation.set(...rot);
      this.group.add(diag);
    });
  }

  update(t) {
    this.planes.forEach(p => {
      p.position.y = p._baseY + Math.sin(t * 0.5 + p._phase) * 0.3;
    });
  }
}
