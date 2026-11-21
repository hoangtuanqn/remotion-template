import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneProps, SceneShell } from "../components/SceneShell";
import { accent, cyan, glass, gradientText, mono, orange, red } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const codeLines = Array.from({ length: 60 }, (_, i) => ["POST /api/transfer", "Authorization: Bearer xxx", "amount: 1000000", "POST /api/transfer", `replay #${i + 1}`][i % 5]);

export const Scene1Hook: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 9], [1.12, 1], clamp);
  const flash = frame >= 2 && frame <= 10 ? interpolate(frame, [2, 6, 10], [0, 0.35, 0], clamp) : 0;
  const glitch = frame % 48 < 4 && frame > 0 ? 8 : 0;
  const neon = 0.55 + 0.45 * Math.abs(Math.sin(frame / 5));
  const beam = ((frame * 22) % 2400) - 300;
  const scroll = -(frame * 26) % 1200;
  return (
    <SceneShell {...props} label="BẢO MẬT API" animateIn={false}>
      <div style={{ position: "absolute", inset: -40, overflow: "hidden", opacity: 0.16, fontFamily: mono, fontSize: 34, lineHeight: "50px", color: cyan, whiteSpace: "pre", translate: `0 ${scroll}px` }}>{codeLines.concat(codeLines).join("\n")}</div>
      <div style={{ scale: String(zoom), display: "flex", flexDirection: "column", alignItems: "center", gap: 20, ...glass, padding: "60px 30px", border: `2px solid ${accent}`, boxShadow: `0 0 ${50 * neon}px ${accent}99`, position: "relative", overflow: "hidden" }}>
        <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1.1, whiteSpace: "nowrap", ...gradientText(cyan, accent) }}>1 request</div>
        <div style={{ fontSize: 90, fontWeight: 900, color: "#fff", lineHeight: 1 }}>↓</div>
        <div style={{ fontSize: 82, fontWeight: 900, lineHeight: 1.1, whiteSpace: "nowrap", color: red, textShadow: glitch ? `${glitch}px 0 #ff2d55, ${-glitch}px 0 #2dd4ff` : "none" }}>nhiều lần chuyển</div>
        <div style={{ fontSize: 38, fontWeight: 800, color: orange, whiteSpace: "nowrap", marginTop: 20 }}>không cần mật khẩu, không sửa gì</div>
        <div style={{ ...glass, borderRadius: 999, padding: "16px 40px", fontSize: 44, fontWeight: 800, whiteSpace: "nowrap", marginTop: 20 }}>REPLAY ATTACK</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: beam - 400, width: 90, background: "linear-gradient(90deg, transparent, #ffffff25, transparent)" }} />
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
    </SceneShell>
  );
};
