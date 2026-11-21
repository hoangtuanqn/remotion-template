import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, green, orange, red } from "../theme";

const SCENE = 9;

export const Scene10Jwt: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const bar = interpolate(frame, [delay(0), props.duration], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell {...props} label="JWT VÀ REPLAY">
      <Reveal delay={delay(0)}>
        <div style={{ ...glass, borderColor: `${cyan}88`, padding: "34px 30px" }}>
          <div style={{ fontSize: 38, fontWeight: 900, color: cyan, whiteSpace: "nowrap" }}>JWT CÒN HIỆU LỰC</div>
          <div style={{ marginTop: 26, height: 16, borderRadius: 8, background: `${cyan}33`, overflow: "hidden" }}>
            <div style={{ width: `${bar}%`, height: "100%", background: `linear-gradient(90deg, ${cyan}, ${green})` }} />
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={delay(i + 1)} style={{ flex: 1 }}>
                <div style={{ padding: "18px 10px", borderRadius: 20, background: `${red}22`, border: `2px solid ${red}`, textAlign: "center", fontSize: 30, fontWeight: 900, color: red, whiteSpace: "nowrap" }}>Request {n}</div>
              </Reveal>
            ))}
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#cfe0f5", marginTop: 24 }}>Token bị cắp dùng được đến khi hết hạn</div>
        </div>
      </Reveal>
      <Reveal delay={delay(4)}>
        <div style={{ ...glass, borderColor: `${orange}99`, background: "rgba(255,169,77,0.10)", padding: "30px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 34, fontWeight: 900, color: orange, whiteSpace: "nowrap" }}>THAO TÁC NHẠY CẢM</div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>Token ngắn hạn + chống replay</div>
        </div>
      </Reveal>
    </SceneShell>
  );
};
