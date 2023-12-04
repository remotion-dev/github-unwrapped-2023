import { noise2D } from "@remotion/noise";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { Rocket } from "../../src/config";
import { remapSpeed } from "../TopLanguages/remap-speed";
import Spaceship from "./Spaceship";
import { TransparentVideo } from "./TransparentVideo";

const speedFunction = (f: number) => 10 ** interpolate(f, [0, 120], [-1, 4]);
const speedFunctionShake = (f: number) =>
  10 ** interpolate(f, [0, 80, 150], [-1, 3, 1]);

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
          transform: "rotate(-90deg) translateX(-180px) translateY(495px)",
        }}
      >
        <TransparentVideo
          style={{
            width: 472,
          }}
          other={staticFile(
            "FootageCrate-4K_Rocket_Exhaust_Cyan_Angle_Front-prores-vp9-chrome.webm",
          )}
          safari={staticFile(
            "FootageCrate-4K_Rocket_Exhaust_Cyan_Angle_Front-prores-hevc-safari.mp4",
          )}
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
