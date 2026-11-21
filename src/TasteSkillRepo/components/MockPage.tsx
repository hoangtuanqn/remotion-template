import React from "react";
import { orange } from "../theme";

// A deliberately generic AI-looking landing page: purple gradient, rounded cards, stock-like image block.
export const MockPage: React.FC<{ hue?: number; width: number; height: number; title?: boolean }> = ({ hue = 0, width, height, title = false }) => (
  <div style={{ width, height, borderRadius: 18, overflow: "hidden", position: "relative", background: `linear-gradient(160deg, hsl(${265 + hue} 70% 40%), hsl(${300 + hue} 70% 55%))`, filter: "saturate(1.1)" }}>
    <div style={{ position: "absolute", top: height * 0.05, left: width * 0.06, right: width * 0.06, height: height * 0.06, display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: width * 0.2, height: "100%", borderRadius: 99, background: "#ffffffcc" }} />
      <div style={{ display: "flex", gap: width * 0.03 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: width * 0.1, height: "100%", borderRadius: 99, background: "#ffffff55" }} />
        ))}
      </div>
    </div>
    {title ? (
      <div style={{ position: "absolute", top: height * 0.17, left: width * 0.06, right: width * 0.06, fontFamily: "Arial, sans-serif", fontSize: width * 0.1, fontWeight: 700, color: "#fff", lineHeight: 1.1, whiteSpace: "nowrap" }}>Build the future</div>
    ) : (
      <>
        <div style={{ position: "absolute", top: height * 0.18, left: width * 0.06, width: width * 0.7, height: height * 0.07, borderRadius: 12, background: "#fff" }} />
        <div style={{ position: "absolute", top: height * 0.28, left: width * 0.06, width: width * 0.5, height: height * 0.07, borderRadius: 12, background: "#fff" }} />
      </>
    )}
    <div style={{ position: "absolute", top: height * (title ? 0.32 : 0.4), left: width * 0.06, width: width * 0.3, height: height * 0.08, borderRadius: 99, background: orange }} />
    <div style={{ position: "absolute", bottom: height * 0.06, left: width * 0.06, right: width * 0.06, display: "flex", gap: width * 0.04 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ flex: 1, height: height * 0.3, borderRadius: 22, background: "#ffffff30", border: "2px solid #ffffff55" }} />
      ))}
    </div>
  </div>
);
