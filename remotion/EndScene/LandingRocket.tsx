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

  const offset = interpolate(starship, [0, 1], [0, 560]);

  const height = interpolate(frame, [100, 180], [300, 30]);
  const marginTop = height / 2;

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        marginTop: offset,
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OffthreadVideo
          style={{
            width: height,
            height: 100,
            objectFit: "fill",
            transform: `rotate(-90deg)`,
            marginTop: -500 + marginTop,
            marginLeft: 20,
          }}
          muted
          transparent
          src={getFlame(rocket)}
        />
      </AbsoluteFill>
      <div
        style={{
          width: 400,
          position: "relative",
          top: -600,
        }}
      >
        <RocketSide rocket={rocket} />
      </div>
    </AbsoluteFill>
  );
};
