import { noise2D } from "@remotion/noise";
import { getLength, getTangentAtLength } from "@remotion/paths";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { OctocatBody } from "../../vite/VideoPage/Background/Octocat-body";
import { NewOctocatLine } from "./NewOctocatLine";
import { getOctocatLine } from "./octocat-line";

export const FloatingOctocat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationRestThreshold: 0.00001,
    durationInFrames: 100,
  });

  const noise1 = noise2D("seed1", (frame - 70) / 100, 0);
  const noise2 = noise2D("seed2", (frame - 70) / 100, 0);
  const noise3 = noise2D("seed1", frame / 100, 0);
  const noise4 = noise2D("seed2", frame / 100, 0);
  const noise5 = noise2D("seed5", frame / 100, 0);
  const noise6 = noise2D("seed6", frame / 100, 0);
  const noise7 = noise2D("seed7", frame / 100, 0);

  const endOffsetX = noise6 * 20;
  const endOffsetY = noise7 * 20;

  const d = getOctocatLine({
    noise1,
    noise2,
    noise3,
    noise4,
    noise5,
    endOffsetX,
    endOffsetY,
  });

  const angle = getTangentAtLength(d, getLength(d) * progress);
  const angleInRadians = Math.atan2(angle.y, angle.x);

  return (
    <svg
      viewBox="0 0 1442 997"
      style={{
        width: "200%",
        position: "absolute",
        right: 0,
        bottom: 0,
      }}
      fill="none"
    >
      <OctocatBody
        endOffsetX={endOffsetX}
        endOffsetY={endOffsetY}
        d={d}
        progress={progress}
        rotation={angleInRadians + Math.PI - 0.5}
      />
      <NewOctocatLine progress={progress} d={d} />
    </svg>
  );
};
