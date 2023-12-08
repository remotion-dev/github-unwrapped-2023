import React from "react";
import { AbsoluteFill, spring, useCurrentFrame } from "remotion";
import type { Rocket } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { RocketSide } from "../Spaceship";

export const LandingRocket: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const frame = useCurrentFrame();
  const starship = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    delay: 0,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        left: 330,
      }}
    >
      <div
        style={{
          width: 400,
          position: "relative",
          top: -600 + 1150 * starship,
        }}
      >
        <RocketSide rocket={rocket} />
      </div>
    </AbsoluteFill>
  );
};
