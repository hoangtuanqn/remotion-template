import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, green, mono, orange } from "../theme";

const SCENE = 8;
const checks = ["Chữ ký hợp lệ?", "Timestamp còn hạn?", "Nonce chưa dùng?", "Hợp lệ về nghiệp vụ?"];

export const Scene8Combine: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="KẾT HỢP">
      <Reveal delay={delay(0)}>
        <div style={{ padding: "28px 30px", borderRadius: 28, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 34, lineHeight: 1.5, color: "#fff", whiteSpace: "pre" }}>
          <span style={{ color: cyan }}>signature</span>
          {" = HMAC(secret,\n  method + path + body\n  + timestamp + nonce)"}
        </div>
      </Reveal>
      {checks.map((text, i) => (
        <Reveal key={text} delay={delay(i + 1)} fromX={i % 2 ? 140 : -140}>
          <div style={{ ...glass, borderRadius: 26, height: 96, display: "flex", alignItems: "center", gap: 22, padding: "0 28px", boxSizing: "border-box" }}>
            <div style={{ width: 58, height: 58, borderRadius: 29, background: green, color: "#04080f", fontSize: 34, fontWeight: 900, textAlign: "center", lineHeight: "58px", flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 44, fontWeight: 800, whiteSpace: "nowrap" }}>{text}</div>
          </div>
        </Reveal>
      ))}
      <Reveal delay={delay(5)}>
        <div style={{ ...glass, borderColor: `${orange}99`, background: "rgba(255,169,77,0.10)", padding: "24px 20px", textAlign: "center", fontSize: 34, fontWeight: 800, color: orange, whiteSpace: "nowrap" }}>
          Đạt cả 4 → mới xử lý
        </div>
      </Reveal>
    </SceneShell>
  );
};
