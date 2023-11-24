import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { OctocatBody } from "../../vite/VideoPage/Background/Octocat-body";
import { NewOctocatLine } from "./NewOctocatLine";
import { getOctocatLine } from "./octocat-line";

export const FloatingOctocat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 40,
  });

  const d = getOctocatLine();

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
      <OctocatBody />
      <NewOctocatLine progress={spr} d={d} />
    </svg>
  );
};
