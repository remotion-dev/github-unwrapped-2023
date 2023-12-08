import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { Rocket } from "../../src/config";
import { getFlame, takeOffSpeedFucntion } from "../Opening/TakeOff";
import { RocketSide } from "../Spaceship";
import { remapSpeed } from "../TopLanguages/remap-speed";

export const LandingRocket: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const frame = useCurrentFrame();

  const reversedFrame = 50 - frame;
  const acceleratedFrame = remapSpeed(reversedFrame, takeOffSpeedFucntion);

  const rocketOffset = interpolate(acceleratedFrame, [0, 50], [550, 0]);

  const height = interpolate(frame, [30, 70], [300, 30]);
  const marginTop = height / 2;

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        marginTop: rocketOffset,
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
          startFrom={110}
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
