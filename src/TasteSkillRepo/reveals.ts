import { SfxName } from "../sfx/SfxTrack";

// Share of the speech already read when an item appears, plus its sound. Scene and item indexes count from 0.
export const sceneReveals: [number, SfxName][][] = [
  [],
  [[0.3, "pop"], [0.42, "pop"], [0.56, "pop"], [0.66, "pop"]],
  [[0.1, "tick"], [0.45, "pop"], [0.8, "ding"]],
  [[0.17, "pop"], [0.26, "pop"], [0.78, "pop"]],
  [[0.08, "tick"], [0.3, "pop"], [0.4, "pop"], [0.62, "ding"]],
  [[0.08, "ding"], [0.3, "tick"], [0.55, "pop"], [0.7, "pop"], [0.82, "pop"]],
  [[0.1, "pop"], [0.25, "pop"], [0.35, "pop"], [0.45, "pop"], [0.6, "ding"], [0.8, "pop"]],
  [[0.08, "pop"], [0.28, "ding"], [0.5, "pop"], [0.75, "pop"]],
  [[0.06, "tick"], [0.2, "tick"], [0.32, "pop"], [0.52, "chime"], [0.8, "ding"], [0.9, "ding"]],
];

export const revealDelay = (sceneIndex: number, itemIndex: number, speechFrames: number) => Math.round(speechFrames * sceneReveals[sceneIndex][itemIndex][0]);
