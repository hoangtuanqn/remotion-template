import React from "react";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { glass, green, mono, muted, red } from "../theme";

const SCENE = 5;
const risky = [
  ["POST /transfer", "chuyển tiền"],
  ["POST /payment", "thanh toán"],
  ["POST /withdraw", "rút tiền"],
  ["POST /redeem", "mã khuyến mãi"],
  ["POST /password-reset", "đặt lại mật khẩu"],
  ["POST /order", "đặt hàng"],
];

const Row: React.FC<{ path: string; note: string; color: string }> = ({ path, note, color }) => (
  <div style={{ ...glass, borderRadius: 24, borderColor: `${color}88`, background: `${color}18`, height: 100, display: "flex", alignItems: "center", gap: 18, padding: "0 26px", boxSizing: "border-box" }}>
    <div style={{ fontFamily: mono, fontSize: 34, fontWeight: 700, whiteSpace: "nowrap", flex: 1 }}>{path}</div>
    <div style={{ fontSize: 28, color: muted, whiteSpace: "nowrap" }}>{note}</div>
    <div style={{ width: 14, height: 14, borderRadius: 7, background: color }} />
  </div>
);

export const Scene5Danger: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="MỨC NGUY HIỂM">
      <Reveal delay={delay(0)}>
        <Row path="GET /profile" note="gửi lại cũng ổn" color={green} />
      </Reveal>
      {risky.map(([path, note], i) => (
        <Reveal key={path} delay={delay(i + 1)} fromX={i % 2 ? 150 : -150}>
          <Row path={path} note={note} color={red} />
        </Reveal>
      ))}
    </SceneShell>
  );
};
