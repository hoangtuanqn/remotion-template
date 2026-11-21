import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SceneProps, SceneShell } from "../components/SceneShell";
import { accent, cyan, glass, gradientText, mono, muted, orange, red } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const codeLines = Array.from({ length: 60 }, (_, i) => `${"  ".repeat(i % 4)}${["Schema::create('login_attempts');", "$user->increment('failed');", "if ($user->failed >= 5) lock();", "$schedule->command('unlock');", "class CheckAttempts {}"][i % 5]}`);

export const Scene1Hook: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 9], [1.12, 1], clamp);
  const flash = frame >= 2 && frame <= 10 ? interpolate(frame, [2, 6, 10], [0, 0.35, 0], clamp) : 0;
  const glitch = frame % 48 < 4 && frame > 0 ? 8 : 0;
  const neon = 0.55 + 0.45 * Math.abs(Math.sin(frame / 5));
  const beam = ((frame * 22) % 2400) - 300;
  const scroll = -(frame * 26) % 1200;
  return (
    <SceneShell {...props} label="REPO GITHUB" animateIn={false}>
      <div style={{ position: "absolute", inset: -40, overflow: "hidden", opacity: 0.16, fontFamily: mono, fontSize: 34, lineHeight: "50px", color: cyan, whiteSpace: "pre", translate: `0 ${scroll}px` }}>{codeLines.concat(codeLines).join("\n")}</div>
      <div style={{ scale: String(zoom), display: "flex", flexDirection: "column", alignItems: "center", gap: 20, ...glass, padding: "60px 30px", border: `2px solid ${accent}`, boxShadow: `0 0 ${50 * neon}px ${accent}99`, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, whiteSpace: "nowrap", textShadow: glitch ? `${glitch}px 0 #ff2d55, ${-glitch}px 0 #2dd4ff` : "none" }}>
          <span style={{ fontSize: 170, fontWeight: 900, lineHeight: 1, color: red }}>~150</span>
          <span style={{ fontSize: 100, fontWeight: 900, color: "#fff" }}>→</span>
          <span style={{ fontSize: 170, fontWeight: 900, lineHeight: 1, ...gradientText(cyan, accent), textShadow: "none" }}>3</span>
        </div>
        <div style={{ fontSize: 84, fontWeight: 900, color: "#fff", whiteSpace: "nowrap" }}>dòng code</div>
        <div style={{ fontSize: 44, fontWeight: 800, color: orange, whiteSpace: "nowrap", marginTop: 20 }}>để chặn đăng nhập sai nhiều lần</div>
        <div style={{ ...glass, borderRadius: 999, padding: "16px 40px", fontSize: 40, fontWeight: 800, whiteSpace: "nowrap", marginTop: 20 }}>DietrichGebert/ponytail</div>
        <div style={{ fontSize: 26, color: muted, whiteSpace: "nowrap" }}>Ví dụ minh họa</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: beam - 400, width: 90, background: "linear-gradient(90deg, transparent, #ffffff25, transparent)" }} />
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
    </SceneShell>
  );
};
