import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { accent, cyan, glass, muted, orange } from "../theme";
import { vietnameseFontFamily } from "../useVietnameseFont";

const SCENE = 4;
const types = [
  ["software", "phần mềm"],
  ["gaming", "game"],
  ["tech", "công nghệ"],
  ["product", "sản phẩm"],
  ["service", "dịch vụ"],
  ["place", "địa điểm"],
];

const Palette: React.FC<{ name: string; colors: string[]; font: string; sample: string }> = ({ name, colors, font, sample }) => (
  <div style={{ ...glass, flex: 1, padding: 22 }}>
    <div style={{ fontSize: 28, fontWeight: 800, color: muted, whiteSpace: "nowrap" }}>{name}</div>
    <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
      {colors.map((c) => (
        <div key={c} style={{ flex: 1, height: 56, borderRadius: 12, background: c }} />
      ))}
    </div>
    <div style={{ fontFamily: font, fontSize: 50, fontWeight: 700, color: "#fff", lineHeight: 1.1, whiteSpace: "nowrap" }}>{sample}</div>
  </div>
);

export const Scene5Classify: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const lit = Math.floor(interpolate(frame, [delay(0), delay(1)], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <SceneShell {...props} label="TÍNH NĂNG 1">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        {types.map(([en, vi], i) => (
          <div key={en} style={{ ...glass, padding: "18px 0", textAlign: "center", borderColor: i < lit ? cyan : "rgba(255,255,255,0.13)", background: i < lit ? "#54f0ca1c" : glass.background }}>
            <div style={{ fontSize: 34, fontWeight: 900, color: i < lit ? cyan : "#fff", fontFamily: "Consolas, monospace" }}>{en}</div>
            <div style={{ fontSize: 28, color: muted }}>{vi}</div>
          </div>
        ))}
      </div>
      <Reveal delay={delay(1)} style={{ textAlign: "center", fontSize: 90, color: orange, fontWeight: 900, lineHeight: 1 }}>↓</Reveal>
      <div style={{ display: "flex", gap: 20 }}>
        <Reveal delay={delay(2)} style={{ flex: 1, display: "flex" }}>
          <Palette name="place" colors={["#2b1d14", "#c8793a", "#f2e3c9"]} font="Georgia, serif" sample="Aa Cà phê" />
        </Reveal>
        <Reveal delay={delay(3)} style={{ flex: 1, display: "flex" }}>
          <Palette name="software" colors={["#0b1020", accent, "#9d7bff"]} font={vietnameseFontFamily} sample="Aa Code" />
        </Reveal>
      </div>
      <div style={{ textAlign: "center", fontSize: 26, color: muted, whiteSpace: "nowrap" }}>Bảng màu và font minh họa</div>
    </SceneShell>
  );
};
