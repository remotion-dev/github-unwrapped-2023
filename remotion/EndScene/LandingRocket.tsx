import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import type { Rocket } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { getFlame } from "../Opening/TakeOff";
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

  const offset = interpolate(starship, [0, 1], [0, 1150]);

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        left: 330,
        marginTop: offset,
      }}
    >
      <div
        style={{
          width: 400,
          position: "relative",
          top: -600,
        }}
      >
        <RocketSide rocket={rocket} />
        <OffthreadVideo
          style={{
            width: 472,
          }}
          muted
          transparent
          src={getFlame(rocket)}
        />
      </div>
    </AbsoluteFill>
  );
};
