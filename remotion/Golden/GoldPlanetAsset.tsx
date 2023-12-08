import React from "react";
import { Img, spring, staticFile, useCurrentFrame } from "remotion";
import { VIDEO_FPS } from "../../types/constants";

export const GoldPlanetAsset: React.FC = () => {
  const frame = useCurrentFrame();
  const planet = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    config: {
      damping: 200,
    },
  });

  return (
    <Img
      src={staticFile("golden-planet.png")}
      style={{
        width: 900,
        position: "absolute",
        bottom: -300 + 200 * planet,
        left: 85,
      }}
    />
  );
};
