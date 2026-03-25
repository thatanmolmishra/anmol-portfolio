/**
 * Zone 3 — SKILLS: Minimal floating nodes
 */
import * as THREE from 'three';

export class Zone3Skills {
  constructor(scene) {
    this.group = new THREE.Group();
    this.nodes = [];
    this.createNodes();
  }

  createNodes() {
    const positions = [
      [5, 4, -15], [10, -2, -12], [14, 5, -18],
      [3, -5, -8], [8, 8, -20], [12, -6, -14],
      [6, 2, -22], [15, 1, -10], [9, -9, -16],
      [11, 6, -11],
    ];
    positions.forEach((pos, i) => {
      const size = 0.08 + Math.random() * 0.1;
      const geo = new THREE.SphereGeometry(size, 8, 8);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 + Math.random() * 0.4 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh._base = pos.slice();
      mesh._phase = i * 0.7;
      this.nodes.push(mesh);
      this.group.add(mesh);

      // Connect to nearby nodes with thin lines
      if (i > 0 && Math.random() > 0.4) {
        const prev = this.nodes[i - 1];
        const geo2 = new THREE.BufferGeometry().setFromPoints([mesh.position.clone(), prev.position.clone()]);
        const mat2 = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
        this.group.add(new THREE.Line(geo2, mat2));
      }
    });
  }

  update(t) {
    this.nodes.forEach(n => {
      n.position.y = n._base[1] + Math.sin(t * 0.5 + n._phase) * 0.4;
      n.position.x = n._base[0] + Math.sin(t * 0.3 + n._phase + 1) * 0.2;
    });
  }
}
