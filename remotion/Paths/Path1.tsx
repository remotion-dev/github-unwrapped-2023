import { evolvePath } from "@remotion/paths";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const Path1: React.FC<{
  d: string;
  stroke: string;
}> = ({ d, stroke }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);

  return (
    <AbsoluteFill>
      <svg
        width="1080"
        height="4275"
        viewBox="0 0 1080 4275"
        fill="none"
        style={{
          overflow: "visible",
        }}
      >
        <path
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          d={d}
          stroke={stroke}
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </svg>
    </AbsoluteFill>
  );
};
