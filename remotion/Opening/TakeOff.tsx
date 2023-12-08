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
import { isIosSafari } from "./devices";

export const takeOffSpeedFucntion = (f: number) =>
  10 ** interpolate(f, [0, 120], [-1, 4]);
const speedFunctionShake = (f: number) =>
  10 ** interpolate(f, [0, 80, 150], [-1, 3, 1]);

export const getFlame = (rocket: Rocket) => {
  if (isIosSafari()) {
    if (rocket === "yellow") {
      return staticFile("exhaust-orange-hevc-safari.mp4");
    }

    if (rocket === "orange") {
      return staticFile("exhaust-orange-hevc-safari.mp4");
    }

    if (rocket === "blue") {
      return staticFile("exhaust-blue-hevc-safari.mp4");
    }

    throw new Error("Unknown rocket");
  }

  if (rocket === "yellow") {
    return staticFile("exhaust-orange-vp9-chrome.webm");
  }

  if (rocket === "orange") {
    return staticFile("exhaust-orange-vp9-chrome.webm");
  }

  if (rocket === "blue") {
    return staticFile("exhaust-blue-vp9-chrome.webm");
  }

  throw new Error("Unknown rocket");
};

export const getTakeOffAssetToPrefetch = (rocket: Rocket) => {
  return [getFlame(rocket)];
};

export const TakeOff: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const frame = useCurrentFrame();
  const acceleratedFrame = remapSpeed(frame, takeOffSpeedFucntion);
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
          transparent
          src={getFlame(rocket)}
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
