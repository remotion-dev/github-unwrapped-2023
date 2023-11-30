import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import { PATHS_COMP_HEIGHT } from "./Path";
import { WholePaths } from "./WholePaths";

const endHeight = 1080;

export const pullRequestsSchema = z.object({
  totalPullRequests: z.number().min(0),
});

export const PullRequests: React.FC<z.infer<typeof pullRequestsSchema>> = ({
  totalPullRequests,
}) => {
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
      <AbsoluteFill>
        <Gradient gradient="blueRadial" />
      </AbsoluteFill>
      <WholePaths extraPaths={totalPullRequests} />;
    </AbsoluteFill>
  );
};
