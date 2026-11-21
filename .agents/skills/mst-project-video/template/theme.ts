import { CSSProperties } from "react";

// MST Software palette: blue and cyan from the logo, orange only for highlighted keywords.
export const accent = "#38a3ff";
export const cyan = "#00d2ff";
export const orange = "#ff8a1f";
export const gold = "#ffb020";
export const muted = "#9fb3cc";

// Frosted dark card used for chips, callouts and slides.
export const glass: CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "2px solid rgba(255,255,255,0.13)",
  borderRadius: 28,
};

// Gradient-filled text for big titles and figures.
export const gradientText = (from: string, to: string): CSSProperties => ({
  background: `linear-gradient(90deg, ${from}, ${to})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});
