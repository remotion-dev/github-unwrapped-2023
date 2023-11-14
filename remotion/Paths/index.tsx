import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { makeRandomPath } from "./make-random-path";
import { Path1 } from "./Path1";

export const WholePaths: React.FC = () => {
  const frame = useCurrentFrame();
  const evolution = interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill>
      <Path1
        progress={evolution}
        d={makeRandomPath("seed")}
        stroke="yellow"
      ></Path1>
      <Path1
        progress={evolution}
        d={
          "M540 4274.2C540 4274.2 540 4274.2 540 4007.1C540 3472.8 270 3472.8 270 2938.6C270 2404.4 810 2404.3 810 1870.1C810 1870.1 810 1870.1 810 1603C810 1068.7 540 1068.7 540 534.5C540 267.4 540 267.4 540 267.4"
        }
        stroke="#FF1515"
      ></Path1>
      <Path1
        d={
          "M540 4274.2C540 4274.2 540 4274.2 540 3739.9C540 3205.6 810 3205.6 810 2671.4C810 2137.2 540 2137.1 540 1602.9C540 1602.9 540 1870 540 1335.8C540 801.6 270 800.4 270 267.1C270 3.05176e-05 540 3.05176e-05 540 267.1"
        }
        progress={evolution}
        stroke="#10FF00"
      ></Path1>
      <Path1
        progress={evolution}
        stroke="#3F4DFF"
        d="M540 4274.2C540 4274.2 540 3739.9 540 3205.7C540 2671.5 270 2671.4 270 2137.2C270 1603 270 2137.2 270 1602.9C270 1068.6 810 1068.6 810 534.4C810 0.200043 810 534.4 810 267.3C810 0.200012 540 3.05176e-05 540 267.1"
      ></Path1>
      <Path1
        progress={evolution}
        stroke="#FF48EF"
        d="M540 4274.2C540 4274.2 540 4274.2 540 3739.9C540 3205.6 0 3205.6 0 2671.3C0 2137 540 2137 540 1602.8C540 1068.6 817.3 1335.7 817.3 801.4C817.3 534.3 540 534.3 540 267.1"
      ></Path1>
      <Path1
        stroke="#FF48EF"
        d="M540 4274.2C540 4274.2 540 3739.9 540 3205.7C540 2671.5 1080 2671.4 1080 2137.2C1080 1603 270 1335.7 270 801.4C270 534.3 540 534.3 540 267.1"
        progress={evolution}
      ></Path1>
    </AbsoluteFill>
  );
};
