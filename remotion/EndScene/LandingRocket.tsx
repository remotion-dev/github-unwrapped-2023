import React, { useMemo } from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { Planet, Rocket } from "../../src/config";
import { getFlame, takeOffSpeedFucntion } from "../Opening/TakeOff";
import { RocketSide } from "../Spaceship";
import { remapSpeed } from "../TopLanguages/remap-speed";

export const LandingRocket: React.FC<{
  rocket: Rocket;
  planetType: Planet;
}> = ({ rocket, planetType }) => {
  const frame = useCurrentFrame();

  const reversedFrame = 50 - frame;
  const acceleratedFrame = remapSpeed(reversedFrame, takeOffSpeedFucntion);

  const finalOffset = useMemo(() => {
    if (planetType === "Ice") {
      return 500;
    }

    if (planetType === "Gold") {
      return 550;
    }

    return 450;
  }, [planetType]);

  const rocketOffset = interpolate(
    acceleratedFrame,
    [0, 50],
    [finalOffset, -500],
  );

  const height = interpolate(frame, [30, 70], [200, 30]);
  const marginTop = height / 2;

  return (
    <AbsoluteFill
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        marginTop: rocketOffset,
        transform: "scale(0.7)",
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
