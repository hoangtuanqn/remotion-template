import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BrandHeader } from "../components/BrandHeader";
import { Callout } from "../components/BrowserFrame";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { accent, cyan, orange } from "../theme";

// Flat, editorial look (video-shotcraft rules): one hero per scene, solid colours, accelerating easing, text >= 32px,
// one full-frame wipe for the whole film. No icons, glows or gradient text.
// Scene kinds: Scene1Hook (poster), DemoScene (callout + step bar over DemoStage), reference page (optional), outro. Copy, rename, trim to the script.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const snap = Easing.bezier(0.2, 0.8, 0.2, 1);
const IMG = (name: string) => `content/TopicVideo/${name}`;

// Browser window for the hook: title bar plus a still of the product (still is 1920x868).
const MiniBrowser: React.FC<{ width: number; src: string; title: string }> = ({ width, src, title }) => (
  <div style={{ width, borderRadius: 14, overflow: "hidden", background: "#0b1224", boxShadow: "0 34px 70px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.14)" }}>
    <div style={{ height: 40, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", background: "#0e1730" }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
        <div key={color} style={{ width: 13, height: 13, borderRadius: 7, background: color }} />
      ))}
      <div style={{ flex: 1, textAlign: "center", fontSize: 20, fontWeight: 600, color: "#dbe6f7", whiteSpace: "nowrap" }}>{title}</div>
    </div>
    <Img src={staticFile(src)} style={{ display: "block", width, height: Math.round((width * 868) / 1920) }} />
  </div>
);

// Highlighter stroke behind the lower part of a word (white text stays readable on the darker blue).
const Marker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <span style={{ position: "absolute", left: -12, right: -12, bottom: 6, height: "54%", background: "#1f6fe0" }} />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

// Hook: frame 0 is the thumbnail, so everything is on screen already. A poster layout: headline on the left, a flat diagonal stage on the right,
// one hero window (the user site) gliding from a steep tilt to nearly frontal, the admin window dimmed behind it, one headline word marked with a highlighter stroke.
const Scene1Hook: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const slam = interpolate(frame, [0, 12], [1.06, 1], { ...clamp, easing: snap });
  const flash = interpolate(frame, [2, 3, 11], [0, 0.3, 0], clamp);
  const travel = interpolate(frame, [0, 110], [0, 1], { ...clamp, easing: snap });
  const glide = -22 + 13 * travel;
  const lift = Math.sin(frame / 34) * 6;
  return (
    <>
      <SceneShell {...props} label="Tên dự án" animateIn={false} slide={false}>
        <div style={{ position: "absolute", inset: 0, scale: String(slam) }}>
          {/* Flat diagonal stage behind the windows, with an orange edge. */}
          <div style={{ position: "absolute", left: 990 - travel * 30, top: -120, width: 1300, height: 1320, background: "#0b1f52", borderLeft: `10px solid ${accent}`, transform: "skewX(-9deg)", transformOrigin: "top left" }} />
          <BrandHeader channelName="MST SOFTWARE" />
          <div style={{ position: "absolute", left: 100, top: 190 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 70, height: 6, background: orange }} />
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 5, color: orange }}>MÃ NGUỒN MIỄN PHÍ</div>
            </div>
            <div style={{ marginTop: 22, fontSize: 104, fontWeight: 900, lineHeight: 1.14, whiteSpace: "nowrap" }}>
              <div>Tự vận hành</div>
              <div>
                <Marker>website của bạn</Marker>
              </div>
              <div style={{ color: orange, fontSize: 196, lineHeight: 1.0, letterSpacing: 4, marginTop: 6 }}>TÊN</div>
            </div>
            <div style={{ marginTop: 26, fontSize: 36, fontWeight: 700, color: "#c9d8ee", whiteSpace: "nowrap" }}>Laravel 12 · PHP 8.2+ · cPanel</div>
          </div>
          <div style={{ position: "absolute", inset: 0, perspective: 2600 }}>
            <div style={{ position: "absolute", left: 1150, top: 110 + lift, transform: `rotateY(${glide}deg) rotateX(4deg)`, transformOrigin: "left center" }}>
              <div style={{ position: "relative" }}>
                <MiniBrowser width={700} src={IMG("admin.jpg")} title="Trang quản trị" /> {/* drop this block (and its dim layer) if there is no admin side */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "rgba(4,10,24,0.5)" }} />
              </div>
            </div>
            <div style={{ position: "absolute", left: 880, top: 320 - lift, transform: `rotateY(${glide}deg) rotateX(4deg) translateZ(70px)`, transformOrigin: "left center" }}>
              <MiniBrowser width={930} src={IMG("hero.jpg")} title="tên-miền.vn" />
            </div>
          </div>
        </div>
      </SceneShell>
      <div style={{ position: "absolute", inset: 0, background: "#ffffff", opacity: flash }} />
    </>
  );
};

