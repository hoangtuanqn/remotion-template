import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandHeader } from "./BrandHeader";
import { SubtitleBox } from "./SubtitleBox";

export type SceneProps = { caption: string; audioPath: string; duration: number; speechFrames: number; channelName?: string };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// `slide` scenes get the logo top-left and a centred content area; browser-frame scenes pass slide={false} and place their own frame.
export const SceneShell: React.FC<SceneProps & { label: string; children: React.ReactNode; animateIn?: boolean; slide?: boolean }> = ({ label, caption, audioPath, duration, speechFrames, children, animateIn = true, slide = true, channelName = "MST SOFTWARE" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Platforms use the first frame as the thumbnail, so the opening scene starts fully visible.
  const enter = animateIn ? spring({ frame, fps, config: { damping: 16, stiffness: 120 } }) : 1;
  const opacity = interpolate(frame, [duration - 6, duration], [1, 0], clamp);
  // Slow push-in keeps a still layout from feeling frozen.
  const push = interpolate(frame, [0, duration], [1, 1.03], clamp);
  const sweep = interpolate(frame, [0, 14], [-500, 2300], clamp);
  return (
    <AbsoluteFill style={{ opacity }}>
      <Audio src={staticFile(audioPath)} />
      {slide ? <BrandHeader channelName={channelName} /> : null}
      <div style={{ position: "absolute", top: 56, right: 100, display: "flex", alignItems: "center", gap: 14, whiteSpace: "nowrap", fontSize: 30, fontWeight: 800, padding: "12px 30px", borderRadius: 999, background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.15)", opacity: slide ? enter : 0 }}>
        {label}
      </div>
      {slide ? (
        <div style={{ position: "absolute", left: 120, right: 120, top: 150, height: 700, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, opacity: enter, translate: `0 ${(1 - enter) * 30}px`, scale: String(push) }}>{children}</div>
      ) : (
        <AbsoluteFill style={{ opacity: enter }}>{children}</AbsoluteFill>
      )}
      <SubtitleBox caption={caption} speechFrames={speechFrames} audioPath={audioPath} />
      {animateIn ? <div style={{ position: "absolute", top: 0, bottom: 0, width: 300, left: sweep, transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(56,163,255,0.28), transparent)" }} /> : null}
    </AbsoluteFill>
  );
};

// Springs with a little overshoot, so items snap in instead of fading politely. `fromX` slides them in from the side.
export const Reveal: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties; fromX?: number }> = ({ delay, children, style, fromX = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 150 } });
  return <div style={{ ...style, opacity: Math.min(1, p * 1.6), translate: `${(1 - p) * fromX}px ${(1 - p) * 50}px`, scale: String(0.92 + 0.08 * p) }}>{children}</div>;
};
