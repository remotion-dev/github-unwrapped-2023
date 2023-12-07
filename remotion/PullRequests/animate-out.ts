import { interpolate, spring } from "remotion";

export const ANIMATE_OUT_DURATION_PR = 40;

export const animateOutPullRequest = ({
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
    durationInFrames: ANIMATE_OUT_DURATION_PR,
    reverse: true,
  });

  const distance = interpolate(entryProgress, [0 + 0.01, 1], [0.0000005, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scaleDivided = 1 / distance;
  return { scaleDivided, entryProgress };
};
