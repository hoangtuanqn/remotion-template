import React from "react";
import { Typewriter } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, mono, muted } from "../theme";

const SCENE = 7;
const commands: [string, string][] = [
  ["/ponytail", "đặt mức độ"],
  ["/ponytail-review", "review diff"],
  ["/ponytail-audit", "quét cả repo"],
  ["/ponytail-debt", "gom comment shortcut:"],
  ["/ponytail-gain", "bảng số liệu"],
];

export const Scene8Commands: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="BỘ LỆNH">
      <div style={{ padding: "40px 36px", borderRadius: 28, background: "#040a12", border: "1px solid #ffffff22", display: "flex", flexDirection: "column", gap: 34 }}>
        {commands.map(([cmd, note], i) => (
          <div key={cmd}>
            <div style={{ fontFamily: mono, fontSize: 42, color: "#fff", whiteSpace: "nowrap" }}>
              <span style={{ color: cyan }}>{"> "}</span>
              <Typewriter text={cmd} start={delay(i)} charsPerFrame={1} />
            </div>
            <Reveal delay={delay(i) + cmd.length + 2}>
              <div style={{ fontSize: 31, color: muted, marginTop: 6, paddingLeft: 52, whiteSpace: "nowrap" }}>{note}</div>
            </Reveal>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
