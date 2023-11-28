import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Gradient } from "../Gradients/NativeGradient";
import { PATHS_COMP_HEIGHT } from "./Path";
import { WholePaths } from "./WholePaths";

const endHeight = 1080;

export const PullRequests: React.FC = () => {
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
      <AbsoluteFill style={{}}>
        <Gradient gradient="blueRadial" />
      </AbsoluteFill>
      <WholePaths extraPaths={15} />;
    </AbsoluteFill>
  );
};