// Demo scenes: the frame and the footage come from DemoStage. Each scene adds a step bar and its callout; the only full-frame wipe is the switch to the admin side.
const callouts: Record<number, [string, string]> = {
  1: ["Tra cứu nhanh", "SĐT · Số tài khoản · Link"],
};
const DEMO_COUNT = Object.keys(callouts).length;
const ADMIN_FROM = 99; // index of the first admin-side demo scene (orange step segments + wipe); keep > DEMO_COUNT when there is no admin side

// One segment per demo scene; the current one fills while the scene plays (blue = user site, orange = admin).
const StepBar: React.FC<{ index: number; duration: number }> = ({ index, duration }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 190, top: 14, width: 1540, display: "flex", gap: 8 }}>
      {Array.from({ length: DEMO_COUNT }, (_, i) => {
        const n = i + 1;
        const fill = n < index ? 1 : n === index ? interpolate(frame, [0, duration], [0.08, 1], clamp) : 0;
        return (
          <div key={n} style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.16)" }}>
            <div style={{ width: `${fill * 100}%`, height: "100%", background: n < ADMIN_FROM ? accent : orange }} />
          </div>
        );
      })}
    </div>
  );
};

const DemoScene: React.FC<SceneProps & { index: number }> = ({ index, ...props }) => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, [0, 16], [-100, 130], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <SceneShell {...props} label="Demo" slide={false} animateIn={false}>
      <StepBar index={index} duration={props.duration} />
      {index === ADMIN_FROM ? <div style={{ position: "absolute", top: 0, bottom: 0, left: `${wipe}%`, width: "16%", transform: "skewX(-14deg)", background: orange }} /> : null}
      <Callout title={callouts[index][0]} sub={callouts[index][1]} delay={revealDelay(index, 0, props.speechFrames)} />
    </SceneShell>
  );
};

// Reference page: the live demo site, shown as the hero window with its address typing itself in.
const SITE = "tên-miền.vn";
const REFERENCE_INDEX = 2; // scene index in the narration; the reference page is optional, delete it and its row in reveals.ts when unused
const SceneReference: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const d = (item: number) => revealDelay(REFERENCE_INDEX, item, props.speechFrames);
  const travel = interpolate(frame, [0, 90], [0, 1], { ...clamp, easing: snap });
  const lift = Math.sin(frame / 34) * 6;
  const typed = Math.max(0, Math.min(SITE.length, Math.floor((frame - d(1)) / 1.6)));
  const caret = typed < SITE.length || Math.floor(frame / 15) % 2 === 0;
  return (
    <SceneShell {...props} label="Trang tham khảo" slide={false} animateIn={false}>
      <BrandHeader channelName="MST SOFTWARE" />
      <div style={{ position: "absolute", left: 1010 - travel * 30, top: -120, width: 1300, height: 1320, background: "#0b1f52", borderLeft: `10px solid ${accent}`, transform: "skewX(-9deg)", transformOrigin: "top left" }} />
      <Reveal delay={d(0)} fromX={-80} style={{ position: "absolute", left: 100, top: 220 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 70, height: 6, background: orange }} />
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 5, color: orange }}>TRANG THAM KHẢO</div>
        </div>
        <div style={{ marginTop: 22, fontSize: 124, fontWeight: 900, lineHeight: 1.14, whiteSpace: "nowrap" }}>
          <div>Xem thử</div>
          <div>
            <Marker>giao diện</Marker>
          </div>
        </div>
      </Reveal>
      <Reveal delay={d(1)} style={{ position: "absolute", left: 100, top: 640, padding: "18px 40px 20px 34px", background: "#0a1430", borderLeft: `10px solid ${orange}`, boxShadow: "0 18px 44px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: cyan, whiteSpace: "nowrap", height: 68, minWidth: 600 }}>
          {SITE.slice(0, typed)}
          <span style={{ opacity: caret ? 1 : 0, color: "#fff" }}>|</span>
        </div>
      </Reveal>
      <div style={{ position: "absolute", inset: 0, perspective: 2600 }}>
        <div style={{ position: "absolute", left: 930, top: 250 + lift, transform: `rotateY(${-20 + 11 * travel}deg) rotateX(4deg)`, transformOrigin: "left center" }}>
          <MiniBrowser width={900} src={IMG("hero.jpg")} title={SITE} />
        </div>
      </div>
    </SceneShell>
  );
};

