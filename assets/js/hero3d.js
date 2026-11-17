// Hero atmosphere: slow gold particles around the phone, drawn on the GPU.
// The story's scroll progress spreads them out while the phone opens and gathers them as it closes;
// the pointer tilts the field a little. Loaded on demand by motion.js (desktop pointers only, never with reduced motion).
import * as THREE from '../vendor/three.module.min.js';

const N = 900;

export function mount(hero, host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-3d';
  canvas.setAttribute('aria-hidden', 'true');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
  } catch (e) { return null; }
  // Colours are written as display values; the black canvas is screened onto the page by CSS
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  host.append(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(0, 0, 14);

  // A loose shell around the centre, thicker at the sides, so the phone stays clear
  const pos = new Float32Array(N * 3), seed = new Float32Array(N), size = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, r = 3.2 + Math.pow(Math.random(), .6) * 9;
    pos[i * 3] = Math.cos(a) * r * 1.5;
    pos[i * 3 + 1] = Math.sin(a) * r * .8;
    pos[i * 3 + 2] = (Math.random() * 2 - 1) * 6;
    seed[i] = Math.random() * 100;
    size[i] = .6 + Math.pow(Math.random(), 3) * 3.2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSpread: { value: 0 }, uFade: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float aSeed; attribute float aSize; uniform float uTime; uniform float uSpread; uniform float uFade; uniform float uPx; varying float vA;
      void main(){
        vec3 p = position * (1.0 + uSpread * .35);
        p += vec3(sin(uTime * .21 + aSeed), cos(uTime * .17 + aSeed * 1.3), sin(uTime * .13 + aSeed * .7)) * .35;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPx * (14.0 / -mv.z);
        vA = (.35 + .65 * (.5 + .5 * sin(uTime * 1.3 + aSeed * 7.0))) * uFade * (.55 + uSpread * .45);
      }`,
    fragmentShader: `varying float vA;
      void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, 0., d); a *= a; gl_FragColor = vec4(vec3(.93, .8, .55) * a * vA, 1.); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const field = new THREE.Points(geo, mat);
  scene.add(field);

  const aim = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  let progress = 0, spread = 0;
  const onMove = e => { aim.x = e.clientX / innerWidth - .5; aim.y = e.clientY / innerHeight - .5; };
  addEventListener('pointermove', onMove, { passive: true });

  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(hero);
  resize();

  const t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000;
    cur.x += (aim.x - cur.x) * .04; cur.y += (aim.y - cur.y) * .04;
    // Open in the middle of the story, closed at both ends
    spread += (Math.sin(Math.PI * progress) - spread) * .08;
    field.rotation.y = t * .025 + progress * 1.1 + cur.x * .35;
    field.rotation.x = cur.y * .25;
    mat.uniforms.uTime.value = t;
    mat.uniforms.uSpread.value = spread;
    mat.uniforms.uFade.value = Math.min(1, t / 2);
    renderer.render(scene, camera);
  }

  // Render only while the hero is on screen and the tab is visible
  let onScreen = false, running = false;
  const sync = () => {
    const run = onScreen && !document.hidden;
    if (run !== running) { running = run; renderer.setAnimationLoop(run ? frame : null); }
  };
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
  io.observe(hero);
  document.addEventListener('visibilitychange', sync);

  return {
    setProgress(p) { progress = p; },
    dispose() {
      renderer.setAnimationLoop(null); io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', sync); removeEventListener('pointermove', onMove);
      geo.dispose(); mat.dispose(); renderer.dispose(); canvas.remove();
    }
  };
}
