import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { MockPage } from "../components/MockPage";
import { SceneProps, SceneShell } from "../components/SceneShell";
import { accent, glass, orange, red } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene1Hook: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 9], [1.12, 1], clamp);
  const flash = frame >= 2 && frame <= 10 ? interpolate(frame, [2, 6, 10], [0, 0.35, 0], clamp) : 0;
  const glitch = frame % 48 < 4 && frame > 0 ? 8 : 0;
  const neon = 0.55 + 0.45 * Math.abs(Math.sin(frame / 5));
  const beam = ((frame * 22) % 2400) - 300;
  return (
    <SceneShell {...props} label="REPO GITHUB" animateIn={false}>
      <div style={{ scale: String(zoom), display: "flex", flexDirection: "column", alignItems: "center", gap: 24, ...glass, padding: "36px 24px", border: `2px solid ${accent}`, boxShadow: `0 0 ${50 * neon}px ${accent}99`, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {[0, 12, -10, 22].map((h, i) => (
            <div key={i} style={{ translate: `0 ${Math.sin((frame + i * 9) / 8) * 6}px` }}>
              <MockPage hue={h} width={400} height={280} />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 120, fontWeight: 900, lineHeight: 1.08, color: "#fff", whiteSpace: "pre", textShadow: glitch ? `${glitch}px 0 #ff2d55, ${-glitch}px 0 #2dd4ff` : "none" }}>
          {"WEB NHÌN LÀ\nBIẾT DO "}
          <span style={{ color: red }}>AI</span>
          <span style={{ color: orange }}>?</span>
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: beam - 400, width: 90, background: "linear-gradient(90deg, transparent, #ffffff25, transparent)" }} />
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
    </SceneShell>
  );
};