// Outro: the "group photo". One still per feature flies in from four sides around the contact card; the link types itself in.
// Fill from brief.md: only what the user chose to make public. FANPAGE is the headline contact, LINK types itself in below it.
const FANPAGE = "<từ brief.md>";
const LINK = "<từ brief.md>";
const photos: { src: string; from: [number, number]; rot: number }[] = [
  { src: "hero.jpg", from: [-1300, 0], rot: -3 },
  { src: "feature_a.jpg", from: [0, 520], rot: 2 },
  { src: "admin.jpg", from: [0, 520], rot: -2 },
  { src: "feature_b.jpg", from: [1300, 0], rot: 3 },
];

const Photo: React.FC<{ src: string; from: [number, number]; rot: number; delay: number; phase: number }> = ({ src, from, rot, delay, phase }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 22], [0, 1], { ...clamp, easing: snap });
  const settle = Math.sin(frame / 30 + phase) * 4;
  return (
    <div style={{ translate: `${(1 - p) * from[0]}px ${(1 - p) * from[1] + settle * p}px`, rotate: `${rot * p}deg`, opacity: Math.min(1, p * 3), boxShadow: "0 18px 40px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.16)", borderRadius: 10, overflow: "hidden" }}>
      <Img src={staticFile(IMG(src))} style={{ display: "block", width: 340, height: 154 }} />
    </div>
  );
};

const OUTRO_INDEX = 3;
const SceneOutro: React.FC<SceneProps> = (props) => {
  const frame = useCurrentFrame();
  const d = (item: number) => revealDelay(OUTRO_INDEX, item, props.speechFrames);
  const typed = Math.max(0, Math.min(LINK.length, Math.floor((frame - d(1) - 14) / 1.3)));
  const caret = typed < LINK.length || Math.floor(frame / 15) % 2 === 0;
  const underline = interpolate(frame, [d(2), d(2) + 20], [0, 100], { ...clamp, easing: snap });
  return (
    <SceneShell {...props} label="Liên hệ">
      <Reveal delay={d(0)} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.25 }}>Nhận mã nguồn tên dự án</div>
        <div style={{ color: orange, fontSize: 124, fontWeight: 900, lineHeight: 1.2, marginTop: 28 }}>MIỄN PHÍ</div>
      </Reveal>
      <Reveal delay={d(1)} style={{ alignSelf: "center", padding: "20px 52px 22px 44px", background: "#0a1430", borderLeft: `12px solid ${accent}`, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 6, color: orange }}>LIÊN HỆ</div>
        <div style={{ fontSize: 58, fontWeight: 900, whiteSpace: "nowrap", marginTop: 2 }}>{FANPAGE}</div>
        <div style={{ fontSize: 48, fontWeight: 700, color: cyan, whiteSpace: "nowrap", marginTop: 4, height: 58 }}>
          {LINK.slice(0, typed)}
          <span style={{ opacity: caret ? 1 : 0, color: "#fff" }}>|</span>
        </div>
        <div style={{ height: 6, width: `${underline}%`, background: orange, marginTop: 10 }} />
      </Reveal>
      <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
        {photos.map((photo, i) => (
          <Photo key={photo.src} {...photo} delay={d(0) + 6 + i * 5} phase={i * 1.7} />
        ))}
      </div>
    </SceneShell>
  );
};

const demoScene = (index: number): React.FC<SceneProps> => {
  const Scene: React.FC<SceneProps> = (props) => <DemoScene {...props} index={index} />;
  return Scene;
};

// Same order as the narration in scripts/generate-<topic>-audio.ts.
export const scenes: React.FC<SceneProps>[] = [Scene1Hook, ...[1].map(demoScene), SceneReference, SceneOutro];
