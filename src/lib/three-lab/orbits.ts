import {
  BufferAttribute,
  Euler,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import type { SceneFactory, SceneLabel } from './types';

const TAU = Math.PI * 2;

interface OrbitSpec {
  radius: number;
  phase: number;
  speed: number;
  arcStart: number;
  irregularity: number;
  startPosition: Vector3;
  endPosition: Vector3;
  startRotation: Euler;
  endRotation: Euler;
  startScale: Vector3;
}

function radialOffset(angle: number, irregularity: number): number {
  return 1 + irregularity * (Math.sin(angle * 3 + 0.4) * 0.08 + Math.cos(angle * 5) * 0.035);
}

/** Keep the circle as the base shape; the single morph target is the unsettled state. */
function orbitGeometry(
  radius: number,
  tube: number,
  irregularity: number,
  arc = TAU,
  arcStart = 0,
): TorusGeometry {
  const geometry = new TorusGeometry(radius, tube, 6, arc === TAU ? 128 : 32, arc);
  geometry.rotateZ(arcStart);
  const positions = geometry.getAttribute('position');
  const unsettled = new Float32Array(positions.count * 3);

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const angle = Math.atan2(y, x);
    const offset = radialOffset(angle, irregularity);
    unsettled[index * 3] = x * offset;
    unsettled[index * 3 + 1] = y * offset;
    unsettled[index * 3 + 2] = positions.getZ(index);
  }

  geometry.morphAttributes.position = [new BufferAttribute(unsettled, 3)];
  geometry.computeBoundingSphere();
  return geometry;
}

