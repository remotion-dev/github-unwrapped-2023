import { noise2D } from "@remotion/noise";
import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { Rocket } from "../../src/config";
import { remapSpeed } from "../TopLanguages/remap-speed";
import Spaceship from "./RocketFront";
import { isIosSafari } from "./TransparentVideo";

const speedFunction = (f: number) => 10 ** interpolate(f, [0, 120], [-1, 4]);
const speedFunctionShake = (f: number) =>
  10 ** interpolate(f, [0, 80, 150], [-1, 3, 1]);

// TODO: Should be dependent on rocket
const getFlame = () => {
  if (isIosSafari()) {
    return staticFile(
      "FootageCrate-4K_Rocket_Exhaust_Cyan_Angle_Front-prores-hevc-safari.mp4",
    );
  }

  return staticFile(
    "FootageCrate-4K_Rocket_Exhaust_Cyan_Angle_Front-prores-vp9-chrome.webm",
  );
};

export const getTakeOffAssetToPrefetch = () => {
  return [getFlame()];
};

export const TakeOff: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const frame = useCurrentFrame();
  const acceleratedFrame = remapSpeed(frame, speedFunction);
  const acceleratedShakeFrame = remapSpeed(frame, speedFunctionShake);

  const translateX = interpolate(acceleratedFrame, [0, 100], [0, -100]);

  const noiseX = noise2D("seedX", acceleratedShakeFrame / 50, 0) * 3;
  const noiseY = noise2D("seedY", frame / 10, 0) * 2;

  return (
    <AbsoluteFill style={{ top: translateX }}>
      <AbsoluteFill />
      <AbsoluteFill
        style={{
          transform: "rotate(-90deg) translateX(-200px) translateY(495px)",
        }}
      >
        <OffthreadVideo
          style={{
            width: 472,
          }}
          muted
          src={getFlame()}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `scale(0.8) translateY(${90 + noiseY}px) translateX(${
            noiseX + 20
          }px)`,
        }}
      >
        <Spaceship rocket={rocket} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
