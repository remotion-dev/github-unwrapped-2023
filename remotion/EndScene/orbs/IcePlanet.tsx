import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const container: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
};

export const IcePlanet: React.FC = () => {
  return (
    <AbsoluteFill style={container}>
      <Img
        style={{
          width: 700,
        }}
        src={staticFile("planet-ice.png")}
      />
    </AbsoluteFill>
  );
};