export const createOrbits: SceneFactory = (palette) => {
  const group = new Group();
  group.name = 'orbits';

  const limeMaterial = new MeshStandardMaterial({
    color: palette.lime,
    roughness: 0.83,
    metalness: 0.025,
  });
  const paperMaterial = new MeshStandardMaterial({
    color: palette.paper,
    roughness: 0.74,
    metalness: 0.04,
  });
  const darkMaterial = new MeshStandardMaterial({
    color: palette.dark,
    roughness: 0.92,
    metalness: 0,
  });
  const trackMaterial = new MeshBasicMaterial({ color: palette.muted });
  const accentMaterial = new MeshBasicMaterial({ color: palette.lime });

  const hub = new Mesh(new SphereGeometry(0.385, 40, 28), limeMaterial);
  hub.name = 'automation-hub';
  hub.scale.set(1, 0.91, 1);
  hub.rotation.z = -0.18;
  group.add(hub);

  // An inset on the hub gives it a direction without introducing another ring.
  const hubInset = new Mesh(new SphereGeometry(0.042, 16, 12), darkMaterial);
  hubInset.position.set(0.125, 0.11, 0.35);
  hubInset.scale.z = 0.42;
  hub.add(hubInset);

  const specs: OrbitSpec[] = [
    {
      radius: 1.43,
      phase: 2.42,
      speed: 0.09,
      arcStart: 2.75,
      irregularity: 1,
      startPosition: new Vector3(-0.34, 0.13, 0.18),
      endPosition: new Vector3(0.02, 0.03, 0),
      startRotation: new Euler(0.31, 0.19, -0.14),
      endRotation: new Euler(-0.5, 0.18, -0.2),
      startScale: new Vector3(0.86, 0.68, 1),
    },
    {
      radius: 1.76,
      phase: 0.22,
      speed: -0.067,
      arcStart: 0.58,
      irregularity: 0.83,
      startPosition: new Vector3(0.25, 0.23, -0.1),
      endPosition: new Vector3(-0.07, -0.03, 0.04),
      startRotation: new Euler(-0.55, 0.42, -0.37),
      endRotation: new Euler(1.13, 0.48, 0.46),
      startScale: new Vector3(0.78, 0.51, 1),
    },
    {
      radius: 2.02,
      phase: 4.79,
      speed: 0.051,
      arcStart: 4.32,
      irregularity: 1.1,
      startPosition: new Vector3(0.08, -0.23, 0.18),
      endPosition: new Vector3(0.06, 0, -0.06),
      startRotation: new Euler(-0.28, -0.33, 0.76),
      endRotation: new Euler(0.63, -0.9, -0.52),
      startScale: new Vector3(0.78, 0.73, 1),
    },
  ];

  const satelliteGeometry = new SphereGeometry(0.104, 24, 18);
  const markerGeometry = new SphereGeometry(0.029, 12, 8);
  const rings = specs.map((spec, index) => {
    const plane = new Group();
    const track = new Mesh(orbitGeometry(spec.radius, 0.007, spec.irregularity), trackMaterial);
    const accent = new Mesh(
      orbitGeometry(spec.radius, 0.012, spec.irregularity, 0.42 - index * 0.055, spec.arcStart),
      accentMaterial,
    );
    const satellite = new Mesh(satelliteGeometry, index === 1 ? limeMaterial : paperMaterial);
    const marker = new Mesh(markerGeometry, trackMaterial);
    satellite.scale.setScalar(index === 2 ? 0.82 : 1);
    plane.add(track, accent, satellite, marker);
    group.add(plane);
    return {
      spec,
      plane,
      track,
      accent,
      satellite,
      marker,
      startQuaternion: new Quaternion().setFromEuler(spec.startRotation),
      endQuaternion: new Quaternion().setFromEuler(spec.endRotation),
    };
  });

  // Stable anchors keep the typography out of the moving centre of the system.
  const labelSpecs = [
    { text: 'Factures', x: -1.72, y: 1.1, z: 0.18 },
    { text: 'Contenus', x: 1.65, y: 0.93, z: 0.2 },
    { text: 'Support', x: 1.5, y: -1.22, z: 0.22 },
    { text: 'Automatisations', x: -1.21, y: -1.48, z: 0.28, accent: true },
  ];
  const labels: SceneLabel[] = labelSpecs.map(({ text, x, y, z, accent }) => {
    const anchor = new Object3D();
    anchor.name = `label-${text.toLowerCase()}`;
    anchor.position.set(x, y, z);
    group.add(anchor);
    return { text, anchor, accent };
  });

  const settledScale = new Vector3(1, 1, 1);
  const update = (time: number, progress: number): void => {
    const settled = MathUtils.smootherstep(progress, 0, 1);
    const unsettled = 1 - settled;

    for (const ring of rings) {
      const { spec, plane, satellite, marker } = ring;
      plane.position.lerpVectors(spec.startPosition, spec.endPosition, settled);
      plane.quaternion.slerpQuaternions(ring.startQuaternion, ring.endQuaternion, settled);
      plane.scale.lerpVectors(spec.startScale, settledScale, settled);
      if (ring.track.morphTargetInfluences) ring.track.morphTargetInfluences[0] = unsettled;
      if (ring.accent.morphTargetInfluences) ring.accent.morphTargetInfluences[0] = unsettled;

      const angle = spec.phase + time * spec.speed;
      const radius = spec.radius * radialOffset(angle, spec.irregularity * unsettled);
      satellite.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      // Compensate the oval track's transform so satellites remain round.
      const satelliteSize = spec.radius > 2 ? 0.82 : 1;
      satellite.scale.set(satelliteSize / plane.scale.x, satelliteSize / plane.scale.y, satelliteSize);

      const markerAngle = angle + 2.13;
      const markerRadius = spec.radius * radialOffset(markerAngle, spec.irregularity * unsettled);
      marker.position.set(Math.cos(markerAngle) * markerRadius, Math.sin(markerAngle) * markerRadius, 0);
      marker.scale.set(1 / plane.scale.x, 1 / plane.scale.y, 1);
    }

    hub.position.set(-0.16 * unsettled, 0.04 * unsettled, 0);
    hub.rotation.y = Math.sin(time * 0.12) * 0.08;
  };

  update(0, 1);
  return { group, labels, update };
};
