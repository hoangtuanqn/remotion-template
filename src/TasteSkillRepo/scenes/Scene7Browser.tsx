import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, green, muted, orange } from "../theme";

const SCENE = 6;
const widths = [
  { w: 1440, px: 400 },
  { w: 1024, px: 290 },
  { w: 768, px: 220 },
  { w: 390, px: 110 },
];

const Browser: React.FC<{ w: number; px: number; delay: number }> = ({ w, px, delay }) => {
  const frame = useCurrentFrame();
  const done = frame > delay + 14;
  return (
    <div style={{ ...glass, borderRadius: 24, padding: 18, height: 270, boxSizing: "border-box", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: px, flex: 1, borderRadius: 12, background: "#0b1626", border: "2px solid #ffffff33", overflow: "hidden" }}>
        <div style={{ height: 18, background: "#ffffff22" }} />
        <div style={{ margin: 10, height: 40, borderRadius: 8, background: "#6ea8ff55" }} />
        <div style={{ margin: 10, height: 24, borderRadius: 8, background: "#ffffff22" }} />
      </div>
      <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", marginTop: 8, fontFamily: "Consolas, monospace" }}>{w}</div>
      <div style={{ position: "absolute", top: 12, right: 14, width: 48, height: 48, borderRadius: 99, background: done ? green : "transparent", border: `3px solid ${done ? green : "#ffffff44"}`, color: "#04080f", fontSize: 32, fontWeight: 900, textAlign: "center", lineHeight: "42px" }}>{done ? "✓" : ""}</div>
    </div>
  );
};

export const Scene7Browser: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const round = Math.min(3, Math.floor(interpolate(frame, [delay(4), delay(5)], [0, 3.99], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  return (
    <SceneShell {...props} label="TÍNH NĂNG 3">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {widths.map((x, i) => (
          <Reveal key={x.w} delay={delay(i)}>
            <Browser w={x.w} px={x.px} delay={delay(i)} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={delay(4)} style={{ ...glass, padding: "22px 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 40, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Tối đa 3 vòng</div>
        <div style={{ display: "flex", gap: 14 }}>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ width: 62, height: 62, borderRadius: 99, textAlign: "center", lineHeight: "56px", fontSize: 34, fontWeight: 900, border: `3px solid ${n <= round ? cyan : "#ffffff44"}`, color: n <= round ? "#04080f" : muted, background: n <= round ? cyan : "transparent" }}>{n}</div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={delay(5)} style={{ ...glass, padding: "20px 28px", textAlign: "center", fontSize: 38, fontWeight: 800, whiteSpace: "nowrap" }}>Agent tự nhìn lại kết quả</Reveal>
    </SceneShell>
  );
};
