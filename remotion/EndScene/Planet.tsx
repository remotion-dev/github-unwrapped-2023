import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const GoldPlanet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Img
        src={staticFile("golden-planet.png")}
        style={{
          width: 900,
          position: "absolute",
        }}
      />
    </AbsoluteFill>
  );
};
