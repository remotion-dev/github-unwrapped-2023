import React from "react";
import { AbsoluteFill, Img, spring, useCurrentFrame } from "remotion";
import { GOLD_PLANET_BG } from ".";
import { VIDEO_FPS } from "../../types/constants";

export const PlanetBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const gradient = spring({
    fps: VIDEO_FPS,
    frame: frame / 6,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        top: gradient * 800 - 800,
        left: gradient * 800 - 800,
      }}
    >
      <Img src={GOLD_PLANET_BG} />
    </AbsoluteFill>
  );
};
