import React from "react";
import { Img, staticFile } from "remotion";

export const BrandHeader: React.FC = () => <Img src={staticFile("brand/logo-white.png")} style={{ position: "absolute", top: 100, left: 88, height: 120 }} />;
