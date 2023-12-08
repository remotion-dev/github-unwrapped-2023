import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const IcePlanet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Img
        style={{
          width: 900,
          transform: `translateY(600px)`,
        }}
        src={staticFile("planet-ice.png")}
      />
    </AbsoluteFill>
  );
};
