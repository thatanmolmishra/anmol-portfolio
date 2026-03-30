/**
 * main.js — Entry point
 * Orchestrates: Three.js world, zones, scroll sync, UI
 */
import './style.css';
import Lenis from 'lenis';

import { World } from './world.js';
import { Zone0Home } from './zones/zone0-home.js';
import { Zone1About } from './zones/zone1-about.js';
import { Zone2Experience } from './zones/zone2-experience.js';
import { Zone3Skills } from './zones/zone3-skills.js';
import { Zone4Achievements } from './zones/zone4-achievements.js';
import { Zone5Projects } from './zones/zone5-projects.js';
import { Zone6Global } from './zones/zone6-global.js';
import { Zone7Media } from './zones/zone7-media.js';
import { Zone8Contact } from './zones/zone8-contact.js';
import { Cursor } from './ui/cursor.js';
import { Nav } from './ui/nav.js';
import { Overlay } from './ui/overlay.js';
import { Loader } from './ui/loader.js';
import { initBlockModal } from './ui/block-modal.js';

// ===== LOADER =====
const loader = new Loader();
loader.setProgress(0.1, 'Loading assets...');

// ===== THREE.JS WORLD =====
const world = new World();
loader.setProgress(0.3, 'Building 3D world...');

// ===== ZONES =====
const zones = [
  new Zone0Home(world.scene),
  new Zone1About(world.scene),
  new Zone2Experience(world.scene),
  new Zone3Skills(world.scene),
  new Zone4Achievements(world.scene),
  new Zone5Projects(world.scene),
  new Zone6Global(world.scene),
  new Zone7Media(world.scene),
  new Zone8Contact(world.scene),
];
zones.forEach(z => world.addZone(z));
loader.setProgress(0.7, 'Lighting up the universe...');

// ===== CURSOR =====
const cursor = new Cursor();

// ===== NAV =====
const nav = new Nav(9);

// ===== OVERLAYS =====
const overlay = new Overlay(9);

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1.2,
  touchMultiplier: 1.5,
  infinite: false,
});

// ===== SCROLL SYNC =====
let scrollProgress = 0;

lenis.on('scroll', ({ progress }) => {
  scrollProgress = progress;
  nav.update(progress);
  overlay.update(progress);
  const fill = document.getElementById('progress-fill');
  if (fill) fill.style.height = `${progress * 100}%`;
});

// ===== RESIZE =====
window.addEventListener('resize', () => world.onResize());

// ===== ANIMATION LOOP =====
let rafId;
const tick = (time) => {
  lenis.raf(time);
  world.update(scrollProgress);
  rafId = requestAnimationFrame(tick);
};

// ===== SCROLL MEMORY — save position as user scrolls =====
lenis.on('scroll', ({ scroll }) => {
  sessionStorage.setItem('portfolioScroll', scroll);
});

// Save scroll position on any subpage navigation link click
document.querySelectorAll('a[href^="/pages/"]').forEach(link => {
  link.addEventListener('click', () => {
    sessionStorage.setItem('portfolioScroll', lenis.scroll);
  });
});

// ===== INIT =====
async function init() {
  loader.setProgress(0.9, 'Almost ready...');
  await loader.hide();

  // Show first overlay
  overlay.update(0);
  nav.update(0);
  initBlockModal();

  // ===== RESTORE SCROLL after subpage visit =====
  const restore = sessionStorage.getItem('restoreScroll');
  if (restore !== null) {
    sessionStorage.removeItem('restoreScroll');
    // Small delay so Lenis is ready
    setTimeout(() => {
      lenis.scrollTo(parseFloat(restore), { immediate: true });
    }, 100);
  }

  requestAnimationFrame(tick);
}

init();

// Clean up on HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
  });
}
