import React from "react";
import { useCurrentFrame } from "remotion";
import { orange } from "../theme";

// A digit takes about five letters to say aloud, so "720p" lasts longer than it looks.
const speechWeight = (chunk: string) => {
  const plain = chunk.replace(/\*/g, "");
  return plain.length + 5 * (plain.match(/\d/g)?.length ?? 0);
};

// Caption format: chunks split by "|", at most 28 characters each. Wrap one keyword per chunk in *asterisks* to highlight it.
export const SubtitleBox: React.FC<{ caption: string; speechFrames: number }> = ({ caption, speechFrames }) => {
  const frame = useCurrentFrame();
  const chunks = caption.split("|").map((chunk) => chunk.trim());
  const total = chunks.reduce((sum, chunk) => sum + speechWeight(chunk), 0);
  const position = (frame / Math.max(1, speechFrames)) * total;
  let elapsed = 0;
  let active = chunks[chunks.length - 1];
  for (const chunk of chunks) {
    elapsed += speechWeight(chunk);
    if (position < elapsed) {
      active = chunk;
      break;
    }
  }
  const parts = active.split("*");
  return (
    <div style={{ position: "absolute", top: 1480, left: 45, right: 45, textAlign: "center" }}>
      <div style={{ display: "inline-block", whiteSpace: "nowrap", fontSize: 56, fontWeight: 800, color: "#ffffff", textShadow: "0 4px 24px #000c, 0 0 8px #000a" }}>
        {parts.map((part, i) => (i % 2 === 1 ? <span key={i} style={{ color: orange }}>{part}</span> : part))}
      </div>
    </div>
  );
};
