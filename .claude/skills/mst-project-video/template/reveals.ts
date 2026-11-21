import { SfxName } from "../sfx/SfxTrack";

// One row per scene; each entry is [share of the narration already spoken, sound]. The picture and the sound both read this table,
// so they stay in step when the voice is regenerated. Scene 1 stays empty: everything is on screen from frame 0.
// The first share of every other scene must be 0.05 or more, or SfxTrack drops it as too close to the scene-start "mallet".
// Each row must have as many entries as the scene has Reveal/Callout items.
export const sceneReveals: [number, SfxName][][] = [
  [],
  [[0.2, "pop"]], // demo scene: one callout
  [[0.1, "pop"], [0.45, "ding"]], // reference page: two items
  [[0.1, "ding"], [0.4, "pop"], [0.78, "chime"]], // outro: three items
];

// sceneIndex and itemIndex both count from 0.
export const revealDelay = (sceneIndex: number, itemIndex: number, speechFrames: number) => Math.round(speechFrames * sceneReveals[sceneIndex][itemIndex][0]);
