import React from "react";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, mono, muted, red } from "../theme";

const SCENE = 1;

export const Scene2Replay: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="REQUEST BỊ GỬI LẠI">
      <Reveal delay={delay(0)}>
        <div style={{ ...glass, borderColor: `${cyan}88`, padding: "32px 34px", fontFamily: mono, fontSize: 38, lineHeight: 1.5, whiteSpace: "pre", color: "#fff" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: cyan, marginBottom: 10 }}>REQUEST HỢP LỆ</div>
          <Typewriter text={'POST /api/transfer\nAuthorization: Bearer xxx\n{ "to": "B",\n  "amount": 1000000 }'} start={delay(0)} charsPerFrame={1.4} />
        </div>
      </Reveal>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {[1, 2, 3, 4].map((n, i) => (
          <Reveal key={n} delay={delay(i + 1)} fromX={i % 2 ? 160 : -160} style={{ width: 442 }}>
            <div style={{ ...glass, borderRadius: 24, borderColor: `${red}88`, background: "rgba(255,107,107,0.12)", padding: "22px 24px" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: red, whiteSpace: "nowrap" }}>Replay #{n}</div>
              <div style={{ fontSize: 44, fontWeight: 900, whiteSpace: "nowrap" }}>-1.000.000</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 28, color: muted, whiteSpace: "nowrap" }}>Ví dụ minh họa</div>
    </SceneShell>
  );
};
