import { SfxName } from "../sfx/SfxTrack";

// Share of the speech already read when an item appears, plus its sound. Scene and item indexes count from 0.
export const sceneReveals: [number, SfxName][][] = [
  [],
  [[0.4, "pop"], [0.7, "pop"]],
  [[0.12, "tick"], [0.75, "pop"]],
  [[0.2, "tick"], [0.27, "tick"], [0.34, "tick"], [0.4, "tick"], [0.46, "tick"], [0.54, "tick"], [0.6, "tick"], [0.76, "ding"]],
  [[0.28, "pop"], [0.55, "pop"]],
  [[0.08, "tick"], [0.32, "pop"], [0.42, "pop"], [0.52, "pop"], [0.62, "pop"]],
  [[0.08, "tick"], [0.2, "pop"], [0.3, "ding"], [0.42, "pop"], [0.72, "pop"]],
  [[0.06, "tick"], [0.15, "pop"], [0.4, "pop"], [0.68, "pop"], [0.84, "pop"]],
  [[0.06, "pop"], [0.4, "pop"], [0.5, "ding"], [0.72, "pop"]],
  [[0.06, "tick"], [0.38, "tick"], [0.6, "ding"], [0.74, "pop"], [0.88, "chime"]],
];

export const revealDelay = (sceneIndex: number, itemIndex: number, speechFrames: number) => Math.round(speechFrames * sceneReveals[sceneIndex][itemIndex][0]);
