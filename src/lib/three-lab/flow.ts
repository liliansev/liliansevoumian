import {
  BufferAttribute,
  BufferGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  DynamicDrawUsage,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Sphere,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import type { SceneFactory } from './types';

const SEGMENTS = 112;
const SIDES = 8;
const HALF_LENGTH = 2.38;
const PIPE_RADIUS = 0.023;
const TAU = Math.PI * 2;

/** Both endpoints stay fixed while the middle of each conduit finds its lane. */
function pointOnTrack(u: number, lane: number, disorder: number, target: Vector3): void {
  const phase = (lane + 1) * TAU / 3;
  const envelope = Math.sin(Math.PI * u);
  const sweep = Math.sin(TAU * u);
  target.set(
    (u * 2 - 1) * HALF_LENGTH,
    lane * 0.52 + sweep * 0.14 + disorder * envelope * Math.sin(TAU * 2 * u + phase) * 0.6,
    lane * 0.1 + envelope * 0.06 + disorder * envelope * Math.sin(Math.PI * 3 * u + phase) * 0.62,
  );
}

function tangentOnTrack(u: number, lane: number, disorder: number, target: Vector3): void {
  const phase = (lane + 1) * TAU / 3;
  const envelope = Math.sin(Math.PI * u);
  const envelopeSlope = Math.PI * Math.cos(Math.PI * u);
  const bend = TAU * 2 * u + phase;
  const depth = Math.PI * 3 * u + phase;
  target.set(
    HALF_LENGTH * 2,
    TAU * Math.cos(TAU * u) * 0.14
      + disorder * 0.6 * (envelopeSlope * Math.sin(bend) + envelope * TAU * 2 * Math.cos(bend)),
    envelopeSlope * 0.06
      + disorder * 0.62 * (envelopeSlope * Math.sin(depth) + envelope * Math.PI * 3 * Math.cos(depth)),
  ).normalize();
}

function makeConduitGeometry(): BufferGeometry {
  const geometry = new BufferGeometry();
  const vertexCount = (SEGMENTS + 1) * (SIDES + 1);
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertexCount * 3), 3).setUsage(DynamicDrawUsage));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(vertexCount * 3), 3).setUsage(DynamicDrawUsage));
  const indices = new Uint16Array(SEGMENTS * SIDES * 6);
  let offset = 0;

  for (let segment = 0; segment < SEGMENTS; segment += 1) {
    for (let side = 0; side < SIDES; side += 1) {
      const a = segment * (SIDES + 1) + side;
      const b = a + SIDES + 1;
      indices[offset++] = a;
      indices[offset++] = a + 1;
      indices[offset++] = b;
      indices[offset++] = a + 1;
      indices[offset++] = b + 1;
      indices[offset++] = b;
    }
  }

  geometry.setIndex(new BufferAttribute(indices, 1));
  // The conservative bound covers every blend, with no per-frame bound allocation.
  geometry.boundingSphere = new Sphere(new Vector3(), 2.8);
  return geometry;
}

