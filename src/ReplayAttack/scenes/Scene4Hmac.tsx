import React from "react";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, mono, orange } from "../theme";

const SCENE = 3;

const Chip: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ ...glass, borderRadius: 24, borderColor: `${color}99`, background: `${color}18`, padding: "24px 26px", fontSize: 38, fontWeight: 900, color, whiteSpace: "nowrap", textAlign: "center", flex: 1 }}>{text}</div>
);

export const Scene4Hmac: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="API DÙNG HMAC">
      <Reveal delay={delay(0)}>
        <div style={{ padding: "30px 32px", borderRadius: 28, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 40, lineHeight: 1.5, color: "#fff", whiteSpace: "pre" }}>
          <span style={{ color: cyan }}>signature</span>
          <Typewriter text={" =\n  HMAC(secret, request)"} start={delay(0)} charsPerFrame={0.9} />
        </div>
      </Reveal>
      <Reveal delay={delay(1)} fromX={-200}>
        <div style={{ ...glass, borderColor: `${orange}88`, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>HACKER CHỤP LẠI CẢ HAI</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Chip text="Request" color={cyan} />
            <div style={{ fontSize: 44, fontWeight: 900 }}>+</div>
            <Chip text="Chữ ký" color={orange} />
          </div>
        </div>
      </Reveal>
      <Reveal delay={delay(2)}>
        <div style={{ padding: "26px 20px", borderRadius: 24, background: `${orange}22`, border: `2px solid ${orange}`, textAlign: "center", fontSize: 38, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Gửi nguyên xi → chữ ký vẫn đúng</div>
      </Reveal>
    </SceneShell>
  );
};
