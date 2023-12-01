import { noise2D } from "@remotion/noise";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { remapSpeed } from "../TopLanguages/remap-speed";
import Spaceship from "./Spaceship";
import { TransparentVideo } from "./TransparentVideo";

const speedFunction = (f: number) => 10 ** interpolate(f, [0, 150], [-1, 4]);
const speedFunctionShake = (f: number) =>
  10 ** interpolate(f, [0, 80, 150], [-1, 3, 1]);

export const TakeOff: React.FC = () => {
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
          transform:
            "scale(0.4) translateX(445px) translateY(1250px) rotate(-90deg)",
        }}
      >
        <TransparentVideo
          safari={staticFile(
            "FootageCrate-4K_Rocket_Exhaust_Cyan_Angle_Front-prores-vp9-chrome.webm",
          )}
          other={staticFile(
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
        <Spaceship />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
