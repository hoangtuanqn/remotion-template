import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CountUp } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, green, mono, muted, orange } from "../theme";
import { vietnameseFontFamily } from "../useVietnameseFont";

const SCENE = 6;

const Bar: React.FC<{ label: string; value: number; start: number; color: React.CSSProperties; fill: string }> = ({ label, value, start, color, fill }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [start, start + 40], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ ...glass, padding: "20px 30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", whiteSpace: "nowrap" }}>
        <div style={{ fontSize: 36, fontWeight: 800 }}>{label}</div>
        <div style={{ fontSize: 90, fontWeight: 900, lineHeight: "100px", ...color }}>
          <CountUp to={value} start={start} duration={40} />%
        </div>
      </div>
      <div style={{ height: 20, borderRadius: 10, background: "#ffffff14", marginTop: 6 }}>
        <div style={{ height: "100%", width: `${w}%`, borderRadius: 10, background: fill }} />
      </div>
    </div>
  );
};

const codeBox: React.CSSProperties = { padding: "22px 26px", borderRadius: 22, background: "#040a12", border: "1px solid #ffffff22", fontFamily: mono, fontSize: 29, lineHeight: 1.5, whiteSpace: "pre" };

export const Scene7Test: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="TEST CHO LOGIC RỦI RO">
      <Reveal delay={delay(0)} style={codeBox}>
        <span style={{ color: "#8fb7ff" }}>{"Route::post"}</span>
        {"('/login', LoginController::class)\n  "}
        <span style={{ color: cyan }}>{"->middleware('throttle:5,1')"}</span>
        {";"}
      </Reveal>
      <Reveal delay={delay(1)} style={{ ...codeBox, borderColor: `${green}88`, whiteSpace: "pre-line", fontFamily: vietnameseFontFamily, fontSize: 34, fontWeight: 700 }}>
        <span style={{ color: green, fontWeight: 900 }}>Test nhỏ</span>
        {"\n6 request đăng nhập sai\n→ request thứ 6 trả "}
        <span style={{ color: orange, fontWeight: 900 }}>429</span>
      </Reveal>
      <Reveal delay={delay(2)}>
        <Bar label="Có Ponytail" value={98} start={delay(2)} color={gradientText(cyan, "#6ea8ff")} fill={`linear-gradient(90deg, ${cyan}, #6ea8ff)`} />
      </Reveal>
      <Reveal delay={delay(3)}>
        <Bar label="Không dùng skill" value={68} start={delay(3)} color={{ color: muted }} fill="#9fb0c8" />
      </Reveal>
      <Reveal delay={delay(4)} style={{ ...glass, padding: "18px 28px", fontSize: 32, fontWeight: 800, textAlign: "center", whiteSpace: "nowrap" }}>Cuối mỗi câu trả lời: đã bỏ qua gì, rủi ro nào</Reveal>
      <div style={{ textAlign: "center", fontSize: 26, color: muted, whiteSpace: "nowrap" }}>Code minh họa · số liệu của tác giả</div>
    </SceneShell>
  );
};
