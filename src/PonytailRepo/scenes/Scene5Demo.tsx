import React from "react";
import { CountUp } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, mono, muted, red } from "../theme";

const SCENE = 4;
const parts = ["migration", "model", "middleware", "cron"];

export const Scene5Demo: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="KHÓA SAU 5 LẦN SAI">
      <div style={{ display: "flex", gap: 24 }}>
        <Reveal delay={delay(0)} fromX={-200} style={{ flex: 1 }}>
          <div style={{ ...glass, padding: "34px 24px", height: 720, boxSizing: "border-box", borderColor: `${red}88` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: red, whiteSpace: "nowrap" }}>TỰ DỰNG</div>
            <div style={{ fontSize: 120, fontWeight: 900, lineHeight: "140px", color: red, whiteSpace: "nowrap" }}>
              ~<CountUp to={150} start={delay(0)} duration={50} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>dòng</div>
            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 12 }}>
              {parts.map((p) => (
                <div key={p} style={{ padding: "12px 16px", borderRadius: 14, background: "#ff6b6b22", border: "1px solid #ff6b6b55", fontFamily: mono, fontSize: 30, color: "#ffb0b0" }}>{p}</div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={delay(1)} fromX={200} style={{ flex: 1 }}>
          <div style={{ ...glass, padding: "34px 24px", height: 720, boxSizing: "border-box", borderColor: `${cyan}88` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: cyan, whiteSpace: "nowrap" }}>PONYTAIL</div>
            <div style={{ fontSize: 120, fontWeight: 900, lineHeight: "140px", whiteSpace: "nowrap", ...gradientText(cyan, "#6ea8ff") }}>
              ~<CountUp to={3} start={delay(1)} duration={30} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>dòng</div>
            <div style={{ fontSize: 30, color: muted, marginTop: 14 }}>Rate limiter có sẵn của Laravel</div>
            <div style={{ marginTop: 24, padding: "20px 14px", borderRadius: 18, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 26, color: cyan, whiteSpace: "pre" }}>{"->middleware(\n  'throttle:5,1')"}</div>
          </div>
        </Reveal>
      </div>
      <div style={{ textAlign: "center", fontSize: 28, color: muted, whiteSpace: "nowrap" }}>Ví dụ minh họa, kết quả có thể khác tùy prompt</div>
    </SceneShell>
  );
};
