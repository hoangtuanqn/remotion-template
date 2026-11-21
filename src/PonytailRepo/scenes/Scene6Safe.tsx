import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, green, orange } from "../theme";

const SCENE = 5;
const items = ["Validation", "Xử lý lỗi", "Bảo mật", "Accessibility"];

const Tick: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="64" height="64" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="29" fill="none" stroke={green} strokeWidth="5" />
    <path d="M18 33 L28 43 L47 22" fill="none" stroke={green} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset={60 * (1 - progress)} />
  </svg>
);

export const Scene6Safe: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="KHÔNG CẮT XÉN">
      <Reveal delay={delay(0)} style={{ ...glass, padding: "30px 34px", textAlign: "center", borderColor: `${orange}88` }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Không phải ít token nhất</div>
      </Reveal>
      {items.map((text, i) => {
        const fill = interpolate(frame, [delay(i + 1), delay(i + 1) + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <Reveal key={text} delay={delay(i + 1)}>
            <div style={{ ...glass, height: 160, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 62, fontWeight: 900, whiteSpace: "nowrap" }}>{text}</div>
              <Tick progress={fill} />
              <div style={{ position: "absolute", left: 0, bottom: 0, height: 8, width: `${fill * 100}%`, background: `linear-gradient(90deg, ${cyan}, ${green})` }} />
            </div>
          </Reveal>
        );
      })}
    </SceneShell>
  );
};
