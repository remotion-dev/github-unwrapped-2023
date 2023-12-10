import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { accentColorSchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { accentColorToGradient } from "../Opening/TitleImage";
import { isMobileDevice } from "../Opening/devices";
import { PATHS_COMP_HEIGHT } from "./Path";
import { WholePaths } from "./WholePaths";
import { ANIMATE_OUT_DURATION_PR, animateOutPullRequest } from "./animate-out";

const endHeight = 1080;

export const pullRequestsSchema = z.object({
  totalPullRequests: z.number().min(0),
  accentColor: accentColorSchema,
});

const MAX_PATHS = 30;
export const PULL_REQUESTS_DURATION = 260;

export const PullRequests: React.FC<z.infer<typeof pullRequestsSchema>> = ({
  totalPullRequests,
  accentColor,
}) => {
  const initialOffset = PATHS_COMP_HEIGHT - endHeight;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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

  const { scaleDivided, entryProgress } = animateOutPullRequest({
    fps,
    frame,
    start: PULL_REQUESTS_DURATION - ANIMATE_OUT_DURATION_PR,
  });

  const translateY = interpolate(entryProgress, [1, 2], [0, 500]);
  const scale = interpolate(frame, [0, 60], [0, 0.05]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scaleDivided + scale}) translateY(${translateY}px)`,
      }}
    >
      {isMobileDevice() ? null : (
        <Audio startFrom={40} src={staticFile("reverb.mp3")} />
      )}
      {isMobileDevice() ? null : (
        <Sequence from={175}>
          <Audio src={staticFile("weigh.mp3")} volume={0.6} />
        </Sequence>
      )}
      <AbsoluteFill style={style}>
        <AbsoluteFill>
          <Gradient gradient={accentColorToGradient(accentColor)} />
        </AbsoluteFill>
        <WholePaths
          initialPullRequests={Math.max(0, totalPullRequests - MAX_PATHS)}
          extraPaths={Math.min(MAX_PATHS, totalPullRequests)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
