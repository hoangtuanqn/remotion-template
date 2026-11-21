import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { MockPage } from "../components/MockPage";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { glass, red } from "../theme";

const SCENE = 1;
// Red marks sit inside the scrolling page so they move with it (coordinates in a 904x1000 page).
const marks = [
  { label: "Hero na ná", top: 70, height: 150 },
  { label: "Font mặc định", top: 215, height: 130 },
  { label: "Ảnh stock vô hồn", top: 395, height: 190 },
  { label: "Layout lặp lại", top: 665, height: 270 },
];

export const Scene2Pain: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const scroll = interpolate(frame, [0, props.duration], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell {...props} label="VẤN ĐỀ">
      <div style={{ ...glass, borderRadius: 24, height: 700, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, translate: `0 ${-scroll}px` }}>
          <div style={{ position: "relative", width: 904, height: 1000 }}>
            <MockPage width={904} height={1000} title />
            <div style={{ position: "absolute", top: 400, left: 54, right: 54, height: 190, borderRadius: 18, background: "linear-gradient(135deg, #8da0b8, #566478)", opacity: 0.9 }} />
            {marks.map((m, i) => (
              <Reveal key={i} delay={delay(i)} style={{ position: "absolute", left: 30, right: 30, top: m.top, height: m.height, border: `6px solid ${red}`, borderRadius: 26 }}>
                <div style={{ position: "absolute", right: 14, top: -22, background: red, color: "#fff", fontSize: 30, fontWeight: 800, padding: "4px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>{m.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 30, color: "#9fb0c8", whiteSpace: "nowrap" }}>Trang minh họa</div>
    </SceneShell>
  );
};
