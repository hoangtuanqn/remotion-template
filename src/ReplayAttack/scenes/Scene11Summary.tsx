import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, muted, orange } from "../theme";

const SCENE = 10;
const items = [
  ["Xác thực", "Request đến từ ai?"],
  ["Phân quyền", "Có quyền làm việc này không?"],
  ["Toàn vẹn", "Request có bị sửa không?"],
  ["Chống replay", "Có bị dùng lại không?"],
  ["Idempotency", "Retry có bị làm 2 lần không?"],
];
const FOCUS = 3;

export const Scene11Summary: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="5 CÂU HỎI">
      {items.map(([name, question], i) => {
        const color = i === FOCUS ? orange : cyan;
        return (
          <Reveal key={name} delay={delay(i)} fromX={i % 2 ? 140 : -140}>
            <div style={{ ...glass, borderRadius: 26, height: 140, boxSizing: "border-box", padding: "0 30px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, borderColor: `${color}99`, background: i === FOCUS ? "rgba(255,169,77,0.14)" : glass.background, boxShadow: i === FOCUS ? `0 0 40px ${orange}55` : "none" }}>
              <div style={{ fontSize: 42, fontWeight: 900, color, whiteSpace: "nowrap" }}>{name}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: i === FOCUS ? "#fff" : muted, whiteSpace: "nowrap" }}>{question}</div>
            </div>
          </Reveal>
        );
      })}
    </SceneShell>
  );
};