export const createFlow: SceneFactory = (palette) => {
  const group = new Group();
  const sculpture = new Group();
  // A fixed oblique view reveals the circular gateway and the conduits' depth.
  sculpture.rotation.y = -0.35;
  group.add(sculpture);

  const conduitMaterial = new MeshStandardMaterial({ color: palette.muted, roughness: 0.58, metalness: 0.12 });
  const paperMaterial = new MeshStandardMaterial({ color: palette.paper, roughness: 0.44, metalness: 0.12 });
  const limeMaterial = new MeshStandardMaterial({ color: palette.lime, roughness: 0.5, metalness: 0.04 });
  const gateMaterial = new MeshStandardMaterial({ color: palette.dark, roughness: 0.72, metalness: 0.18, side: DoubleSide });

  const gate = new Group();
  const shell = new Mesh(new CylinderGeometry(0.94, 0.94, 0.14, 96, 1, true), gateMaterial);
  shell.rotation.z = Math.PI / 2;
  gate.add(shell);

  const rimGeometry = new TorusGeometry(0.94, 0.023, 10, 96);
  for (const x of [-0.07, 0.07]) {
    const rim = new Mesh(rimGeometry, paperMaterial);
    rim.rotation.y = Math.PI / 2;
    rim.position.x = x;
    gate.add(rim);
  }

  // A short lime inlay makes the processing point legible without emissive light.
  const inlay = new Mesh(new TorusGeometry(0.94, 0.027, 10, 32, Math.PI / 3), limeMaterial);
  inlay.rotation.y = Math.PI / 2;
  inlay.rotation.z = Math.PI / 3;
  inlay.position.x = 0.075;
  gate.add(inlay);
  sculpture.add(gate);

  const nodeGeometry = new SphereGeometry(0.065, 16, 12);
  const packetGeometry = new CapsuleGeometry(0.041, 0.11, 4, 8);
  const conduits: { lane: number; geometry: BufferGeometry }[] = [];
  const packets: { lane: number; offset: number; mesh: Mesh }[] = [];

  for (let lane = -1; lane <= 1; lane += 1) {
    const geometry = makeConduitGeometry();
    sculpture.add(new Mesh(geometry, conduitMaterial));
    conduits.push({ lane, geometry });

    for (const u of [0, 1]) {
      const node = new Mesh(nodeGeometry, u === 1 ? limeMaterial : paperMaterial);
      pointOnTrack(u, lane, 0, node.position);
      sculpture.add(node);
    }

    for (let index = 0; index < 3; index += 1) {
      const mesh = new Mesh(packetGeometry, index === 1 ? paperMaterial : limeMaterial);
      sculpture.add(mesh);
      packets.push({ lane, offset: index / 3 + (lane + 1) * 0.075, mesh });
    }
  }

  const requestsAnchor = new Object3D();
  requestsAnchor.position.set(-1.95, 1.16, 0);
  const processingAnchor = new Object3D();
  processingAnchor.position.set(0, 1.23, 0);
  const actionsAnchor = new Object3D();
  actionsAnchor.position.set(1.95, 1.16, 0);
  sculpture.add(requestsAnchor, processingAnchor, actionsAnchor);

  const point = new Vector3();
  const tangent = new Vector3();
  const normal = new Vector3();
  const binormal = new Vector3();
  const packetAxis = new Vector3(0, 1, 0);
  const radialCos = new Float32Array(SIDES + 1);
  const radialSin = new Float32Array(SIDES + 1);
  for (let side = 0; side <= SIDES; side += 1) {
    const angle = side / SIDES * TAU;
    radialCos[side] = Math.cos(angle);
    radialSin[side] = Math.sin(angle);
  }
  let previousDisorder = -1;

  function update(time: number, progress: number): void {
    const amount = Math.max(0, Math.min(1, progress));
    const eased = amount * amount * (3 - 2 * amount);
    const disorder = 1 - eased;

    if (disorder !== previousDisorder) {
      for (const conduit of conduits) {
        const positions = conduit.geometry.getAttribute('position') as BufferAttribute;
        const normals = conduit.geometry.getAttribute('normal') as BufferAttribute;

        for (let segment = 0; segment <= SEGMENTS; segment += 1) {
          const u = segment / SEGMENTS;
          pointOnTrack(u, conduit.lane, disorder, point);
          tangentOnTrack(u, conduit.lane, disorder, tangent);
          // X is strictly increasing, so this frame cannot become singular.
          normal.set(-tangent.y, tangent.x, 0).normalize();
          binormal.crossVectors(tangent, normal);

          for (let side = 0; side <= SIDES; side += 1) {
            const cosine = radialCos[side];
            const sine = radialSin[side];
            const nx = normal.x * cosine + binormal.x * sine;
            const ny = normal.y * cosine + binormal.y * sine;
            const nz = normal.z * cosine + binormal.z * sine;
            const vertex = segment * (SIDES + 1) + side;
            positions.setXYZ(vertex, point.x + nx * PIPE_RADIUS, point.y + ny * PIPE_RADIUS, point.z + nz * PIPE_RADIUS);
            normals.setXYZ(vertex, nx, ny, nz);
          }
        }

        positions.needsUpdate = true;
        normals.needsUpdate = true;
      }
      previousDisorder = disorder;
    }

    for (const packet of packets) {
      const phase = time * 0.085 + packet.offset;
      const u = phase - Math.floor(phase);
      pointOnTrack(u, packet.lane, disorder, packet.mesh.position);
      tangentOnTrack(u, packet.lane, disorder, tangent);
      packet.mesh.quaternion.setFromUnitVectors(packetAxis, tangent);
      const edge = Math.min(1, u / 0.035, (1 - u) / 0.035);
      packet.mesh.scale.setScalar(edge * edge * (3 - 2 * edge));
    }
  }

  update(0, 0);

  return {
    group,
    labels: [
      { text: 'Demandes', anchor: requestsAnchor },
      { text: 'Traitement', anchor: processingAnchor, accent: true },
      { text: 'Actions', anchor: actionsAnchor },
    ],
    update,
  };
};
