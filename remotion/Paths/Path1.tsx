import { evolvePath } from "@remotion/paths";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const Path1: React.FC<{
  d: string;
  stroke: string;
}> = ({ d, stroke }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);

  return (
    <AbsoluteFill>
      <svg width="1080" height="4275" viewBox="0 0 1080 4275" fill="none">
        <path
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          d={d}
          stroke={stroke}
          stroke-width="5"
          stroke-miterlimit="10"
        />
      </svg>
    </AbsoluteFill>
  );
};
