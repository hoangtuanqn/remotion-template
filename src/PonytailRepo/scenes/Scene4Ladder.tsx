import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, orange } from "../theme";

const SCENE = 3;
const rungs = ["Cần tồn tại?", "Codebase có chưa?", "Thư viện chuẩn", "Tính năng nền tảng", "Dependency đã cài", "Một dòng code", "Code tối thiểu"];
// Illustrative stop: the framework (Laravel) is already installed, so its rate limiter is reused.
const STOP = 4;

export const Scene4Ladder: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const stopAt = delay(rungs.length);
  return (
    <SceneShell {...props} label="THANG QUYẾT ĐỊNH">
      {rungs.map((text, i) => {
        const isStop = i === STOP;
        const dim = i > STOP ? interpolate(frame, [stopAt, stopAt + 10], [1, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
        const glow = isStop ? interpolate(frame, [stopAt, stopAt + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
        return (
          <Reveal key={text} delay={delay(i)} style={{ opacity: dim }}>
            <div style={{ ...glass, borderRadius: 26, height: 112, display: "flex", alignItems: "center", gap: 24, padding: "0 30px", boxSizing: "border-box", borderColor: glow ? orange : "rgba(255,255,255,0.13)", boxShadow: `0 0 ${50 * glow}px ${orange}88`, background: glow ? "rgba(255,169,77,0.16)" : glass.background }}>
              <div style={{ width: 62, height: 62, borderRadius: 31, background: isStop && glow ? orange : "#ffffff1c", color: isStop && glow ? "#04080f" : cyan, fontSize: 36, fontWeight: 900, textAlign: "center", lineHeight: "62px", flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 46, fontWeight: 800, whiteSpace: "nowrap", flex: 1 }}>{text}</div>
              {isStop && glow > 0.5 && <div style={{ fontSize: 28, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>DỪNG Ở ĐÂY</div>}
            </div>
          </Reveal>
        );
      })}
    </SceneShell>
  );
};
