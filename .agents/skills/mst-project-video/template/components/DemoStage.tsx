import React from "react";
import { Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame, FRAME_W, VIEW_H, VideoShot } from "./BrowserFrame";

// One continuous recording shown in the browser frame across several scenes. The frame never fades between scenes:
// the scenes on top only change the callout and the subtitle, so the footage plays straight through.

// Camera focus per scene (cursor-flyover idea): x/y are viewport pixels the camera aims at, s is the zoom.
export type Focus = [x: number, y: number, s: number];

const FLY = 22; // frames to fly from one focus to the next
const flyEase = Easing.bezier(0.55, 0, 0.18, 1); // firm start, very soft landing

// Camera at `frame`: fly to the scene's focus right after the scene starts, then creep in a little while it plays.
const camera = (frame: number, keys: { t: number; focus: Focus }[]) => {
  let i = 0;
  while (i + 1 < keys.length && frame >= keys[i + 1].t) i++;
  const cur = keys[i];
  const prev: Focus = i === 0 ? [FRAME_W / 2, VIEW_H / 2, 1] : keys[i - 1].focus;
  const u = flyEase(Math.min(1, Math.max(0, (frame - cur.t) / FLY)));
  const end = i + 1 < keys.length ? keys[i + 1].t : cur.t + FLY * 6;
  const creep = interpolate(frame, [cur.t + FLY, end], [0, 0.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = prev[0] + (cur.focus[0] - prev[0]) * u;
  const y = prev[1] + (cur.focus[1] - prev[1]) * u;
  const s = prev[2] + (cur.focus[2] - prev[2]) * u + creep;
  // Keep the zoomed footage covering the viewport: no empty edges.
  const tx = Math.min(0, Math.max(FRAME_W - FRAME_W * s, FRAME_W / 2 - x * s));
  const ty = Math.min(0, Math.max(VIEW_H - VIEW_H * s, VIEW_H / 2 - y * s));
  return { tx, ty, s };
};

const Stage: React.FC<{ title: string; src: string; keys: { t: number; focus: Focus }[]; intro?: boolean; fadeIn?: number; fadeOut?: number }> = ({ title, src, keys, intro, fadeIn = 0, fadeOut = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = intro ? spring({ frame, fps, config: { damping: 16, stiffness: 110 } }) : 1;
  const inFade = fadeIn ? interpolate(frame, [0, fadeIn], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const outFade = fadeOut ? interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const cam = camera(frame, keys);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(inFade, outFade, enter * 1.4), scale: String(0.94 + 0.06 * enter), translate: `0 ${(1 - enter) * 40}px` }}>
      <BrowserFrame title={title}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "0 0", transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})` }}>
          <VideoShot src={src} fromSec={0} />
        </div>
      </BrowserFrame>
    </div>
  );
};

// Places a Stage over scenes [first, last] (indices into `starts`, the start frame of each scene). A following stage fades in over `overlap`
// frames while this one fades out, so switching recordings is a short crossfade. `focus` has one entry per scene in [first, last].
export const DemoStage: React.FC<{ title: string; src: string; starts: number[]; first: number; last: number; overlap: number; focus: Focus[]; intro?: boolean; crossIn?: boolean; crossOut?: boolean }> = ({ title, src, starts, first, last, overlap, focus, intro, crossIn, crossOut }) => {
  const from = starts[first];
  const to = starts[last + 1];
  const keys = focus.map((f, i) => ({ t: starts[first + i] - from + 4, focus: f }));
  return (
    <Sequence from={from} durationInFrames={to - from + (crossOut ? overlap : 0)} layout="none">
      <Stage title={title} src={src} keys={keys} intro={intro} fadeIn={crossIn ? overlap : 0} fadeOut={crossOut ? overlap : 8} />
    </Sequence>
  );
};
