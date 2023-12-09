import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const container: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
};

export const ICE_PLANET = staticFile("planet-ice.png");

export const IcePlanet: React.FC = () => {
  return (
    <AbsoluteFill style={container}>
      <Img
        style={{
          width: 1100,
          marginTop: 100,
        }}
        src={ICE_PLANET}
      />
    </AbsoluteFill>
  );
};
