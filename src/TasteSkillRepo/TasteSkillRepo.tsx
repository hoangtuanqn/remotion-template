import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { SfxCue, SfxTrack } from "../sfx/SfxTrack";
import { audioManifest } from "./audioData";
import { sceneCaptions } from "./captions";
import { Backdrop } from "./components/Backdrop";
import { BrandHeader } from "./components/BrandHeader";
import { SceneProps } from "./components/SceneShell";
import { sceneReveals } from "./reveals";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Pain } from "./scenes/Scene2Pain";
import { Scene3Intro } from "./scenes/Scene3Intro";
import { Scene4Result } from "./scenes/Scene4Result";
import { Scene5Classify } from "./scenes/Scene5Classify";
import { Scene6Hero } from "./scenes/Scene6Hero";
import { Scene7Browser } from "./scenes/Scene7Browser";
import { Scene8Effects } from "./scenes/Scene8Effects";
import { Scene9Outro } from "./scenes/Scene9Outro";
import { accent, cyan } from "./theme";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";

// The manifest adds 10 padding frames per scene; keep 3 after speech for a snappy cut.
const PADDING_FRAMES = 10;
const BUFFER_FRAMES = 3;
const OUTRO_HOLD_FRAMES = 40;
const SCENE_SOUND_LEAD_FRAMES = 3;
const lastIndex = audioManifest.scenes.length - 1;

const sceneDurations = audioManifest.scenes.map((scene, i) => scene.durationInFrames - PADDING_FRAMES + BUFFER_FRAMES + (i === lastIndex ? OUTRO_HOLD_FRAMES : 0));
export const tasteSkillRepoDuration = sceneDurations.reduce((sum: number, frames) => sum + frames, 0);

const sceneComponents: React.FC<SceneProps>[] = [Scene1Hook, Scene2Pain, Scene3Intro, Scene4Result, Scene5Classify, Scene6Hero, Scene7Browser, Scene8Effects, Scene9Outro];

let sceneStart = 0;
const sfxCues: SfxCue[] = audioManifest.scenes.flatMap((scene, i) => {
  const start = sceneStart;
  sceneStart += sceneDurations[i];
  const speechFrames = scene.durationInFrames - PADDING_FRAMES;
  return [{ frame: Math.max(0, start - SCENE_SOUND_LEAD_FRAMES), sound: "mallet" as const }, ...sceneReveals[i].map(([share, sound]) => ({ frame: start + Math.round(speechFrames * share), sound }))];
});

export const TasteSkillRepo: React.FC<{ channelName: string }> = () => {
  useVietnameseFont();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#04080f", color: "#f3f7ff", fontFamily: vietnameseFontFamily, whiteSpace: "pre-line" }}>
      <Backdrop />
      <SfxTrack cues={sfxCues} />
      <BrandHeader />
      <Series>
        {audioManifest.scenes.map((scene, i) => {
          const Scene = sceneComponents[i];
          return (
            <Series.Sequence key={scene.id} durationInFrames={sceneDurations[i]}>
              <Scene caption={sceneCaptions[i]} audioPath={scene.audioPath} duration={sceneDurations[i]} speechFrames={scene.durationInFrames - PADDING_FRAMES} />
            </Series.Sequence>
          );
        })}
      </Series>
      <div style={{ position: "absolute", top: 0, left: 0, width: `${(frame / tasteSkillRepoDuration) * 100}%`, height: 8, background: `linear-gradient(90deg, ${accent}, ${cyan})` }} />
    </AbsoluteFill>
  );
};
