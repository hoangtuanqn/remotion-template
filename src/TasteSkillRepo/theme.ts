import React from "react";

export const accent = "#6ea8ff";
export const cyan = "#54f0ca";
export const orange = "#ffa94d";
export const red = "#ff6b6b";
export const green = "#4ade80";
export const muted = "#9fb0c8";
export const mono = "Consolas, monospace";

export const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.13)",
  borderRadius: 32,
};

export const gradientText = (from = accent, to = cyan): React.CSSProperties => ({
  background: `linear-gradient(90deg, ${from}, ${to})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
});
