import {
  AmbientLight, BufferGeometry, Color, DirectionalLight, Material,
  PerspectiveCamera, Scene, Spherical, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { isSceneId, sceneContent, type SceneId } from './content';
import { createOrbits } from './orbits';
import { createFlow } from './flow';
import { createStructure } from './structure';
import type { LabScene, SceneFactory, ScenePalette } from './types';

const factories: Record<SceneId, SceneFactory> = {
  orbites: createOrbits,
  flux: createFlow,
  structure: createStructure,
};

function disposeScene(scene: LabScene) {
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();
  scene.group.traverse((object) => {
    if ('geometry' in object && object.geometry instanceof BufferGeometry) geometries.add(object.geometry);
    if ('material' in object) {
      const values: unknown[] = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of values) if (material instanceof Material) materials.add(material);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  scene.group.removeFromParent();
}

class ThreeLab extends HTMLElement {
  private teardown?: () => void;

  connectedCallback() {
    if (this.teardown) return;
    try {
      this.setup();
    } catch (error) {
      this.disconnectedCallback();
      this.showError('La 3D n’a pas pu démarrer dans ce navigateur. Essayez de recharger la scène.');
      console.error('Three.js scene initialization failed:', error);
    }
  }

  disconnectedCallback() {
    this.teardown?.();
    this.teardown = undefined;
  }

  private element<T extends HTMLElement>(selector: string): T {
    const node = this.querySelector<T>(selector);
    if (!node) throw new Error(`Missing Three.js lab element: ${selector}`);
    return node;
  }

  private showError(message: string) {
    this.dataset.state = 'error';
    this.element('[data-status-text]').textContent = message;
    this.element<HTMLFieldSetElement>('fieldset').disabled = true;
    this.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach((button) => { button.disabled = true; });
    this.element<HTMLCanvasElement>('canvas').tabIndex = -1;
    const retry = this.element<HTMLButtonElement>('[data-reload]');
    retry.hidden = false;
    retry.onclick = () => window.location.reload();
  }

  private setup() {
    const canvas = this.element<HTMLCanvasElement>('canvas');
    const viewport = this.element('.lab-viewport');
    const labelLayer = this.element('.lab-labels');
    const range = this.element<HTMLInputElement>('#lab-progress');
    const pauseButton = this.element<HTMLButtonElement>('[data-pause]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const styles = getComputedStyle(this);
    const palette: ScenePalette = {
      lime: styles.getPropertyValue('--color-lime').trim(),
      paper: styles.getPropertyValue('--color-paper').trim(),
      muted: styles.getPropertyValue('--color-ink-faint').trim(),
      dark: styles.getPropertyValue('--color-ink').trim(),
    };
    const abort = new AbortController();
    const { signal } = abort;
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = SRGBColorSpace;
    const scene = new Scene();
    scene.background = new Color(palette.dark);
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = false;
    controls.rotateSpeed = 0.6;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.85;
    // Vertical gestures keep scrolling the page; horizontal drags turn the object.
    canvas.style.touchAction = 'pan-y pinch-zoom';

    scene.add(new AmbientLight(palette.paper, .9));
    const key = new DirectionalLight(palette.paper, 1.4);
    key.position.set(-3, 5, 5);
    const rim = new DirectionalLight(palette.paper, .7);
    rim.position.set(4, 1, -3);
    scene.add(key, rim);

    let activeId: SceneId = 'orbites';
    let current: LabScene | undefined;
    let labelElements: HTMLSpanElement[] = [];
    let frame = 0;
    let elapsed = 0;
    let previousTime = performance.now();
    let progress = 1;
    let playing = !reducedMotion.matches;
    let visible = true;
    let destroyed = false;
    let transitionStart: number | null = null;
    let transitionElapsed = 0;
    let viewportWidth = 1;
    let viewportHeight = 1;
    let cameraDistance = 8;
    const projected = new Vector3();
    const spherical = new Spherical();

    const syncPause = () => {
      pauseButton.textContent = playing ? 'Mettre en pause' : 'Animer la scène';
      pauseButton.setAttribute('aria-pressed', String(!playing));
    };

    const syncProgress = () => {
      range.value = String(Math.round(progress * 100));
      const content = sceneContent[activeId];
      range.setAttribute('aria-valuetext', progress === 0 ? content.before : progress === 1 ? content.after : `Transition : ${range.value} %`);
    };

    const render = () => {
      if (!current || destroyed) return;
      current.update(elapsed, progress);
      renderer.render(scene, camera);
      current.labels.forEach((label, index) => {
        label.anchor.getWorldPosition(projected).project(camera);
        const element = labelElements[index];
        const x = (projected.x * .5 + .5) * viewportWidth;
        const y = (-projected.y * .5 + .5) * viewportHeight;
        element.hidden = projected.z > 1 || projected.z < -1;
        // Keep text inside the viewport while preserving its projected anchor.
        const clampedX = Math.max(58, Math.min(viewportWidth - 58, x));
        const clampedY = Math.max(20, Math.min(viewportHeight - 55, y));
        element.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -50%)`;
      });
    };

    const schedule = () => {
      if (frame || destroyed || !visible || document.hidden) return;
      frame = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      frame = 0;
      if (destroyed || !visible || document.hidden) return;
      const delta = Math.min((now - previousTime) / 1000, .05);
      previousTime = now;
      if (playing) elapsed += delta;
      if (transitionStart !== null) {
        transitionElapsed += delta;
        const t = Math.min(transitionElapsed / 2.4, 1);
        progress = t * t * (3 - 2 * t);
        syncProgress();
        if (t === 1) transitionStart = null;
      }
      render();
      if (playing || transitionStart !== null) schedule();
    };

    const resetView = () => {
      if (activeId === 'structure') camera.position.set(5, 4.4, 6);
      else if (activeId === 'flux') camera.position.set(.9, 1.8, 8);
      else camera.position.set(0, .35, 8);
      camera.position.normalize().multiplyScalar(cameraDistance);
      controls.target.set(0, 0, 0);
      controls.update();
      schedule();
    };

    const resize = () => {
      viewportWidth = Math.max(1, viewport.clientWidth);
      viewportHeight = Math.max(1, viewport.clientHeight);
      camera.aspect = viewportWidth / viewportHeight;
      const verticalFov = camera.fov * Math.PI / 180;
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const radius = activeId === 'flux' ? 2.75 : activeId === 'structure' ? 2.55 : 2.4;
      cameraDistance = radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2);
      camera.position.normalize().multiplyScalar(cameraDistance);
      camera.updateProjectionMatrix();
      renderer.setSize(viewportWidth, viewportHeight, false);
      schedule();
    };

    const chooseScene = (id: SceneId, updateUrl = true) => {
      if (destroyed) return;
      if (current) disposeScene(current);
      activeId = id;
      current = factories[id](palette);
      scene.add(current.group);
      elapsed = 0;
      progress = 1;
      transitionStart = null;
      transitionElapsed = 0;
      const content = sceneContent[id];
      this.dataset.scene = id;
      this.element('[data-title]').textContent = content.title;
      this.element('[data-description]').textContent = content.description;
      this.element('[data-placement]').textContent = content.placement;
      this.element('[data-before]').textContent = content.before;
      this.element('[data-after]').textContent = content.after;
      canvas.setAttribute('aria-label', content.summary);
      this.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.scene === id));
      });
      labelElements = current.labels.map((label) => {
        const element = document.createElement('span');
        element.textContent = label.text;
        element.className = `lab-label${label.accent ? ' lab-label--accent' : ''}`;
        return element;
      });
      labelLayer.replaceChildren(...labelElements);
      syncProgress();
      resize();
      resetView();
      render();
      this.dataset.state = 'ready';
      this.element<HTMLFieldSetElement>('fieldset').disabled = false;
      if (updateUrl) history.replaceState(null, '', `#${id}`);
    };

    const stopFrame = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = performance.now();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      stopFrame();
      if (visible) schedule();
    }, { threshold: 0 });
    const resizeObserver = new ResizeObserver(resize);

    this.teardown = () => {
      destroyed = true;
      stopFrame();
      abort.abort();
      observer.disconnect();
      resizeObserver.disconnect();
      controls.dispose();
      if (current) disposeScene(current);
      renderer.dispose();
    };

    this.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.scene;
        if (id && isSceneId(id)) chooseScene(id);
      }, { signal });
    });
    range.addEventListener('input', () => {
      transitionStart = null;
      progress = Number(range.value) / 100;
      syncProgress();
      schedule();
    }, { signal });
    pauseButton.addEventListener('click', () => {
      playing = !playing;
      if (!playing) transitionStart = null;
      previousTime = performance.now();
      syncPause();
      schedule();
    }, { signal });
    this.element('[data-replay]').addEventListener('click', () => {
      elapsed = 0;
      progress = reducedMotion.matches ? 1 : 0;
      transitionElapsed = 0;
      transitionStart = reducedMotion.matches ? null : performance.now();
      previousTime = performance.now();
      syncProgress();
      schedule();
    }, { signal });
    this.element('[data-reset]').addEventListener('click', resetView, { signal });
    controls.addEventListener('change', schedule);
    canvas.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') return resetView();
      spherical.setFromVector3(camera.position);
      if (event.key === 'ArrowLeft') spherical.theta -= .12;
      if (event.key === 'ArrowRight') spherical.theta += .12;
      if (event.key === 'ArrowUp') spherical.phi -= .12;
      if (event.key === 'ArrowDown') spherical.phi += .12;
      spherical.phi = Math.max(controls.minPolarAngle, Math.min(controls.maxPolarAngle, spherical.phi));
      camera.position.setFromSpherical(spherical);
      controls.update();
      schedule();
    }, { signal });
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      stopFrame();
      destroyed = true;
      this.showError('Le rendu 3D a été interrompu. Rechargez la scène pour reprendre.');
    }, { signal });
    document.addEventListener('visibilitychange', () => {
      stopFrame();
      if (!document.hidden) schedule();
    }, { signal });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        playing = false;
        transitionStart = null;
        syncPause();
      }
      schedule();
    }, { signal });
    window.addEventListener('hashchange', () => {
      const id = window.location.hash.slice(1);
      if (isSceneId(id)) chooseScene(id, false);
    }, { signal });

    const requestedScene = window.location.hash.slice(1);
    chooseScene(isSceneId(requestedScene) ? requestedScene : 'orbites', false);
    syncPause();
    observer.observe(viewport);
    resizeObserver.observe(viewport);
    schedule();
  }
}

if (!customElements.get('three-lab')) customElements.define('three-lab', ThreeLab);
