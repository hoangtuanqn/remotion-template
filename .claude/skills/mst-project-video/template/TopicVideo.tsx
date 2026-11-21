import React from "react";
import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { SfxCue, SfxTrack } from "../sfx/SfxTrack";
import { audioManifest } from "./audioData";
import { sceneCaptions } from "./captions";
import { Backdrop } from "./components/Backdrop";
import { DemoStage, Focus } from "./components/DemoStage";
import { sceneReveals } from "./reveals";
import { scenes as sceneComponents } from "./scenes/Scenes";
import { accent, cyan } from "./theme";
import { useVietnameseFont, vietnameseFontFamily } from "./useVietnameseFont";

// The manifest adds 10 padding frames per scene; keep 3 after speech for a snappy cut.
const PADDING_FRAMES = 10;
const BUFFER_FRAMES = 3;
const OUTRO_HOLD_FRAMES = 40;
const SCENE_SOUND_LEAD_FRAMES = 3;
const lastIndex = audioManifest.scenes.length - 1;

const sceneDurations = audioManifest.scenes.map((scene, i) => scene.durationInFrames - PADDING_FRAMES + BUFFER_FRAMES + (i === lastIndex ? OUTRO_HOLD_FRAMES : 0));
// Camera aim per demo scene: [x, y, zoom], x/y in viewport pixels (1540 wide), one entry per scene of the recording. Zoom 1.14-1.18 keeps the
// footage covering the frame. Aim at what the narration talks about (search box, table, chart); look at a frame of the flow video to pick x/y.
const CLIENT_FOCUS: Focus[] = [[640, 300, 1.16]];

export const topicVideoDuration = sceneDurations.reduce((sum: number, frames) => sum + frames, 0);

// Start frame of every scene, plus the end of the last one (DemoStage lays one continuous recording over a run of scenes).
const sceneStarts: number[] = [];
sceneDurations.reduce((sum: number, frames) => {
  sceneStarts.push(sum);
  return sum + frames;
}, 0);
sceneStarts.push(topicVideoDuration);
const STAGE_OVERLAP = 10;

let sceneStart = 0;
const sfxCues: SfxCue[] = audioManifest.scenes.flatMap((scene, i) => {
  const start = sceneStart;
  sceneStart += sceneDurations[i];
  const speechFrames = scene.durationInFrames - PADDING_FRAMES;
  return [{ frame: Math.max(0, start - SCENE_SOUND_LEAD_FRAMES), sound: "mallet" as const }, ...sceneReveals[i].map(([share, sound]) => ({ frame: start + Math.round(speechFrames * share), sound }))];
});

export const TopicVideo: React.FC<{ channelName: string }> = ({ channelName }) => {
  useVietnameseFont();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ color: "#f2f6ff", fontFamily: vietnameseFontFamily, whiteSpace: "pre-line" }}>
      <Backdrop />
      <SfxTrack cues={sfxCues} />
      {/* One recording across the demo scenes (indices first..last; 1..1 here). The scenes on top only add callouts and subtitles.
          With a second recording (e.g. admin), add `crossOut` here and a second DemoStage with `crossIn`, first/last after this one's, its own FOCUS array. */}
      <DemoStage title="Website demo · tên-miền.vn" src="content/TopicVideo/client_flow.mp4" starts={sceneStarts} first={1} last={1} overlap={STAGE_OVERLAP} focus={CLIENT_FOCUS} intro />
      <Series>
        {audioManifest.scenes.map((scene, i) => {
          const Scene = sceneComponents[i];
          return (
            <Series.Sequence key={scene.id} durationInFrames={sceneDurations[i]}>
              <Scene caption={sceneCaptions[i]} audioPath={scene.audioPath} duration={sceneDurations[i]} speechFrames={scene.durationInFrames - PADDING_FRAMES} channelName={channelName} />
            </Series.Sequence>
          );
        })}
      </Series>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, background: "rgba(255,255,255,0.1)" }}>
        <div style={{ width: `${(frame / topicVideoDuration) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${accent}, ${cyan})` }} />
      </div>
    </AbsoluteFill>
  );
};
