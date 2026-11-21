import React from "react";
import { useCurrentFrame } from "remotion";
import { Reveal, SceneProps, SceneShell } from "../components/SceneShell";
import { revealDelay } from "../reveals";
import { glass, green, mono, orange, red } from "../theme";

const SCENE = 1;
const files = ["create_login_attempts_table", "LoginAttempt (model)", "CheckLoginAttempts (middleware)", "UnlockAccounts (cron)"];
const rows = files.flatMap((file, f) => [
  { head: file, add: true, width: 0 },
  ...Array.from({ length: 9 }, (_, i) => ({ head: "", add: (i * 7 + f) % 5 > 1, width: 120 + (((i + f * 3) * 53) % 420) })),
]);

const DiffTicker: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...glass, height: 520, overflow: "hidden", position: "relative", padding: 28 }}>
      <div style={{ translate: `0 ${-(frame * 22) % (rows.length * 40)}px` }}>
        {rows.concat(rows).map((r, i) =>
          r.head ? (
            <div key={i} style={{ height: 40, fontFamily: mono, fontSize: 28, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
              {"+++ "}
              {r.head}
            </div>
          ) : (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, height: 40, fontFamily: mono, fontSize: 30, color: r.add ? green : red }}>
              <span>{r.add ? "+" : "-"}</span>
              <div style={{ width: r.width, height: 16, borderRadius: 8, background: r.add ? "#4ade8066" : "#ff6b6b66" }} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; sub: string; color: string }> = ({ title, sub, color }) => (
  <div style={{ ...glass, padding: "30px 28px", height: "100%", boxSizing: "border-box", borderColor: `${color}88` }}>
    <div style={{ fontSize: 44, fontWeight: 900, color, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 30, color: "#b8c6d9", marginTop: 10 }}>{sub}</div>
  </div>
);

export const Scene2Pain: React.FC<SceneProps> = (props) => {
  const delay = (i: number) => revealDelay(SCENE, i, props.speechFrames);
  return (
    <SceneShell {...props} label="VẤN ĐỀ">
      <DiffTicker />
      <div style={{ display: "flex", gap: 24 }}>
        <Reveal delay={delay(0)} fromX={-300} style={{ flex: 1 }}>
          <Card title={"Code dài,\nkhó review"} sub="Dựng cả hệ thống" color={orange} />
        </Reveal>
        <Reveal delay={delay(1)} fromX={300} style={{ flex: 1 }}>
          <Card title={"Nhiều code,\nnhiều chỗ hở"} sub="Càng rủi ro với bảo mật" color={red} />
        </Reveal>
      </div>
    </SceneShell>
  );
};
