import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, mono, orange, red } from "../theme";

const SCENE = 8;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene9Outro: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const loop = interpolate(frame, [delay(4), delay(4) + 10], [0, 1], clamp);
  const gone = interpolate(frame, [delay(5), delay(5) + 8], [1, 0], clamp);
  const none = interpolate(frame, [delay(5), delay(5) + 8], [0, 1], clamp);
  return (
    <SceneShell {...props} label="CÀI ĐẶT">
      <div style={{ padding: "36px 36px", borderRadius: 28, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 38, color: "#fff", whiteSpace: "pre", lineHeight: 1.55 }}>
        <div>
          <span style={{ color: cyan }}>{"> "}</span>
          <Typewriter text={"/plugin marketplace add\n  Leonxlnx/taste-skill"} start={delay(0)} charsPerFrame={1.6} />
        </div>
        <div style={{ marginTop: 22 }}>
          <span style={{ color: cyan }}>{"> "}</span>
          <Typewriter text={"/plugin install\n  taste-skill@taste-skill"} start={delay(1)} charsPerFrame={1.6} />
        </div>
      </div>
      <Reveal delay={delay(2)} style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        <div style={{ ...glass, borderRadius: 999, padding: "12px 28px", fontSize: 34, fontWeight: 800, whiteSpace: "nowrap" }}>Node 22+</div>
        <div style={{ ...glass, borderRadius: 999, padding: "12px 28px", fontSize: 34, fontWeight: 800, whiteSpace: "nowrap" }}>Không cần API key</div>
      </Reveal>
      <Reveal delay={delay(3)} style={{ ...glass, padding: "22px 0", textAlign: "center", fontSize: 44, fontWeight: 900, whiteSpace: "nowrap", ...gradientText() }}>
        github.com/Leonxlnx/taste-skill
      </Reveal>
      <div style={{ textAlign: "center", fontSize: 44, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Link repo ở mô tả</div>
      <div style={{ alignSelf: "center", padding: "14px 56px", borderRadius: 999, background: red, fontSize: 42, fontWeight: 900, whiteSpace: "nowrap" }}>Theo dõi</div>
      <div style={{ position: "absolute", inset: -20, borderRadius: 32, background: "#04080f", opacity: loop, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: 120, fontWeight: 900, lineHeight: 1.08, whiteSpace: "nowrap" }}>
        <div>WEB NHÌN LÀ</div>
        <div style={{ position: "relative", width: 904, height: 140 }}>
          <div style={{ position: "absolute", inset: 0, opacity: gone }}>
            BIẾT DO <span style={{ color: red }}>AI</span>
            <span style={{ color: orange }}>?</span>
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: none, color: cyan }}>KHÔNG CÒN</div>
        </div>
      </div>
    </SceneShell>
  );
};
