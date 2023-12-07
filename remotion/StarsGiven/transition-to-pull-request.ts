import { interpolate, spring } from "remotion";

const TRANSITION_TO_PULL_REQUESTS = 70;

export const getTransitionToPullRequest = ({
  start,
  frame,
  fps,
}: {
  start: number;
  frame: number;
  fps: number;
}) => {
  const entryProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: start,
    durationInFrames: TRANSITION_TO_PULL_REQUESTS,
    reverse: true,
  });

  const distance = interpolate(
    entryProgress,
    [0 + 0.01, 1],
    [0.0000005, 1],
    {},
  );

  const scaleDivided = 1 / distance;
  return scaleDivided;
};
