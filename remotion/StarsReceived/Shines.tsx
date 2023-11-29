import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const Shine: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img src={staticFile("shine.png")} />
    </AbsoluteFill>
  );
};

export const Shines: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Shine />
    </AbsoluteFill>
  );
};
