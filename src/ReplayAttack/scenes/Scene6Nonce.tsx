import React from "react";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, mono, orange, red } from "../theme";

const SCENE = 6;

export const Scene6Nonce: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="TIMESTAMP + NONCE">
      <Reveal delay={delay(0)} fromX={-200}>
        <div style={{ ...glass, borderColor: `${cyan}88`, padding: "30px 32px" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: cyan, whiteSpace: "nowrap" }}>1. TIMESTAMP</div>
          <div style={{ fontFamily: mono, fontSize: 36, marginTop: 14, whiteSpace: "nowrap" }}>now - timestamp ≤ 5 phút</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: red, marginTop: 10 }}>Quá cũ → từ chối</div>
        </div>
      </Reveal>
      <Reveal delay={delay(1)}>
        <div style={{ textAlign: "center", fontSize: 38, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Nhưng trong 5 phút vẫn gửi lại được</div>
      </Reveal>
      <Reveal delay={delay(2)} fromX={200}>
        <div style={{ ...glass, borderColor: `${orange}99`, padding: "30px 32px" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>2. NONCE: dùng một lần</div>
          <div style={{ fontFamily: mono, fontSize: 38, marginTop: 14, whiteSpace: "pre" }}>
            <Typewriter text="8f72a9c1 -> used" start={delay(3)} charsPerFrame={0.8} />
          </div>
        </div>
      </Reveal>
      <Reveal delay={delay(4)}>
        <div style={{ padding: "22px 20px", borderRadius: 24, background: `${red}22`, border: `2px solid ${red}`, textAlign: "center", fontSize: 40, fontWeight: 900, color: red, whiteSpace: "nowrap" }}>nonce đã dùng → TỪ CHỐI</div>
      </Reveal>
    </SceneShell>
  );
};
