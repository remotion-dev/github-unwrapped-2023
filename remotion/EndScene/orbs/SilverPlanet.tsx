import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const totalWidth = 1400;

export const SilverPlanet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{ width: totalWidth, left: -(totalWidth - 1080) / 2, top: 650 }}
      >
        <Img
          style={{
            width: totalWidth,
            transform: `rotate(-100deg)`,
          }}
          src={staticFile("planet-silver.png")}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
