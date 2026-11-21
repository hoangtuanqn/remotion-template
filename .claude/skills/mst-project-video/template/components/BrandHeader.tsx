import React from "react";
import { Img, staticFile } from "remotion";

// White MST logo on the dark background, top-left. Browser-frame scenes carry the logo in the frame's title bar instead.
export const BrandHeader: React.FC<{ channelName: string }> = ({ channelName }) => (
  <div style={{ position: "absolute", top: 44, left: 100 }}>
    <Img src={staticFile("brand/logo-white.png")} alt={channelName} style={{ height: 72, display: "block" }} />
  </div>
);
