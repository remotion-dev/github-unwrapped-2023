import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import { VIDEO_FPS } from "../../types/constants";
import { GoldPlanet } from "./Planet";

export const PlanetAsset: React.FC = () => {
  const frame = useCurrentFrame();

  const moveUp = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    config: {
      damping: 200,
    },
  });

  const marginTop = interpolate(moveUp, [0, 1], [200, 0]);

  return (
    <AbsoluteFill style={{ marginTop }}>
      <GoldPlanet />
    </AbsoluteFill>
  );
};
