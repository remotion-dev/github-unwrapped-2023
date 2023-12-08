import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const totalWidth = 1900;

export const SilverPlanet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 310,
      }}
    >
      <Img
        style={{
          width: totalWidth,
          transform: `rotate(-100deg)`,
        }}
        src={staticFile("planet-silver.png")}
      />
    </AbsoluteFill>
  );
};
