import React from "react";
import { useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { glass, green, muted, red } from "../theme";

const SCENE = 7;

export const Scene8Effects: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const a = frame / 40;
  const shader = `radial-gradient(circle at ${50 + 35 * Math.sin(a)}% ${50 + 30 * Math.cos(a * 1.3)}%, #9d7bff, transparent 55%), radial-gradient(circle at ${50 + 40 * Math.cos(a * 0.8)}% ${50 + 35 * Math.sin(a)}%, #54f0ca, transparent 50%), #0b1020`;
  return (
    <SceneShell {...props} label="TÍNH NĂNG 4">
      <Reveal delay={delay(0)}>
        <div style={{ ...glass, borderRadius: 28, height: 380, overflow: "hidden", position: "relative", background: shader }}>
          <div style={{ position: "absolute", left: 28, top: 24, fontSize: 38, fontWeight: 900, whiteSpace: "nowrap" }}>Phần mềm · công nghệ · game</div>
          <div style={{ position: "absolute", left: 28, bottom: 24, fontSize: 32, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>shader · cảnh cuộn</div>
          <div style={{ position: "absolute", right: 24, bottom: 18, width: 70, height: 70, borderRadius: 99, background: green, color: "#04080f", fontSize: 48, fontWeight: 900, textAlign: "center", lineHeight: "68px" }}>✓</div>
        </div>
      </Reveal>
      <Reveal delay={delay(2)}>
        <div style={{ ...glass, borderRadius: 28, height: 380, overflow: "hidden", position: "relative", background: "#efe3cf" }}>
          <div style={{ position: "absolute", left: 28, top: 24, fontSize: 38, fontWeight: 900, color: "#2b1d14", whiteSpace: "nowrap" }}>Quán cà phê · khách sạn</div>
          <div style={{ position: "absolute", left: 28, bottom: 24, fontSize: 32, fontWeight: 700, color: "#6b4a2e", whiteSpace: "nowrap" }}>ảnh · chữ · màu phẳng</div>
          <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%" viewBox="0 0 904 380" preserveAspectRatio="none">
            <path d="M120 60 L784 320 M784 60 L120 320" stroke={red} strokeWidth="14" strokeLinecap="round" fill="none" strokeDasharray="800" strokeDashoffset={Math.max(0, 800 - (frame - delay(2)) * 40)} />
          </svg>
        </div>
      </Reveal>
      <Reveal delay={delay(3)} style={{ textAlign: "center", fontSize: 40, fontWeight: 800, color: muted, whiteSpace: "nowrap" }}>Không phải trang nào cũng nháy nháy</Reveal>
    </SceneShell>
  );
};
