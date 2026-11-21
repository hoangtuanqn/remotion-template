import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, muted, orange } from "../theme";

const SCENE = 4;

export const Scene4Https: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const dot = ((frame * 6) % 450) - 10;
  const node: React.CSSProperties = { ...glass, borderRadius: 24, width: 170, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900 };
  return (
    <SceneShell {...props} label="HTTPS CÓ ĐỦ?">
      <Reveal delay={delay(0)}>
        <div style={{ ...glass, borderColor: `${cyan}88`, padding: "36px 30px" }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: cyan, whiteSpace: "nowrap" }}>HTTPS / TLS</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
            <div style={node}>Client</div>
            <div style={{ position: "relative", width: 410, height: 12, borderRadius: 6, background: `${cyan}44`, margin: "0 8px", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: -9, left: dot, width: 30, height: 30, borderRadius: 15, background: cyan, boxShadow: `0 0 24px ${cyan}`, opacity: interpolate(dot, [0, 30, 380, 410], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
            </div>
            <div style={node}>Server</div>
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: muted, marginTop: 22 }}>Bảo vệ đường truyền</div>
        </div>
      </Reveal>
      <Reveal delay={delay(1)}>
        <div style={{ ...glass, borderColor: `${orange}99`, background: "rgba(255,169,77,0.10)", padding: "36px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>TẦNG ỨNG DỤNG</div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>Request cũ có được nhận lại?</div>
          <div style={{ fontSize: 34, fontWeight: 700, color: muted }}>Backend phải tự thiết kế</div>
        </div>
      </Reveal>
    </SceneShell>
  );
};
