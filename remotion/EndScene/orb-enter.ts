import { interpolate, spring } from "remotion";

const ORB_ENTER_TRANSITION = 40;

export const getOrbEnter = ({ frame, fps }: { frame: number; fps: number }) => {
  const entryProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: ORB_ENTER_TRANSITION,
  });

  const distance = interpolate(entryProgress, [0, 1], [3, 1.5], {});
  const offset = interpolate(entryProgress, [0, 1], [1700, 500]);

  return { scale: distance, offset, progress: entryProgress };
};
