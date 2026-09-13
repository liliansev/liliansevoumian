import {
  BufferGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Path,
  Shape,
  Vector3,
} from 'three';
import type { SceneFactory } from './types';

/** An architectural assembly: data foundation, application, shared workspace. */
export const createStructure: SceneFactory = (palette) => {
  const group = new Group();
  group.name = 'Structure modulaire';

  const paper = new MeshStandardMaterial({
    color: palette.dark,
    roughness: 0.92,
    metalness: 0,
  });
  const charcoal = new MeshStandardMaterial({
    color: palette.muted,
    roughness: 0.82,
    metalness: 0,
  });
  const lime = new MeshStandardMaterial({
    color: palette.lime,
    roughness: 0.84,
    metalness: 0,
  });
  const edgeMaterial = new LineBasicMaterial({ color: palette.muted });
  const darkEdgeMaterial = new LineBasicMaterial({ color: palette.muted });

  const roundRect = <T extends Path>(path: T, width: number, depth: number, radius: number): T => {
    const x = width / 2;
    const z = depth / 2;
    path.moveTo(-x + radius, -z);
    path.lineTo(x - radius, -z);
    path.quadraticCurveTo(x, -z, x, -z + radius);
    path.lineTo(x, z - radius);
    path.quadraticCurveTo(x, z, x - radius, z);
    path.lineTo(-x + radius, z);
    path.quadraticCurveTo(x * -1, z, -x, z - radius);
    path.lineTo(-x, -z + radius);
    path.quadraticCurveTo(-x, -z, -x + radius, -z);
    path.closePath();
    return path;
  };

  const slabGeometry = (width: number, depth: number, height: number, radius: number, rim = 0) => {
    const shape = roundRect(new Shape(), width, depth, radius);
    if (rim > 0) {
      shape.holes.push(roundRect(new Path(), width - rim * 2, depth - rim * 2, radius * 0.55));
    }
    const geometry = new ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: true,
      bevelThickness: 0.009,
      bevelSize: 0.012,
      bevelSegments: 2,
      curveSegments: 6,
      steps: 1,
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  };

  const outline = (width: number, depth: number, radius: number, y: number, dark = false) => {
    const points = roundRect(new Path(), width, depth, radius)
      .getPoints(6)
      .map((point) => new Vector3(point.x, y, -point.y));
    return new LineLoop(new BufferGeometry().setFromPoints(points), dark ? darkEdgeMaterial : edgeMaterial);
  };

  const addSlab = (
    target: Group,
    width: number,
    depth: number,
    height: number,
    material: MeshStandardMaterial,
    x: number,
    y: number,
    z: number,
    radius = 0.07,
    rim = 0,
  ) => {
    const mesh = new Mesh(slabGeometry(width, depth, height, radius, rim), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    target.add(mesh);
    return mesh;
  };

  const layers = [new Group(), new Group(), new Group()];
  layers.forEach((layer, index) => {
    layer.name = ['Données', 'Application', 'Équipe'][index];
    group.add(layer);
    addSlab(layer, 2.74, 2.34, 0.065, paper, 0, 0, 0, 0.17, index === 0 ? 0 : 0.17);
    layer.add(outline(2.74, 2.34, 0.17, 0.043, true));
    if (index > 0) layer.add(outline(2.4, 2, 0.094, 0.043));
  });

  // Equal rows make the foundation read as structured records rather than debris.
  for (let row = 0; row < 3; row += 1) {
    const z = (row - 1) * 0.56;
    addSlab(layers[0], 1.56, 0.34, 0.07, paper, -0.12, 0.096, z, 0.035);
    const recordEdge = outline(1.56, 0.34, 0.035, 0.044);
    recordEdge.position.set(-0.12, 0.096, z);
    layers[0].add(recordEdge);
    addSlab(layers[0], 0.16, 0.16, 0.07, row === 1 ? lime : charcoal, 0.86, 0.096, z, 0.024);
  }

  // Two fitted application modules bridge the open middle frame.
  addSlab(layers[1], 2.48, 0.085, 0.045, charcoal, 0, 0.052, -0.58, 0.02);
  addSlab(layers[1], 2.48, 0.085, 0.045, charcoal, 0, 0.052, 0.43, 0.02);
  addSlab(layers[1], 1.05, 1.28, 0.19, lime, -0.47, 0.138, -0.08, 0.09);
  addSlab(layers[1], 0.68, 1.28, 0.12, paper, 0.49, 0.102, -0.08, 0.07);
  const moduleOutline = outline(0.68, 1.28, 0.07, 0.07);
  moduleOutline.position.set(0.49, 0.102, -0.08);
  layers[1].add(moduleOutline);
  addSlab(layers[1], 0.74, 0.075, 0.026, charcoal, -0.47, 0.251, 0.25, 0.017);
  addSlab(layers[1], 0.74, 0.075, 0.026, charcoal, -0.47, 0.251, 0.05, 0.017);

  // Three equal access points share one rail, preserving a clear team metaphor.
  addSlab(layers[2], 2.48, 0.1, 0.05, charcoal, 0, 0.082, 0.24, 0.025);
  for (let seat = 0; seat < 3; seat += 1) {
    const x = (seat - 1) * 0.72;
    addSlab(layers[2], 0.075, 0.52, 0.04, charcoal, x, 0.081, -0.04, 0.018);
    addSlab(layers[2], 0.45, 0.45, 0.18, seat === 1 ? lime : paper, x, 0.162, -0.32, 0.06);
    const seatOutline = outline(0.45, 0.45, 0.06, 0.101, seat !== 1);
    seatOutline.position.set(x, 0.162, -0.32);
    layers[2].add(seatOutline);
  }

  const connectorGeometry = new CylinderGeometry(0.021, 0.021, 1, 8);
  const sockets = [[-1.15, -0.94], [1.15, -0.94], [1.15, 0.94]] as const;
  const connectors: { mesh: Mesh; gap: number; x: number; z: number }[] = [];
  for (let gap = 0; gap < 2; gap += 1) {
    sockets.forEach(([x, z]) => {
      const mesh = new Mesh(connectorGeometry, charcoal);
      mesh.castShadow = true;
      group.add(mesh);
      connectors.push({ mesh, gap, x, z });
    });
  }

  const labels = layers.map((layer, index) => {
    const anchor = new Object3D();
    anchor.position.set(index === 1 ? 1.51 : -1.51, 0.12, 0.45);
    layer.add(anchor);
    return { text: layer.name, anchor, accent: index === 1 };
  });

  const from = new Vector3();
  const to = new Vector3();
  const direction = new Vector3();
  const up = new Vector3(0, 1, 0);
  const update = (time: number, progress: number) => {
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const assembly = clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
    const spread = 1 - assembly;
    group.rotation.y = Math.sin(time * 0.18) * 0.026;
    for (let index = 0; index < layers.length; index += 1) {
      const level = index - 1;
      layers[index].position.set(
        level * 0.26 * spread,
        level * (0.62 + 0.58 * spread) - 0.08,
        level * -0.12 * spread,
      );
    }
    for (const connector of connectors) {
      from.copy(layers[connector.gap].position);
      from.x += connector.x;
      from.y += 0.041;
      from.z += connector.z;
      to.copy(layers[connector.gap + 1].position);
      to.x += connector.x;
      to.y -= 0.041;
      to.z += connector.z;
      direction.subVectors(to, from);
      connector.mesh.scale.y = direction.length();
      connector.mesh.position.copy(from).add(to).multiplyScalar(0.5);
      connector.mesh.quaternion.setFromUnitVectors(up, direction.normalize());
    }
  };

  update(0, 0);
  return { group, labels, update };
};
