import React from "react";
import { useCurrentFrame } from "remotion";
import { CountUp } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, muted, red } from "../theme";

const SCENE = 11;

export const Scene9Outro: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const pulse = 1 + 0.04 * Math.sin(frame / 4);
  return (
    <SceneShell {...props} label="KẾT LUẬN">
      <Reveal delay={delay(0)}>
        <div style={{ ...glass, borderColor: `${cyan}88`, padding: "44px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 800, whiteSpace: "nowrap" }}>Hacker gửi lại đúng request này</div>
          <div style={{ fontSize: 190, fontWeight: 900, lineHeight: 1.1, whiteSpace: "nowrap", ...gradientText(cyan, "#6ea8ff") }}>
            <CountUp to={100} start={delay(0)} duration={50} /> lần
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, color: muted, whiteSpace: "nowrap" }}>hệ thống sẽ làm gì?</div>
        </div>
      </Reveal>
      <Reveal delay={delay(1)}>
        <div style={{ padding: "30px 20px", borderRadius: 28, background: `${red}22`, border: `2px solid ${red}`, textAlign: "center", fontSize: 44, fontWeight: 900, color: red, whiteSpace: "nowrap" }}>Không chặn lần nào = lỗ hổng</div>
      </Reveal>
      <Reveal delay={delay(2)} style={{ alignSelf: "center" }}>
        <div style={{ scale: String(pulse), padding: "18px 64px", borderRadius: 999, background: red, fontSize: 46, fontWeight: 900, whiteSpace: "nowrap" }}>Theo dõi</div>
      </Reveal>
    </SceneShell>
  );
};
