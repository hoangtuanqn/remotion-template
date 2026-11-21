import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Typed text keeps its full width (untyped part is transparent) so lines never reflow.
export const Typewriter: React.FC<{ text: string; start?: number; charsPerFrame?: number }> = ({ text, start = 0, charsPerFrame = 1 }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) * charsPerFrame)));
  return (
    <>
      {text.slice(0, n)}
      <span style={{ opacity: 0 }}>{text.slice(n)}</span>
    </>
  );
};

// Counts from 0 and slows near the end.
export const CountUp: React.FC<{ to: number; start?: number; duration?: number; format?: (n: number) => string }> = ({ to, start = 0, duration = 40, format }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + duration], [0, 1], clamp);
  const v = Math.round(to * (1 - Math.pow(1 - t, 3)));
  return <>{format ? format(v) : v}</>;
};
