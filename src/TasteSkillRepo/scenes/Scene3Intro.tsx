import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CountUp } from "../components/Motion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { cyan, glass, gradientText, muted } from "../theme";

const SCENE = 2;
// repo.png is 1920x3600; the README column spans x 200..1720.
const SCALE = 904 / 1520;

export const Scene3Intro: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  const y = interpolate(frame, [0, props.duration], [480, 1500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneShell {...props} label="GIỚI THIỆU">
      <div style={{ ...glass, borderRadius: 24, height: 560, overflow: "hidden", position: "relative" }}>
        <Img src={staticFile("repos/TasteSkillRepo/repo.png")} style={{ position: "absolute", maxWidth: "none", width: 1920 * SCALE, left: -200 * SCALE, top: -y * SCALE }} />
      </div>
      <Reveal delay={delay(0)} style={{ ...glass, padding: "22px 34px", textAlign: "center", fontSize: 54, fontWeight: 900, whiteSpace: "nowrap", ...gradientText() }}>
        Leonxlnx/taste-skill
      </Reveal>
      <Reveal delay={delay(1)} style={{ ...glass, padding: "22px 34px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: "96px", whiteSpace: "nowrap", ...gradientText() }}>
            <CountUp to={119464} start={delay(1)} duration={45} format={(n) => n.toLocaleString("en-US")} />
          </div>
          <div style={{ fontSize: 28, color: muted, whiteSpace: "nowrap" }}>sao trên GitHub, tính đến 21/11/2026</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 32, fontWeight: 800, lineHeight: 1.5, color: cyan }}>
          <div>JavaScript</div>
          <div>MIT</div>
        </div>
      </Reveal>
      <Reveal delay={delay(2)} style={{ ...glass, padding: "18px 34px", fontSize: 36, fontWeight: 800, textAlign: "center", whiteSpace: "nowrap" }}>
        Mục tiêu theo tác giả: ngang figma.com
      </Reveal>
    </SceneShell>
  );
};
