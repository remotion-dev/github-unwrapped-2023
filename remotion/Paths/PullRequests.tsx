import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { accentColorSchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { accentColorToGradient } from "../Opening/TitleImage";
import { PATHS_COMP_HEIGHT } from "./Path";
import { WholePaths } from "./WholePaths";

const endHeight = 1080;

export const pullRequestsSchema = z.object({
  totalPullRequests: z.number().min(0),
  accentColor: accentColorSchema,
});

const MAX_PATHS = 50;
export const PULL_REQUESTS_DURATION = 240;

export const PullRequests: React.FC<z.infer<typeof pullRequestsSchema>> = ({
  totalPullRequests,
  accentColor,
}) => {
  const initialOffset = PATHS_COMP_HEIGHT - endHeight;
  const frame = useCurrentFrame();
  const evolution = interpolate(frame, [0, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const offset = interpolate(evolution, [0, 1], [initialOffset, 0]);

  const style: React.CSSProperties = useMemo(() => {
    return {
      height: PATHS_COMP_HEIGHT,
      width: 1080,
      marginTop: -offset,
    };
  }, [offset]);

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>
      <AbsoluteFill style={style}>
        <WholePaths
          initialPullRequests={Math.max(0, totalPullRequests - MAX_PATHS)}
          extraPaths={Math.min(MAX_PATHS, totalPullRequests)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
