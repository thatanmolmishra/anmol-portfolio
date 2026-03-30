/**
 * world.js — Three.js Scene, Camera Path, Renderer
 * Cinematic portfolio 3D engine
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

    // Camera path waypoints (8 zones)
    this.waypoints = [
      new THREE.Vector3(0, 0, 80),       // Zone 0: Home
      new THREE.Vector3(15, 5, 50),      // Zone 1: About
      new THREE.Vector3(-12, -3, 20),    // Zone 2: Experience
      new THREE.Vector3(8, 8, -10),      // Zone 3: Skills
      new THREE.Vector3(-5, -5, -40),    // Zone 4: Achievements
      new THREE.Vector3(12, 3, -70),     // Zone 5: Projects
      new THREE.Vector3(-8, 6, -100),    // Zone 6: Global
      new THREE.Vector3(5, -2, -130),    // Zone 7: Media
      new THREE.Vector3(0, 0, -160),     // Zone 8: Contact
    ];

    // Look-at targets per zone
    this.lookTargets = [
      new THREE.Vector3(0, 0, 60),
      new THREE.Vector3(0, 0, 40),
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(0, 0, -20),
      new THREE.Vector3(0, 0, -50),
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(0, 0, -110),
      new THREE.Vector3(0, 0, -140),
      new THREE.Vector3(0, 0, -170),
    ];

    this.cameraPath = new THREE.CatmullRomCurve3(this.waypoints, false, 'catmullrom', 0.5);
    this.lookPath = new THREE.CatmullRomCurve3(this.lookTargets, false, 'catmullrom', 0.5);

    this.zones = [];
    this.initRenderer();
    this.initScene();
    this.initLights();
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
    this.scene.fog = new THREE.FogExp2(0x000000, 0.008);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    this.camera.position.copy(this.waypoints[0]);
    this.camera.lookAt(this.lookTargets[0]);
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.06);
    this.scene.add(ambient);
  }



  addZone(zoneObject) {
    this.zones.push(zoneObject);
    if (zoneObject.group) this.scene.add(zoneObject.group);
  }

  update(scrollProgress) {
    this.targetProgress = scrollProgress;
    const elapsed = this.clock.getElapsedTime();

    // Smooth camera progress
    this.scrollProgress += (this.targetProgress - this.scrollProgress) * 0.04;
    const t = Math.max(0, Math.min(1, this.scrollProgress));

    // Move camera along path
    const pos = this.cameraPath.getPoint(t);
    this.camera.position.copy(pos);

    // Smooth look-at
    const look = this.lookPath.getPoint(Math.min(t + 0.001, 1));
    this.camera.lookAt(look);

    // Subtle camera drift (very gentle)
    this.camera.position.x += Math.sin(elapsed * 0.18) * 0.15;
    this.camera.position.y += Math.cos(elapsed * 0.13) * 0.1;

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
