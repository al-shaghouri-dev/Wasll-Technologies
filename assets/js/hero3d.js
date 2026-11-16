// Hero background: a slow constellation of gold nodes that link up when they drift close,
// with the visitor's pointer acting as one more node. "WASL" means connection.
// Loaded on demand by motion.js (desktop pointers only, never with reduced motion).
import * as THREE from '../vendor/three.module.min.js';

const N = 110, LINK = 2.6, CURSOR_LINK = 3.6, MAX_SEG = 900;
const GOLD = [0.84, 0.69, 0.45], GOLD_HI = [0.93, 0.84, 0.64];

export function mount(hero, host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-3d';
  canvas.setAttribute('aria-hidden', 'true');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
  } catch (e) { return null; }
  // Colours below are written as display values; skip the linear→sRGB conversion so lines and points match.
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  const ref = host.querySelector('.ascent');
  host.insertBefore(canvas, ref || null);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 0, 12);

  // Nodes: denser on the side where the hero stage sits (inline end), mirrored for RTL.
  let side = document.documentElement.dir === 'rtl' ? -1 : 1;
  const base = new Float32Array(N * 3), phase = new Float32Array(N * 3), pos = new Float32Array(N * 3);
  const size = new Float32Array(N), glow = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    base[i * 3] = (Math.pow(Math.random(), 0.7) * 19 - 7.5);
    base[i * 3 + 1] = (Math.random() * 2 - 1) * 5.6;
    base[i * 3 + 2] = (Math.random() * 2 - 1) * 3.2 - 0.5;
    for (let k = 0; k < 3; k++) phase[i * 3 + k] = Math.random() * Math.PI * 2;
    size[i] = 1.2 + Math.random() * 2.2;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  pGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  pGeo.setAttribute('aGlow', new THREE.BufferAttribute(glow, 1).setUsage(THREE.DynamicDrawUsage));
  const pMat = new THREE.ShaderMaterial({
    uniforms: { uPx: { value: renderer.getPixelRatio() }, uFade: { value: 0 }, uColor: { value: new THREE.Color(...GOLD_HI) } },
    vertexShader: `attribute float aSize; attribute float aGlow; uniform float uPx; uniform float uFade; varying float vA;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * (1.0 + aGlow * 1.2) * uPx * (12.0 / -mv.z); vA = (0.32 + aGlow * 0.68) * uFade; }`,
    fragmentShader: `uniform vec3 uColor; varying float vA;
      void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); a *= a; gl_FragColor = vec4(uColor * a * vA, 1.0); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  scene.add(new THREE.Points(pGeo, pMat));

  const lPos = new Float32Array(MAX_SEG * 6), lCol = new Float32Array(MAX_SEG * 6);
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3).setUsage(THREE.DynamicDrawUsage));
  lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3).setUsage(THREE.DynamicDrawUsage));
  const lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const lines = new THREE.LineSegments(lGeo, lMat);
  lines.frustumCulled = false;
  scene.add(lines);

  // Pointer → a point on the z = 0 plane, eased so the network follows rather than snaps.
  const ndc = new THREE.Vector2(0, 0), aim = new THREE.Vector2(0, 0), cur = new THREE.Vector3(), ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let inside = 0, insideT = 0, scrollP = 0;
  const onMove = e => {
    const r = hero.getBoundingClientRect();
    aim.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    insideT = 1;
  };
  const onLeave = () => { insideT = 0; aim.set(0, 0); };
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);

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
    const fade = Math.min(1, t / 1.8), ease = 1 - Math.pow(1 - fade, 3);
    ndc.lerp(aim, 0.06);
    inside += (insideT - inside) * 0.05;

    camera.position.x = ndc.x * 0.9;
    camera.position.y = ndc.y * 0.6 - scrollP * 1.5;
    camera.position.z = 12 + scrollP * 4;
    camera.lookAt(0, -scrollP * 1.5, 0);
    camera.updateMatrixWorld();
    ray.setFromCamera(ndc, camera);
    ray.ray.intersectPlane(plane, cur);

    for (let i = 0; i < N; i++) {
      const j = i * 3;
      let x = side * base[j] + Math.sin(t * 0.21 + phase[j]) * 0.45;
      let y = base[j + 1] + Math.sin(t * 0.17 + phase[j + 1]) * 0.4;
      const z = base[j + 2] + Math.sin(t * 0.13 + phase[j + 2]) * 0.35;
      const dx = cur.x - x, dy = cur.y - y, d = Math.hypot(dx, dy);
      const pull = inside * Math.max(0, 1 - d / CURSOR_LINK);
      x += dx * pull * 0.18; y += dy * pull * 0.18;
      pos[j] = x; pos[j + 1] = y; pos[j + 2] = z;
      glow[i] = pull;
    }

    let s = 0;
    const seg = (a, b, k, c) => {
      const o = s * 6;
      lPos[o] = a[0]; lPos[o + 1] = a[1]; lPos[o + 2] = a[2];
      lPos[o + 3] = b[0]; lPos[o + 4] = b[1]; lPos[o + 5] = b[2];
      for (let q = 0; q < 2; q++) { lCol[o + q * 3] = c[0] * k; lCol[o + q * 3 + 1] = c[1] * k; lCol[o + q * 3 + 2] = c[2] * k; }
      s++;
    };
    const A = [0, 0, 0], B = [0, 0, 0];
    for (let i = 0; i < N && s < MAX_SEG; i++) {
      const a = i * 3;
      for (let k = i + 1; k < N && s < MAX_SEG; k++) {
        const b = k * 3, dx = pos[a] - pos[b], dy = pos[a + 1] - pos[b + 1], dz = pos[a + 2] - pos[b + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > LINK * LINK) continue;
        const f = 1 - Math.sqrt(d2) / LINK;
        A[0] = pos[a]; A[1] = pos[a + 1]; A[2] = pos[a + 2]; B[0] = pos[b]; B[1] = pos[b + 1]; B[2] = pos[b + 2];
        seg(A, B, f * f * 0.42 * ease * (1 + (glow[i] + glow[k]) * 1.5), GOLD);
      }
    }
    if (inside > 0.02) {
      A[0] = cur.x; A[1] = cur.y; A[2] = 0;
      for (let i = 0; i < N && s < MAX_SEG; i++) {
        if (glow[i] <= 0) continue;
        B[0] = pos[i * 3]; B[1] = pos[i * 3 + 1]; B[2] = pos[i * 3 + 2];
        seg(A, B, glow[i] * glow[i] * 0.75 * inside * ease, GOLD_HI);
      }
    }
    lGeo.setDrawRange(0, s * 2);
    lGeo.attributes.position.needsUpdate = lGeo.attributes.color.needsUpdate = true;
    pGeo.attributes.position.needsUpdate = pGeo.attributes.aGlow.needsUpdate = true;
    pMat.uniforms.uFade.value = ease;
    renderer.render(scene, camera);
  }

  // Render only while the hero is on screen and the tab is visible.
  let onScreen = false, running = false;
  const sync = () => {
    const run = onScreen && !document.hidden;
    if (run !== running) { running = run; renderer.setAnimationLoop(run ? frame : null); }
  };
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
  io.observe(hero);
  document.addEventListener('visibilitychange', sync);

  return {
    setDir(dir) { side = dir === 'rtl' ? -1 : 1; },
    setScroll(p) { scrollP = p; },
    dispose() {
      renderer.setAnimationLoop(null); io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave);
      pGeo.dispose(); lGeo.dispose(); pMat.dispose(); lMat.dispose(); renderer.dispose(); canvas.remove();
    }
  };
}
