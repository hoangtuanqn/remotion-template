import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { SfxCue, SfxTrack } from "../sfx/SfxTrack";
import { audioManifest } from "./audioData";
import { sceneCaptions } from "./captions";
import { Backdrop } from "./components/Backdrop";
import { BrandHeader } from "./components/BrandHeader";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Replay } from "./scenes/Scene2Replay";
import { Scene3Forgery } from "./scenes/Scene3Forgery";
import { Scene4Hmac } from "./scenes/Scene4Hmac";
import { Scene4Https } from "./scenes/Scene4Https";
import { Scene5Danger } from "./scenes/Scene5Danger";
import { Scene6Nonce } from "./scenes/Scene6Nonce";
import { Scene7Idempotency } from "./scenes/Scene7Idempotency";
import { Scene8Combine } from "./scenes/Scene8Combine";
import { Scene10Jwt } from "./scenes/Scene10Jwt";
import { Scene11Summary } from "./scenes/Scene11Summary";
import { Scene9Outro } from "./scenes/Scene9Outro";
import { SceneProps } from "./components/SceneShell";
import { sceneReveals } from "./reveals";
import { accent, cyan } from "./theme";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";

// The manifest adds 10 padding frames per scene; keep 3 after speech for a snappy cut.
const PADDING_FRAMES = 10;
const BUFFER_FRAMES = 3;
const OUTRO_HOLD_FRAMES = 60;
const SCENE_SOUND_LEAD_FRAMES = 3;
const lastIndex = audioManifest.scenes.length - 1;

const sceneDurations = audioManifest.scenes.map((scene, i) => scene.durationInFrames - PADDING_FRAMES + BUFFER_FRAMES + (i === lastIndex ? OUTRO_HOLD_FRAMES : 0));
export const replayAttackDuration = sceneDurations.reduce((sum: number, frames) => sum + frames, 0);

const sceneComponents: React.FC<SceneProps>[] = [Scene1Hook, Scene2Replay, Scene3Forgery, Scene4Hmac, Scene4Https, Scene5Danger, Scene6Nonce, Scene7Idempotency, Scene8Combine, Scene10Jwt, Scene11Summary, Scene9Outro];

let sceneStart = 0;
const sfxCues: SfxCue[] = audioManifest.scenes.flatMap((scene, i) => {
  const start = sceneStart;
  sceneStart += sceneDurations[i];
  const speechFrames = scene.durationInFrames - PADDING_FRAMES;
  return [{ frame: Math.max(0, start - SCENE_SOUND_LEAD_FRAMES), sound: "mallet" as const }, ...sceneReveals[i].map(([share, sound]) => ({ frame: start + Math.round(speechFrames * share), sound }))];
});

export const ReplayAttack: React.FC<{ channelName: string }> = () => {
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
      <div style={{ position: "absolute", top: 0, left: 0, width: `${(frame / replayAttackDuration) * 100}%`, height: 8, background: `linear-gradient(90deg, ${accent}, ${cyan})` }} />
    </AbsoluteFill>
  );
};
