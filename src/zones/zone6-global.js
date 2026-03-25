/**
 * Zone 6 — GLOBAL: Minimal rotating wireframe globe
 */
import * as THREE from 'three';

export class Zone6Global {
  constructor(scene) {
    this.group = new THREE.Group();
    this.globe = null;
    this.createGlobe();
    this.createSparseStars();
  }

  createGlobe() {
    const geo = new THREE.SphereGeometry(5, 24, 24);
    const mat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, wireframe: true, transparent: true, opacity: 0.35 });
    this.globe = new THREE.Mesh(geo, mat);
    this.globe.position.set(-8, 5, -103);
    this.group.add(this.globe);

    // Outer ring
    const ringGeo = new THREE.TorusGeometry(5.4, 0.03, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(this.globe.position);
    this.group.add(ring);

    // Location dots
    const dotPositions = [
      [0.3, 0.85, 0.4],   // Japan
      [-0.1, 0.65, 0.75], // India
      [0.15, 0.82, -0.55],// Europe
    ];
    dotPositions.forEach(n => {
      const v = new THREE.Vector3(...n).normalize().multiplyScalar(5.1);
      const dotGeo = new THREE.SphereGeometry(0.1, 6, 6);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(
        this.globe.position.x + v.x,
        this.globe.position.y + v.y,
        this.globe.position.z + v.z
      );
      this.group.add(dot);
    });
  }

  createSparseStars() {
    const count = 120;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = -8 + (Math.random() - 0.5) * 40;
      pos[i*3+1] = 5 + (Math.random() - 0.5) * 30;
      pos[i*3+2] = -103 + (Math.random() - 0.5) * 30;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.group.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.12, color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false })));
  }

  update(t) {
    if (this.globe) this.globe.rotation.y = t * 0.12;
  }
}
