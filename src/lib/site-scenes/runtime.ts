import {
  AmbientLight, BufferGeometry, Color, DirectionalLight, Material,
  PerspectiveCamera, Scene, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { createFlow } from '../three-lab/flow';
import { createStructure } from '../three-lab/structure';
import { createDelegation, createDelegationCompact } from '../three-lab/delegation';
import type { LabScene, ScenePalette } from '../three-lab/types';

function disposeSculpture(sculpture: LabScene) {
      const geometries = new Set<BufferGeometry>();
      const materials = new Set<Material>();
      sculpture.group.traverse((object) => {
        if ('geometry' in object && object.geometry instanceof BufferGeometry) geometries.add(object.geometry);
        if ('material' in object) {
          const values: unknown[] = Array.isArray(object.material) ? object.material : [object.material];
          values.forEach((material) => { if (material instanceof Material) materials.add(material); });
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      sculpture.group.removeFromParent();
}

/** Progressive enhancement: the semantic diagram survives module or WebGL failure. */
export function mountScene(host: HTMLElement): () => void {
  const required = <T extends HTMLElement>(selector: string): T => {
    const element = host.querySelector<T>(selector);
    if (!element) throw new Error(`Missing scene element: ${selector}`);
    return element;
  };
  const canvas = required<HTMLCanvasElement>('canvas');
  const viewport = required('.scene-viewport');
  const labelLayer = required('.scene-labels');
  const playButton = required<HTMLButtonElement>('[data-play]');
  const playLabel = required('[data-play-label]');
  const stepButtons = [...host.querySelectorAll<HTMLButtonElement>('[data-step]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const styles = getComputedStyle(host);
  const palette: ScenePalette = {
    lime: styles.getPropertyValue('--color-lime').trim(),
    paper: styles.getPropertyValue('--color-paper').trim(),
    muted: styles.getPropertyValue('--color-ink-faint').trim(),
    dark: styles.getPropertyValue('--color-ink').trim(),
  };
  const id = host.dataset.scene;
  const abort = new AbortController();
  let renderer: WebGLRenderer | undefined;
  let current: LabScene | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let observer: IntersectionObserver | undefined;
  let frame = 0;
  let destroyed = false;

  const dispose = () => {
    if (destroyed) return;
    destroyed = true;
    cancelAnimationFrame(frame);
    abort.abort();
    observer?.disconnect();
    resizeObserver?.disconnect();
    if (current) {
      disposeSculpture(current);
    }
    renderer?.dispose();
  };
  const fail = (error: unknown) => {
    dispose();
    host.dataset.state = 'error';
    required('[data-scene-status]').textContent = 'Schéma affiché sans animation.';
    console.error('Scene enhancement unavailable:', error);
  };

  const protect = (operation: () => void) => {
    if (destroyed) return;
    try { operation(); } catch (error) { fail(error); }
  };

  try {
    const gl = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
    renderer = gl;
    gl.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    gl.outputColorSpace = SRGBColorSpace;
    const scene = new Scene();
    scene.background = new Color(palette.dark);
    scene.add(new AmbientLight(palette.paper, .9));
    const key = new DirectionalLight(palette.paper, 1.4);
    key.position.set(-3, 5, 5);
    const rim = new DirectionalLight(palette.paper, .7);
    rim.position.set(4, 1, -3);
    scene.add(key, rim);
    let compact = viewport.clientWidth < 600;
    const create = () => id === 'flux' ? createFlow(palette) : id === 'structure' ? createStructure(palette) : compact ? createDelegationCompact(palette) : createDelegation(palette);
    current = create();
    let sculpture = current;
    scene.add(sculpture.group);
    const camera = new PerspectiveCamera(38, 1, .1, 100);
    const direction = id === 'structure' ? new Vector3(5, 4.4, 6) : id === 'flux' ? new Vector3(.9, 1.8, 8) : new Vector3(.4, .35, 8);
    const makeLabels = () => sculpture.labels.map((label) => {
      const element = document.createElement('span');
      element.className = `site-scene-label${label.accent ? ' site-scene-label--accent' : ''}`;
      return element;
    });
    let labels = makeLabels();
    labelLayer.replaceChildren(...labels);
    const point = new Vector3();
    let width = 1;
    let height = 1;
    let progress = motion.matches ? 1 : 0;
    let elapsed = 0;
    let transitionTime = 0;
    let running = !motion.matches;
    let visible = false;
    let previous = performance.now();
    let distance = 8;
    let tiltX = 0;
    let tiltY = 0;
    const duration = 4.6;

    const sync = () => {
      host.dataset.progress = progress.toFixed(3);
      host.dataset.running = String(running);
      stepButtons.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.step) === (progress < .5 ? 0 : 1))));
      playLabel.textContent = running ? 'Pause' : transitionTime > 0 && transitionTime < duration ? 'Reprendre' : 'Rejouer';
      playButton.setAttribute('aria-label', running ? 'Mettre la transition en pause' : transitionTime > 0 && transitionTime < duration ? 'Reprendre la transition' : 'Rejouer la transition');
      playButton.hidden = motion.matches;
    };
    const render = () => {
      if (destroyed) return;
      sculpture.update(elapsed, progress);
      camera.position.copy(direction).normalize().multiplyScalar(distance);
      camera.position.x += tiltX;
      camera.position.y += tiltY;
      camera.lookAt(0, 0, 0);
      gl.render(scene, camera);
      sculpture.labels.forEach((label, index) => {
        label.anchor.getWorldPosition(point).project(camera);
        const element = labels[index];
        element.textContent = label.text;
        element.hidden = !label.text || point.z > 1 || point.z < -1;
        const margin = Math.min(70, width * .19);
        const x = Math.max(margin, Math.min(width - margin, (point.x * .5 + .5) * width));
        const y = Math.max(18, Math.min(height - 18, (-point.y * .5 + .5) * height));
        element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden && !destroyed) frame = requestAnimationFrame(tick);
    };
    const tick = (now: number) => {
      frame = 0;
      if (destroyed || !visible || document.hidden) return;
      try {
        const delta = Math.min((now - previous) / 1000, .05);
        previous = now;
        if (running) {
          elapsed += delta;
          transitionTime = Math.min(duration, transitionTime + delta);
          const t = Math.max(0, (transitionTime - .65) / (duration - .65));
          progress = t * t * (3 - 2 * t);
          if (transitionTime === duration) running = false;
          sync();
        }
        render();
        if (running) schedule();
      } catch (error) { fail(error); }
    };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = performance.now(); };
    const resize = () => protect(() => {
      width = Math.max(1, viewport.clientWidth);
      height = Math.max(1, viewport.clientHeight);
      if (id === 'delegation' && compact !== (width < 600)) {
        compact = width < 600;
        disposeSculpture(sculpture);
        current = create();
        sculpture = current;
        scene.add(sculpture.group);
        labels = makeLabels();
        labelLayer.replaceChildren(...labels);
      }
      camera.aspect = width / height;
      const vertical = camera.fov * Math.PI / 180;
      const horizontal = 2 * Math.atan(Math.tan(vertical / 2) * camera.aspect);
      if (id === 'structure') distance = 2.3 / Math.sin(Math.min(vertical, horizontal) / 2);
      else {
        // Public scenes use a fixed view, so frame their width and height independently.
        const halfWidth = id === 'flux' ? 2.85 : compact ? 1.95 : 3.05;
        const halfHeight = id === 'flux' ? 1.65 : compact ? 2.6 : 1.95;
        distance = Math.max(halfWidth / Math.tan(horizontal / 2), halfHeight / Math.tan(vertical / 2)) + .35;
      }
      camera.updateProjectionMatrix();
      gl.setSize(width, height, false);
      render();
    });
    playButton.addEventListener('click', () => {
      if (destroyed) return;
      if (running) running = false;
      else {
        if (transitionTime === duration || transitionTime === 0) { transitionTime = 0; elapsed = 0; progress = 0; }
        running = true;
      }
      previous = performance.now();
      sync();
      schedule();
    }, { signal: abort.signal });
    stepButtons.forEach((button) => button.addEventListener('click', () => protect(() => {
      running = false;
      progress = Number(button.dataset.step);
      transitionTime = progress * duration;
      stop();
      sync();
      render();
    }), { signal: abort.signal }));
    // A small desktop parallax retains the diagram's reading order and never captures touch scrolling.
    viewport.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || motion.matches || destroyed) return;
      const rect = viewport.getBoundingClientRect();
      tiltX = ((event.clientX - rect.left) / rect.width - .5) * .35;
      tiltY = -((event.clientY - rect.top) / rect.height - .5) * .2;
      schedule();
    }, { signal: abort.signal });
    viewport.addEventListener('pointerleave', () => { tiltX = 0; tiltY = 0; schedule(); }, { signal: abort.signal });
    motion.addEventListener('change', () => protect(() => {
      if (motion.matches) { running = false; progress = 1; transitionTime = duration; tiltX = 0; tiltY = 0; }
      stop();
      sync();
      render();
    }), { signal: abort.signal });
    document.addEventListener('visibilitychange', () => { stop(); if (!document.hidden) schedule(); }, { signal: abort.signal });
    canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); fail(new Error('WebGL context lost')); }, { signal: abort.signal });
    observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .25; stop(); if (visible) schedule(); }, { threshold: .25 });
    resizeObserver = new ResizeObserver(resize);
    resize();
    if (destroyed) return dispose;
    sync();
    host.dataset.state = 'ready';
    observer.observe(viewport);
    resizeObserver.observe(viewport);
  } catch (error) { fail(error); }
  return dispose;
}
