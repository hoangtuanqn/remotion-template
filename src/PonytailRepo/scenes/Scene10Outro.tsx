import React from "react";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, mono, muted, orange, red } from "../theme";

const SCENE = 9;

export const Scene10Outro: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="CÀI ĐẶT">
      <div style={{ padding: "36px 36px", borderRadius: 28, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 38, color: "#fff", whiteSpace: "pre", lineHeight: 1.55 }}>
        <div>
          <span style={{ color: cyan }}>{"> "}</span>
          <Typewriter text={"/plugin marketplace add\n  DietrichGebert/ponytail"} start={delay(0)} charsPerFrame={2} />
        </div>
        <div style={{ marginTop: 22 }}>
          <span style={{ color: cyan }}>{"> "}</span>
          <Typewriter text={"/plugin install\n  ponytail@ponytail"} start={delay(1)} charsPerFrame={1.6} />
        </div>
      </div>
      <Reveal delay={delay(2)} style={{ ...glass, padding: "24px 0", textAlign: "center", fontSize: 44, fontWeight: 900, whiteSpace: "nowrap", ...gradientText() }}>
        github.com/dietrichgebert/ponytail
      </Reveal>
      <Reveal delay={delay(3)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>Link repo ở mô tả</div>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M30 6 V48 M12 32 L30 50 L48 32" fill="none" stroke={orange} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Reveal>
      <Reveal delay={delay(4)} style={{ alignSelf: "center", padding: "18px 64px", borderRadius: 999, background: red, fontSize: 46, fontWeight: 900, whiteSpace: "nowrap" }}>
        Theo dõi
      </Reveal>
      <div style={{ textAlign: "center", fontSize: 28, color: muted, whiteSpace: "nowrap" }}>-53% dòng code (tác giả tự công bố)</div>
    </SceneShell>
  );
};
