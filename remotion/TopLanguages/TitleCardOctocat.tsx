import { noise2D } from "@remotion/noise";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { AccentColor } from "../../src/config";
import { FloatingOctocat } from "./FloatingOctocat";

export const TitleCardOctocat: React.FC<{
  accentColor: AccentColor;
}> = ({ accentColor }) => {
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
    <AbsoluteFill
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <FloatingOctocat accentColor={accentColor} />
    </AbsoluteFill>
  );
};
