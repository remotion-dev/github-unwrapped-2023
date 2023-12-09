import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const PATHS_COMP_HEIGHT = 4275;
export const PATH_ANIMATION_DURATION = 200;

const BLURRED_DOT = staticFile("blurred-dot.png");

export const getPullRequestsAssets = () => {
  return [BLURRED_DOT];
};

export const Path: React.FC<{
  d: string;
  stroke: string;
  delay: number;
  hideDot: boolean;
}> = ({ d, stroke, delay, hideDot }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [0 + delay, PATH_ANIMATION_DURATION + delay],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.ease),
    },
  );

  const { pointAtLength, strokeDasharray, strokeDashoffset } = useMemo(() => {
    const {
      strokeDasharray: _strokeDasharray,
      strokeDashoffset: _strokeDashoffset,
    } = evolvePath(progress, d);
    const length = getLength(d);
    const _pointAtLength = getPointAtLength(d, progress * length);
    return {
      strokeDasharray: _strokeDasharray,
      strokeDashoffset: _strokeDashoffset,
      pointAtLength: _pointAtLength,
    };
  }, [d, progress]);

  return (
    <AbsoluteFill>
      <svg
        width="1080"
        height={PATHS_COMP_HEIGHT}
        viewBox={`0 0 1080 ${PATHS_COMP_HEIGHT}`}
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
      {hideDot ? null : (
        <Img
          style={{
            height: 100,
            width: 100,
            marginLeft: -50,
            marginTop: -50,
            position: "absolute",
            top: pointAtLength.y,
            left: pointAtLength.x,
          }}
          src={BLURRED_DOT}
        />
      )}
    </AbsoluteFill>
  );
};
