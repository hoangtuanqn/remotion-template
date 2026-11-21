import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

const particles = Array.from({ length: 40 }, (_, i) => ({
  x: random(`x${i}`) * 1080,
  y: random(`y${i}`) * 1920,
  size: 3 + random(`s${i}`) * 5,
  speed: 0.15 + random(`v${i}`) * 0.35,
  alpha: 0.15 + random(`a${i}`) * 0.4,
}));

export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 35% at 50% 0%, #0f3a7a55, transparent 70%), radial-gradient(ellipse 80% 35% at 50% 100%, #0c5a6a55, transparent 70%), #04080f" }}>
      {particles.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: p.x, top: (((p.y - frame * p.speed) % 1920) + 1920) % 1920, width: p.size, height: p.size, borderRadius: "50%", background: "#9cc6ff", opacity: p.alpha }} />
      ))}
    </AbsoluteFill>
  );
};
