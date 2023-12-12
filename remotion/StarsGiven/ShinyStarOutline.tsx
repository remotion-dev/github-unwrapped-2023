import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const SHINY_STAR_OUTLINE_ASSET = staticFile("shinystaroutline.png");

export const ShinyStarOutline: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 1080,
        width: 1080,
        overflow: "hidden",
        backgroundColor: "#0A111B",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.8,
          scale: "0.75",
          pointerEvents: "none",
        }}
      >
        <Img src={SHINY_STAR_OUTLINE_ASSET} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
