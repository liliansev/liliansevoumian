import {
  BufferAttribute,
  BufferGeometry,
  CylinderGeometry,
  DynamicDrawUsage,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Sphere,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import type { LabScene, SceneFactory, SceneLabel, ScenePalette } from './types';

const TAU = Math.PI * 2;
const LINK_SEGMENTS = 32;
const TASK_RADIUS = 0.67;
const HUB_RADIUS = 0.72;

function smoothstep(start: number, end: number, value: number): number {
  const amount = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return amount * amount * (3 - 2 * amount);
}

interface Connection {
  line: Line;
  positions: BufferAttribute;
  start: Vector3;
  end: Vector3;
}

/** One story in two poses: the work stays connected, while its owner steps out. */
function makeDelegation(palette: ScenePalette, compact: boolean): LabScene {
  const group = new Group();
  group.name = compact ? 'Délégation — portrait' : 'Délégation';

  const graphite = new MeshBasicMaterial({
    color: palette.dark,
    toneMapped: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const outline = new MeshBasicMaterial({ color: palette.muted, toneMapped: false });
  const accent = new MeshBasicMaterial({ color: palette.lime, toneMapped: false });
  const ownerFace = new MeshBasicMaterial({
    color: palette.dark,
    toneMapped: false,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });
  const ownerOutline = new MeshBasicMaterial({
    color: palette.lime,
    toneMapped: false,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });
  const hubOutline = ownerOutline.clone();
  const peopleAccent = ownerOutline.clone();
  const connectingLine = new LineBasicMaterial({ color: palette.muted, transparent: true, opacity: 0.72 });
  const peopleLine = new LineBasicMaterial({ color: palette.lime, transparent: true, opacity: 0 });
  const taskRingGeometry = new TorusGeometry(TASK_RADIUS, 0.0065, 8, 80);
  const signalGeometry = new SphereGeometry(0.023, 12, 8);
  const endGeometry = new SphereGeometry(0.018, 12, 8);

  function addConnection(material: LineBasicMaterial): Connection {
    const positions = new BufferAttribute(new Float32Array((LINK_SEGMENTS + 1) * 3), 3).setUsage(DynamicDrawUsage);
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', positions);
    geometry.boundingSphere = new Sphere(new Vector3(), 3.15);
    const line = new Line(geometry, material);
    group.add(line);
    return { line, positions, start: new Vector3(), end: new Vector3() };
  }

  function updateConnection(connection: Connection, bow: number): void {
    for (let index = 0; index <= LINK_SEGMENTS; index += 1) {
      const t = index / LINK_SEGMENTS;
      const depth = Math.sin(t * Math.PI) * bow;
      connection.positions.setXYZ(
        index,
        connection.start.x + (connection.end.x - connection.start.x) * t,
        connection.start.y + (connection.end.y - connection.start.y) * t,
        connection.start.z + (connection.end.z - connection.start.z) * t + depth,
      );
    }
    connection.positions.needsUpdate = true;
  }

  function addDisc(
    radius: number,
    faceMaterial = graphite,
    rimMaterial = accent,
    rimThickness = 0.007,
  ): { body: Group; anchor: Object3D } {
    const body = new Group();
    const face = new Mesh(new CylinderGeometry(radius, radius, 0.04, 64), faceMaterial);
    face.rotation.x = Math.PI / 2;
    face.renderOrder = 1;
    body.add(face);
    const front = new Mesh(new TorusGeometry(radius, rimThickness, 8, 80), rimMaterial);
    front.position.z = 0.025;
    front.renderOrder = 2;
    body.add(front);
    const anchor = new Object3D();
    anchor.position.z = 0.05;
    body.add(anchor);
    group.add(body);
    return { body, anchor };
  }

  const hub = addDisc(HUB_RADIUS, graphite, hubOutline);
  const owner = addDisc(0.38, ownerFace, ownerOutline, 0.0037);
  const automatedHubLabel: SceneLabel = { text: 'Automatisations', anchor: hub.anchor, accent: true, opacity: 0 };
  const ownerLabel: SceneLabel = { text: 'Vous', anchor: owner.anchor, accent: true, opacity: 1 };

  const tasks = [
    { text: 'Factures', x: -0.88, y: compact ? 0.85 : 1.02 },
    { text: 'Contenus', x: 0.88, y: compact ? 0.85 : 1.02 },
    { text: 'Relances', x: -0.88, y: compact ? -0.85 : -1.02 },
    { text: 'Support', x: 0.88, y: compact ? -0.85 : -1.02 },
  ].map((task, index) => {
    const body = new Group();
    body.rotation.x = index < 2 ? -0.045 : 0.045;
    body.rotation.y = task.x < 0 ? 0.05 : -0.05;
    body.add(new Mesh(taskRingGeometry, outline));

    // A small inlay shows the connection becoming active, without lighting effects.
    const inlayMaterial = ownerOutline.clone();
    const inlay = new Mesh(new TorusGeometry(TASK_RADIUS, 0.007, 8, 24, Math.PI * 0.38), inlayMaterial);
    inlay.rotation.z = index * Math.PI / 2 + 0.2;
    inlay.position.z = 0.012;
    body.add(inlay);

    const anchor = new Object3D();
    anchor.position.z = 0.065;
    body.add(anchor);
    const signal = new Mesh(signalGeometry, accent);
    body.add(signal);
    group.add(body);
    return { ...task, body, anchor, inlayMaterial, signal, connection: addConnection(connectingLine) };
  });

  const people = ['Équipe', 'Clients'].map((text, index) => {
    const endpoint = new Mesh(endGeometry, peopleAccent);
    const anchor = new Object3D();
    group.add(endpoint, anchor);
    const label: SceneLabel = { text, anchor, opacity: 0 };
    return { index, endpoint, anchor, label, connection: addConnection(peopleLine) };
  });

  const labels: SceneLabel[] = [
    ...tasks.map((task) => ({ text: task.text, anchor: task.anchor })),
    automatedHubLabel,
    ownerLabel,
    ...people.map((person) => person.label),
  ];
  const direction = new Vector3();
  const initialHub = new Vector3(0, compact ? 0.15 : 0, 0);
  const finalHub = new Vector3(compact ? 0 : -0.8, compact ? 0.75 : 0, 0);
  const finalOwner = new Vector3(compact ? 0 : 1.37, compact ? -1.34 : 0, 0.13);
  let previousProgress = -1;

  function update(_time: number, progress: number): void {
    const amount = Math.max(0, Math.min(1, progress));
    const transition = smoothstep(0.05, 0.86, amount);
    const departure = smoothstep(0.22, 0.86, amount);
    const release = smoothstep(0.64, 0.96, amount);

    if (amount !== previousProgress) {
      hub.body.position.lerpVectors(initialHub, finalHub, transition);
      owner.body.position.lerpVectors(hub.body.position, finalOwner, departure);
      const ownerRadius = HUB_RADIUS + (0.38 - HUB_RADIUS) * departure;
      owner.body.scale.setScalar(ownerRadius / 0.38);

      // The same owner leaves the center; the automation hub becomes visible behind it.
      graphite.opacity = smoothstep(0.28, 0.6, amount);
      hubOutline.opacity = graphite.opacity;
      automatedHubLabel.opacity = smoothstep(0.52, 0.7, amount);

      for (let index = 0; index < tasks.length; index += 1) {
        const task = tasks[index];
        const stagger = index * 0.025;
        const taskProgress = smoothstep(0.08 + stagger, 0.79 + stagger, amount);
        task.body.position.set(
          initialHub.x + (finalHub.x - initialHub.x) * taskProgress + task.x,
          initialHub.y + (finalHub.y - initialHub.y) * taskProgress + task.y,
          (index % 2 === 0 ? -1 : 1) * (0.04 + taskProgress * 0.025),
        );
        task.inlayMaterial.opacity = smoothstep(0.36 + stagger, 0.65 + stagger, amount);

        // The signal advances with the handover only; an idle page stays still.
        const phase = index * TAU / tasks.length + taskProgress * 0.6;
        task.signal.position.set(Math.cos(phase) * TASK_RADIUS, Math.sin(phase) * TASK_RADIUS, 0.025);

        // Intersecting rings already express the link. Avoid a reversed segment inside them.
        task.connection.line.visible = task.body.position.distanceTo(hub.body.position) > TASK_RADIUS + HUB_RADIUS;
        direction.subVectors(hub.body.position, task.body.position).normalize();
        task.connection.start.copy(task.body.position).addScaledVector(direction, TASK_RADIUS);
        task.connection.end.copy(hub.body.position).addScaledVector(direction, -HUB_RADIUS);
        updateConnection(task.connection, 0.045);
      }

      peopleLine.opacity = release;
      peopleAccent.opacity = release;
      for (const person of people) {
        const side = person.index === 0 ? -1 : 1;
        person.endpoint.position.set(
          compact ? side * 1.05 : 2.35,
          compact ? -2.01 : -side * 0.64,
          0.14,
        );
        person.anchor.position.copy(person.endpoint.position);
        person.anchor.position.y += compact ? -0.24 : -side * 0.25;
        person.label.opacity = smoothstep(0.66 + person.index * 0.04, 0.9 + person.index * 0.04, amount);
        direction.subVectors(person.endpoint.position, owner.body.position).normalize();
        person.connection.start.copy(owner.body.position).addScaledVector(direction, ownerRadius + 0.01);
        person.connection.end.copy(person.endpoint.position);
        updateConnection(person.connection, 0.06);
      }
      previousProgress = amount;
    }
  }

  update(0, 0);
  return { group, labels, update };
}

/** Near-front camera (0.4, 0.35, 8), conservative fit radius 3.15. */
export const createDelegation: SceneFactory = (palette) => makeDelegation(palette, false);

/** Portrait rearranges the owner below the tasks; use below a 600 px canvas width. */
export const createDelegationCompact: SceneFactory = (palette) => makeDelegation(palette, true);
