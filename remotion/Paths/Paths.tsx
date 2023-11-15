import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { WholePaths } from "./WholePaths";

const initialHeight = 4275;
const initialWidth = 1080;

export const Paths: React.FC = () => {
  const initialOffset = initialHeight - initialWidth;
  const frame = useCurrentFrame();
  const evolution = interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const offset = interpolate(evolution, [0, 1], [initialOffset, 0], {});

  return (
    <AbsoluteFill
      style={{
        height: initialHeight,
        width: 1080,
        marginTop: -offset,
      }}
    >
      <WholePaths extraPaths={8} evolution={evolution}></WholePaths>;
    </AbsoluteFill>
  );
};
