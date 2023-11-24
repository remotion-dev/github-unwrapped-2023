import { noise2D } from "@remotion/noise";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { OctocatBody } from "../../vite/VideoPage/Background/Octocat-body";
import { OctocatLine } from "../../vite/VideoPage/Background/octocat-line";

export const TitleCardOctocat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr =
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
    }) * 0.9;

  const x =
    interpolate(spr, [0, 1], [200, 0]) + noise2D("x", frame / 100, 0) * 10;
  const y =
    interpolate(spr, [0, 1], [400, 0]) + noise2D("y", frame / 100, 0) * 10;

  return (
    <AbsoluteFill>
      <svg
        style={{
          position: "fixed",
          width: "200%",
          bottom: 0,
          right: -100,
          transform: `translate(${x}px, ${y}px)`,
        }}
        viewBox="0 0 1442 997"
        fill="none"
      >
        <OctocatBody />
        <OctocatLine mode="remotion" time={frame * 6} />
      </svg>
    </AbsoluteFill>
  );
};
