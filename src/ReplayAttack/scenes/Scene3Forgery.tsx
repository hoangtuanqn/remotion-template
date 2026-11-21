import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { glass, gradientText, orange, red } from "../theme";

const SCENE = 2;

const Row: React.FC<{ text: string; badge: string; color: string }> = ({ text, badge, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ fontSize: 44, fontWeight: 800, whiteSpace: "nowrap", flex: 1 }}>{text}</div>
    <div style={{ fontSize: 40, fontWeight: 900, color: "#fff" }}>→</div>
    <div style={{ padding: "10px 22px", borderRadius: 999, background: `${color}26`, border: `2px solid ${color}`, color, fontSize: 32, fontWeight: 900, whiteSpace: "nowrap" }}>{badge}</div>
  </div>
);

export const Scene3Forgery: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="KHÁC GIẢ MẠO">
      <Reveal delay={delay(0)} fromX={-220}>
        <div style={{ ...glass, borderColor: `${red}88`, padding: "34px 34px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: red, whiteSpace: "nowrap" }}>GIẢ MẠO</div>
          <Row text="Chữ ký sai" badge="TỪ CHỐI" color={red} />
        </div>
      </Reveal>
      <Reveal delay={delay(1)} fromX={220}>
        <div style={{ ...glass, borderColor: `${orange}88`, padding: "34px 34px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>REPLAY</div>
          <Row text="Chữ ký vẫn đúng" badge="CÓ THỂ QUA" color={orange} />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#cfe0f5" }}>Request thật, chỉ bị gửi lại</div>
        </div>
      </Reveal>
      <Reveal delay={delay(2)} style={{ textAlign: "center", fontSize: 46, fontWeight: 900, whiteSpace: "nowrap", ...gradientText(orange, red) }}>
        Xác thực ≠ chống replay
      </Reveal>
    </SceneShell>
  );
};
