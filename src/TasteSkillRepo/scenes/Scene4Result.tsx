import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { glass, muted, orange } from "../theme";

const SCENE = 3;
// Examples table in repo.png: x 202..1719, y 1985..2870 (image is 1920x3600).
const SCALE = 904 / 1517;

export const Scene4Result: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const y = interpolate(frame, [0, props.duration], [1975, 1975], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell {...props} label="KẾT QUẢ">
      <div style={{ ...glass, borderRadius: 24, height: 700, overflow: "hidden", position: "relative" }}>
        <Img src={staticFile("repos/TasteSkillRepo/repo.png")} style={{ position: "absolute", maxWidth: "none", width: 1920 * SCALE, left: -202 * SCALE, top: -y * SCALE }} />
        {[0, 1].map((i) => (
          <Reveal key={i} delay={delay(i)} style={{ position: "absolute", top: 4, height: 262, left: i === 0 ? 4 : "50%", width: "calc(50% - 4px)", border: `6px solid ${orange}`, borderRadius: 18, boxSizing: "border-box" }}>
            <div />
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 28, color: muted, whiteSpace: "nowrap" }}>Ảnh của tác giả, dựng từ một brief</div>
      <div style={{ display: "flex", gap: 24 }}>
        <Reveal delay={delay(0)} style={{ flex: 1, ...glass, padding: "20px 0", textAlign: "center", fontSize: 44, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Quán cà phê</Reveal>
        <Reveal delay={delay(1)} style={{ flex: 1, ...glass, padding: "20px 0", textAlign: "center", fontSize: 44, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Đêm techno</Reveal>
      </div>
      <Reveal delay={delay(2)} style={{ ...glass, padding: "20px 28px", textAlign: "center", fontSize: 36, fontWeight: 800, whiteSpace: "nowrap" }}>Ảnh thật, kho mở, có ghi nguồn</Reveal>
    </SceneShell>
  );
};
