import { SfxName } from "../sfx/SfxTrack";

// Share of the speech already read when an item appears, plus its sound. Scene and item indexes count from 0.
export const sceneReveals: [number, SfxName][][] = [
  [],
  [[0.12, "pop"], [0.48, "pop"], [0.58, "pop"], [0.68, "pop"], [0.78, "pop"]],
  [[0.1, "pop"], [0.32, "pop"], [0.78, "ding"]],
  [[0.1, "tick"], [0.5, "pop"], [0.8, "ding"]],
  [[0.1, "pop"], [0.55, "pop"]],
  [[0.18, "pop"], [0.42, "pop"], [0.5, "pop"], [0.58, "pop"], [0.66, "pop"], [0.76, "pop"], [0.86, "pop"]],
  [[0.06, "tick"], [0.36, "pop"], [0.52, "pop"], [0.74, "tick"], [0.88, "ding"]],
  [[0.08, "pop"], [0.2, "pop"], [0.55, "tick"], [0.84, "ding"]],
  [[0.14, "tick"], [0.6, "pop"], [0.68, "pop"], [0.76, "pop"], [0.86, "pop"], [0.93, "ding"]],
  [[0.08, "pop"], [0.5, "tick"], [0.57, "tick"], [0.64, "tick"], [0.85, "ding"]],
  [[0.17, "tick"], [0.33, "tick"], [0.48, "tick"], [0.62, "ding"], [0.8, "tick"]],
  [[0.06, "tick"], [0.7, "ding"], [0.86, "chime"]],
];

export const revealDelay = (sceneIndex: number, itemIndex: number, speechFrames: number) => Math.round(speechFrames * sceneReveals[sceneIndex][itemIndex][0]);
