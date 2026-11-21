import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

// Types text out one character at a time. The unrevealed tail stays in the layout (invisible) so lines never reflow.
export const Typewriter: React.FC<{ text: string; delay: number; charsPerFrame?: number }> = ({ text, delay, charsPerFrame = 1.1 }) => {
  const frame = useCurrentFrame();
  const shown = Math.max(0, Math.min(text.length, Math.floor((frame - delay) * charsPerFrame)));
  return (
    <>
      <span>{text.slice(0, shown)}</span>
      <span style={{ opacity: 0 }}>{text.slice(shown)}</span>
    </>
  );
};

// Counts from 0 up to `to`, easing out so the last numbers land slowly.
export const CountUp: React.FC<{ to: number; delay: number; frames?: number }> = ({ to, delay, frames = 30 }) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [delay, delay + frames], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return <>{Math.round(value).toLocaleString("vi-VN")}</>;
};
