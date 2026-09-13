import type { Group, Object3D } from 'three';

export interface ScenePalette {
  lime: string;
  paper: string;
  muted: string;
  dark: string;
}

export interface SceneLabel {
  text: string;
  anchor: Object3D;
  accent?: boolean;
  /** Optional opacity for labels that crossfade with their scene's progression. */
  opacity?: number;
}

export interface LabScene {
  group: Group;
  labels: SceneLabel[];
  /** Seconds advance only while playback is enabled. Progress is a 0–1 transition. */
  update: (time: number, progress: number) => void;
}

export type SceneFactory = (palette: ScenePalette) => LabScene;
