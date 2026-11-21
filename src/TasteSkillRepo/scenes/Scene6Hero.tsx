import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { CountUp } from "../components/Motion";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, muted, orange } from "../theme";

const SCENE = 5;
const layouts = ["split", "centred", "product", "photo", "place", "collage", "editorial", "word", "film", "statement", "triptych"];

export const Scene6Hero: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const step = Math.round(props.speechFrames * 0.2);
  const cards: [string, number][] = [
    ["Ảnh thật", delay(2)],
    ["Icon thương hiệu thật", delay(3)],
    ["Giao diện sản phẩm thật", delay(4)],
  ];
  return (
    <SceneShell {...props} label="TÍNH NĂNG 2">
      <Reveal delay={delay(0)} style={{ ...glass, padding: "26px 0", textAlign: "center" }}>
        <div style={{ fontSize: 200, fontWeight: 900, lineHeight: "200px", ...gradientText() }}>
          <CountUp to={11} start={delay(0)} duration={30} />
        </div>
        <div style={{ fontSize: 48, fontWeight: 800, whiteSpace: "nowrap" }}>hero layout đã kiểm thử</div>
      </Reveal>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {layouts.map((l, i) => (
          <Reveal key={l} delay={delay(1) + Math.round((i * step) / 11)}>
            <div style={{ fontFamily: "Consolas, monospace", fontSize: 30, fontWeight: 700, color: cyan, padding: "8px 20px", borderRadius: 999, border: `2px solid ${cyan}66`, background: "#0a1a26" }}>{l}</div>
          </Reveal>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {cards.map(([t, d]) => (
          <Reveal key={t} delay={d} style={{ flex: 1, ...glass, padding: "22px 12px", textAlign: "center", fontSize: 34, fontWeight: 900, lineHeight: 1.2, color: orange }}>
            {t}
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 28, color: muted, whiteSpace: "nowrap" }}>Mỗi màn hình một section · thanh điều hướng cố định</div>
    </SceneShell>
  );
};
