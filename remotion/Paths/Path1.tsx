import { evolvePath } from "@remotion/paths";
import { AbsoluteFill } from "remotion";

export const Path1: React.FC<{
  progress: number;
  d: string;
  stroke: string;
}> = ({ progress, d, stroke }) => {
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
