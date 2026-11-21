import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { cyan } from "../theme";
import { SubtitleBox } from "./SubtitleBox";

export type SceneProps = { caption: string; audioPath: string; duration: number; speechFrames: number };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const SceneShell: React.FC<SceneProps & { label: string; children: React.ReactNode; animateIn?: boolean }> = ({ label, caption, audioPath, duration, speechFrames, children, animateIn = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = animateIn ? spring({ frame, fps, config: { damping: 20 } }) : 1;
  const opacity = interpolate(frame, [duration - 6, duration], [1, 0], clamp);
  const zoom = interpolate(frame, [0, duration], [1, 1.035], clamp);
  const sweep = interpolate(frame, [0, 14], [-700, 1400], clamp);
  return (
    <AbsoluteFill style={{ opacity }}>
      <Audio src={staticFile(audioPath)} />
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ whiteSpace: "nowrap", fontSize: 28, fontWeight: 800, letterSpacing: 3, color: cyan, padding: "10px 30px", borderRadius: 999, border: `2px solid ${cyan}66`, background: "#0a1a26" }}>{label}</div>
      </div>
      <div style={{ position: "absolute", left: 88, right: 88, top: 380, height: 1090, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, scale: String(zoom), translate: `0 ${(1 - enter) * 30}px`, opacity: enter }}>{children}</div>
      <SubtitleBox caption={caption} speechFrames={speechFrames} />
      {frame < 14 && <div style={{ position: "absolute", top: -200, bottom: -200, left: sweep, width: 220, rotate: "18deg", background: "linear-gradient(90deg, transparent, #ffffff30, transparent)" }} />}
    </AbsoluteFill>
  );
};

export const Reveal: React.FC<{ delay: number; fromX?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, fromX = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 150 } });
  const o = interpolate(p, [0, 0.4], [0, 1], clamp);
  return <div style={{ ...style, opacity: o, scale: String(0.92 + 0.08 * p), translate: `${(1 - p) * fromX}px ${(1 - p) * 45}px` }}>{children}</div>;
};
