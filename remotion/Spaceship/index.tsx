import React from "react";
import { AbsoluteFill, staticFile, Video } from "remotion";
import { SkyBg } from "./SkyBg";

export const Spaceship: React.FC = () => {
  return (
    <AbsoluteFill>
      <SkyBg></SkyBg>
      <AbsoluteFill>
        <Video
          src={staticFile("comparison.mp4")}
          style={{ opacity: 0.5 }}
        ></Video>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
