import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const PATHS_COMP_HEIGHT = 4275;

export const Path: React.FC<{
  d: string;
  stroke: string;
  delay: number;
}> = ({ d, stroke, delay }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0 + delay, 200 + delay], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);
  const length = getLength(d);
  const pointAtLength = getPointAtLength(d, progress * length);

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
        src={staticFile("blurred-dot.png")}
      ></Img>
    </AbsoluteFill>
  );
};
