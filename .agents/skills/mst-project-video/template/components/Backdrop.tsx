import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Deep navy with two slow-drifting blue glows (top-left, bottom-right), like the reference reel.
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 40;
  return (
    <AbsoluteFill style={{ background: "#040a18" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 45% 60% at ${12 + drift / 20}% 6%, #1b45d9b0 0%, transparent 70%), radial-gradient(ellipse 40% 55% at ${92 - drift / 20}% 98%, #0a8fd0a0 0%, transparent 70%)` }} />
    </AbsoluteFill>
  );
};
