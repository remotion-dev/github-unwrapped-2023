import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { WholePaths } from "./WholePaths";

export const PATHS_COMP_HEIGHT = 4275;

const endHeight = 1080;

export const Paths: React.FC = () => {
  const initialOffset = PATHS_COMP_HEIGHT - endHeight;
  const frame = useCurrentFrame();
  const evolution = interpolate(frame, [0, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const offset = interpolate(evolution, [0, 1], [initialOffset, 0], {});

  return (
    <AbsoluteFill
      style={{
        height: PATHS_COMP_HEIGHT,
        width: 1080,
        marginTop: -offset,
      }}
    >
      <WholePaths extraPaths={15}></WholePaths>;
    </AbsoluteFill>
  );
};
