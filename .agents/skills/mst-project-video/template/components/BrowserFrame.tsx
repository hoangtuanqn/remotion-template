import React from "react";
import { Easing, Freeze, Img, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { muted } from "../theme";
import { Reveal } from "./SceneShell";

// The product is shown as a screen recording inside a macOS-style window, like the reference reel.
// The frame is 1540px wide at left 190: a 40px title bar plus a viewport that takes the recording's aspect ratio, so nothing is cropped.
// Set SOURCE_W/SOURCE_H to the recording's pixel size (16:9 gives a 1540x840 viewport; wider recordings give a shorter one).
// The frame is centred in the 840px band that starts at top 64, and the subtitle (top 880) sits just below or over the bottom fade.
export const FRAME_W = 1540;
export const SOURCE_W = 1920;
export const SOURCE_H = 1080;
export const VIEW_H = Math.min(840, Math.round((FRAME_W * SOURCE_H) / SOURCE_W));
export const FRAME_TOP = 64 + Math.round((840 - VIEW_H) / 2);
const TITLE_H = 40;
// Fade at the bottom of the viewport so the subtitle reads over it. A short viewport leaves the subtitle below the frame, so the fade shrinks.
const FADE_H = VIEW_H >= 800 ? 180 : 50;

export const BrowserFrame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ position: "absolute", left: 190, top: FRAME_TOP, width: FRAME_W, height: TITLE_H + VIEW_H, borderRadius: 20, overflow: "hidden", background: "#0b1224", boxShadow: "0 30px 90px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.1)" }}>
    <div style={{ height: TITLE_H, display: "flex", alignItems: "center", padding: "0 18px", gap: 10, background: "#0e1730" }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
        <div key={color} style={{ width: 14, height: 14, borderRadius: 7, background: color }} />
      ))}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 28px", borderRadius: 10, background: "rgba(255,255,255,0.07)", fontSize: 20, fontWeight: 600, color: "#e6edf7", whiteSpace: "nowrap" }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: "#28c840" }} />
          {title}
        </div>
      </div>
      <Img src={staticFile("brand/logo-white.png")} style={{ height: 26 }} />
    </div>
    <div style={{ position: "relative", width: FRAME_W, height: VIEW_H, overflow: "hidden", background: "#fff" }}>
      {children}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: FADE_H, background: "linear-gradient(transparent, rgba(4,10,24,0.9))" }} />
    </div>
  </div>
);

// The user's own screen recording inside the viewport (preferred). It plays from `fromSec` at `rate` (1 = normal; 0.5-1.7 works well).
// With `toSec` the slice stops there and the last frame holds for the rest of the scene, so a short slice can sit under a long narration.
// Pick rate = (toSec - fromSec) * fps / sceneFrames to make the slice fill the scene exactly.
export const VideoShot: React.FC<{ src: string; fromSec: number; toSec?: number; rate?: number }> = ({ src, fromSec, toSec, rate = 1 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const playFrames = toSec === undefined ? Infinity : Math.round(((toSec - fromSec) * fps) / rate);
  const video = <OffthreadVideo src={staticFile(src)} startFrom={Math.round(fromSec * fps)} playbackRate={rate} muted style={{ position: "absolute", left: 0, top: 0, width: FRAME_W, height: VIEW_H, objectFit: "cover" }} />;
  return frame >= playFrames ? <Freeze frame={playFrames - 1}>{video}</Freeze> : video;
};

// A tall screenshot scrolled inside the viewport (fallback when there is no recording). `from`/`to` are offsets in the source image's own pixels (0 = top);
// keep `to + VIEW_H / (FRAME_W / imgWidth)` within `imgHeight` so the scroll never runs past the image.
export const ScrollShot: React.FC<{ src: string; imgWidth: number; imgHeight: number; from: number; to: number; start?: number; end: number }> = ({ src, imgWidth, imgHeight, from, to, start = 0, end }) => {
  const frame = useCurrentFrame();
  const scale = FRAME_W / imgWidth;
  const top = interpolate(frame, [start, end], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) * scale;
  return <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: -top, width: FRAME_W, height: imgHeight * scale, maxWidth: "none" }} />;
};

// Mouse pointer following waypoints (viewport pixels, frames strictly increasing). A point with `click` shows a ripple.
export type CursorPoint = { frame: number; x: number; y: number; click?: boolean };
export const Cursor: React.FC<{ path: CursorPoint[] }> = ({ path }) => {
  const frame = useCurrentFrame();
  const frames = path.map((p) => p.frame);
  const ease = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) } as const;
  const x = interpolate(frame, frames, path.map((p) => p.x), ease);
  const y = interpolate(frame, frames, path.map((p) => p.y), ease);
  const click = path.find((p) => p.click && frame >= p.frame && frame < p.frame + 14);
  const t = click ? (frame - click.frame) / 14 : 0;
  return (
    <div style={{ position: "absolute", left: 190, top: FRAME_TOP + TITLE_H, width: FRAME_W, height: VIEW_H, overflow: "hidden", pointerEvents: "none" }}>
      {click ? <div style={{ position: "absolute", left: click.x - 36, top: click.y - 36, width: 72, height: 72, borderRadius: 36, border: "4px solid #38a3ff", opacity: 1 - t, scale: String(0.3 + 0.7 * t) }} /> : null}
      <svg width="34" height="40" viewBox="0 0 34 40" style={{ position: "absolute", left: x, top: y, filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.5))" }}>
        <path d="M2 2 L2 32 L10 25 L16 38 L22 35 L16 23 L27 23 Z" fill="#fff" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// Flat dark callout at the bottom-right of the frame: orange side bar, bold title with a highlighter stroke, muted keyword line (>=32px).
export const Callout: React.FC<{ title: string; sub: string; delay: number }> = ({ title, sub, delay }) => {
  const frame = useCurrentFrame();
  const stroke = interpolate(frame, [delay + 8, delay + 24], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.8, 0.2, 1) });
  // The card lands like it was hovering above the page: its shadow starts wide, soft and offset, then tightens as it touches down.
  const fall = interpolate(frame, [delay, delay + 18], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <Reveal delay={delay} fromX={80} style={{ position: "absolute", left: 1090, top: FRAME_TOP + TITLE_H + VIEW_H - 150, width: 640, padding: "16px 28px 16px 26px", borderRadius: 8, background: "#0a1430", borderLeft: "10px solid #ff8a1f", boxShadow: `0 ${14 + fall * 46}px ${34 + fall * 60}px rgba(0,0,0,${0.5 - fall * 0.2})` }}>
      <div style={{ position: "relative", display: "inline-block", fontSize: 42, fontWeight: 800, color: "#fff", whiteSpace: "nowrap", lineHeight: 1.2 }}>
        <div style={{ position: "absolute", left: 0, bottom: 4, height: 14, width: `${stroke}%`, background: "rgba(255,138,31,0.55)", zIndex: 0 }} />
        <span style={{ position: "relative" }}>{title}</span>
      </div>
      <div style={{ fontSize: 32, color: muted, whiteSpace: "nowrap", marginTop: 2 }}>{sub}</div>
    </Reveal>
  );
};
