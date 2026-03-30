/**
 * world.js — Three.js Scene, Camera Path, Renderer
 * Cinematic portfolio 3D engine — DEEP SPACE TRAVEL edition
 */

import * as THREE from 'three';

export class World {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.clock = new THREE.Clock();
    this.scrollProgress = 0;
    this.targetProgress = 0;
    this.stars = null;
    this.warpLines = [];

    // Camera path waypoints — dramatic X/Y curves for real "flying through space" feel
    this.waypoints = [
      new THREE.Vector3( 0,    0,   80),   // Zone 0: Home       — front and centre
      new THREE.Vector3( 30,  10,   45),   // Zone 1: About      — bank hard right
      new THREE.Vector3(-25, -12,   10),   // Zone 2: Experience — swoop left and down
      new THREE.Vector3( 20,  20,  -30),   // Zone 3: Skills     — climb and right
      new THREE.Vector3(-30, -8,   -70),   // Zone 4: Achievements — dive left
      new THREE.Vector3( 18,  15,  -110),  // Zone 5: Projects   — bank up-right
      new THREE.Vector3(-20, -15,  -150),  // Zone 6: Global     — roll deep left
      new THREE.Vector3( 25,  5,   -190),  // Zone 7: Media      — sweep right
      new THREE.Vector3( 0,   0,   -230),  // Zone 8: Contact    — centre approach
    ];

    // Look-at targets slightly ahead of each position
    this.lookTargets = [
      new THREE.Vector3( 0,    0,   50),
      new THREE.Vector3( 10,   2,   20),
      new THREE.Vector3(-10,  -4,  -10),
      new THREE.Vector3( 8,    8,  -50),
      new THREE.Vector3(-10,  -4,  -90),
      new THREE.Vector3( 6,    6,  -130),
      new THREE.Vector3(-8,   -6,  -170),
      new THREE.Vector3( 10,   2,  -210),
      new THREE.Vector3( 0,    0,  -250),
    ];

    this.cameraPath = new THREE.CatmullRomCurve3(this.waypoints, false, 'catmullrom', 0.5);
    this.lookPath   = new THREE.CatmullRomCurve3(this.lookTargets, false, 'catmullrom', 0.5);

    this.zones = [];
    this.initRenderer();
    this.initScene();
    this.initLights();
    this.initStarField();
    this.initNebula();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.004);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 600);
    this.camera.position.copy(this.waypoints[0]);
    this.camera.lookAt(this.lookTargets[0]);
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.06);
    this.scene.add(ambient);
  }

  initStarField() {
    // 2-layer star field: close fast stars + distant slow stars
    const addLayer = (count, range, size, opacity) => {
      const geo = new THREE.BufferGeometry();
      const positions = [];
      for (let i = 0; i < count; i++) {
        positions.push(
          (Math.random() - 0.5) * range,
          (Math.random() - 0.5) * range * 0.5,
          (Math.random() - 0.5) * range - 80
        );
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity,
      });
      const stars = new THREE.Points(geo, mat);
      this.scene.add(stars);
      return stars;
    };

    this.starsNear = addLayer(800, 300, 0.5, 0.9);
    this.starsFar  = addLayer(4000, 600, 0.18, 0.55);
  }

  initNebula() {
    // Sparse coloured dust clusters to give depth
    const colours = [0x111122, 0x120a1a, 0x0a1218];
    for (let c = 0; c < 3; c++) {
      const geo = new THREE.SphereGeometry(40, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: colours[c],
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 60,
        -80 - c * 50
      );
      this.scene.add(mesh);
    }
  }

  addZone(zoneObject) {
    this.zones.push(zoneObject);
    if (zoneObject.group) this.scene.add(zoneObject.group);
  }

  update(scrollProgress) {
    this.targetProgress = scrollProgress;
    const elapsed = this.clock.getElapsedTime();

    // Smooth camera progress - faster response
    this.scrollProgress += (this.targetProgress - this.scrollProgress) * 0.06;
    const t = Math.max(0, Math.min(1, this.scrollProgress));

    // Move camera along dramatic curved path
    const pos  = this.cameraPath.getPoint(t);
    this.camera.position.copy(pos);

    // Subtle organic drift — much smaller than before so path shape dominates
    this.camera.position.x += Math.sin(elapsed * 0.2) * 0.12;
    this.camera.position.y += Math.cos(elapsed * 0.15) * 0.09;

    // Smooth look-at slightly ahead on the curve
    const look = this.lookPath.getPoint(Math.min(t + 0.003, 1));
    this.camera.lookAt(look);

    // --- Warp star parallax ---
    // Near stars scroll FASTER (foreground) to create z-depth motion parallax
    if (this.starsNear) {
      this.starsNear.position.z = -t * 50;
      this.starsNear.rotation.z = elapsed * 0.003;
    }
    if (this.starsFar) {
      this.starsFar.position.z  = -t * 20;
      this.starsFar.rotation.z  = elapsed * 0.001;
    }

    // Update zones
    this.zones.forEach(zone => {
      if (zone.update) zone.update(elapsed, t);
    });

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
