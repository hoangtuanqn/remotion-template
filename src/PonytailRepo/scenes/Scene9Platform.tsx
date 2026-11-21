import React from "react";
import { CountUp } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, muted } from "../theme";

const SCENE = 8;
const band = ["Chi phí", "Token", "Tỷ lệ tái sử dụng code"];

export const Scene9Platform: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="BAND VÀ ĐA NỀN TẢNG">
      <div style={{ ...glass, padding: "30px 34px" }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: cyan, letterSpacing: 2, marginBottom: 14 }}>BAND TRÊN CLAUDE CODE</div>
        {band.map((b, i) => (
          <Reveal key={b} delay={delay(0) + i * 5}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, height: 96, borderTop: i ? "1px solid #ffffff1a" : "none", fontSize: 48, fontWeight: 800, whiteSpace: "nowrap" }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: cyan }} />
              {b}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={delay(1)} style={{ display: "flex", gap: 24 }}>
        {["Claude Code", "Codex"].map((n) => (
          <div key={n} style={{ ...glass, flex: 1, padding: "34px 10px", textAlign: "center", fontSize: 50, fontWeight: 900, whiteSpace: "nowrap" }}>{n}</div>
        ))}
      </Reveal>
      <Reveal delay={delay(2)} style={{ ...glass, padding: "20px 34px", display: "flex", alignItems: "center", gap: 30, whiteSpace: "nowrap" }}>
        <div style={{ fontSize: 120, fontWeight: 900, lineHeight: "130px", ...gradientText() }}>
          ~<CountUp to={20} start={delay(2)} duration={30} />
        </div>
        <div style={{ fontSize: 46, fontWeight: 800 }}>agent khác</div>
      </Reveal>
      <Reveal delay={delay(3)} style={{ ...glass, padding: "20px 28px", fontSize: 36, fontWeight: 800, textAlign: "center", whiteSpace: "nowrap" }}>Board: dữ liệu nằm trên máy bạn</Reveal>
      <div style={{ fontSize: 26, color: muted, textAlign: "center" }}>Band cần Claude Code 2.1.290 trở lên</div>
    </SceneShell>
  );
};
