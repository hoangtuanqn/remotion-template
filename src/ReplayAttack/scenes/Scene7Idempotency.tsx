import React from "react";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, green, mono, red } from "../theme";

const SCENE = 7;

export const Scene7Idempotency: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="IDEMPOTENCY">
      <div style={{ display: "flex", gap: 24 }}>
        <Reveal delay={delay(0)} fromX={-200} style={{ flex: 1 }}>
          <div style={{ ...glass, borderColor: `${green}88`, padding: "32px 24px", height: 320, boxSizing: "border-box" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: green, whiteSpace: "nowrap" }}>GỬI LẠI HỢP LỆ</div>
            <div style={{ fontSize: 40, fontWeight: 900, marginTop: 18, lineHeight: 1.2 }}>{"Mạng lỗi,\nclient retry"}</div>
            <div style={{ fontSize: 30, color: "#cfe0f5", marginTop: 18 }}>Không trừ tiền 2 lần</div>
          </div>
        </Reveal>
        <Reveal delay={delay(1)} fromX={200} style={{ flex: 1 }}>
          <div style={{ ...glass, borderColor: `${red}88`, padding: "32px 24px", height: 320, boxSizing: "border-box" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: red, whiteSpace: "nowrap" }}>REPLAY TRÁI PHÉP</div>
            <div style={{ fontSize: 40, fontWeight: 900, marginTop: 18, lineHeight: 1.2 }}>{"Hacker\ngửi lại"}</div>
            <div style={{ fontSize: 30, color: "#cfe0f5", marginTop: 18 }}>Cần chặn riêng</div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={delay(2)}>
        <div style={{ padding: "30px 30px", borderRadius: 28, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: cyan, marginBottom: 10 }}>DATABASE</div>
          <div style={{ fontSize: 40, color: "#fff", whiteSpace: "pre" }}>
            <Typewriter text="UNIQUE (idempotency_key)" start={delay(2)} charsPerFrame={0.9} />
          </div>
        </div>
      </Reveal>
      <Reveal delay={delay(3)} style={{ textAlign: "center", fontSize: 48, fontWeight: 900, whiteSpace: "nowrap", ...gradientText(cyan, green) }}>
        2 request → 1 bản ghi
      </Reveal>
    </SceneShell>
  );
};
