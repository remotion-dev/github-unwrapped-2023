import { getPointAtLength, getTangentAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { RATE_DECREASE } from "../../types/constants";
import {
  ACTION_DURATION,
  complexCurvePathLength,
  newPath,
  PLANET_1_ACTION_FRAME,
  PLANET_2_ACTION_FRAME,
  PLANET_3_ACTION_FRAME,
} from "./constants";
import { RocketSVG, TL_ROCKET_HEIGHT, TL_ROCKET_WIDTH } from "./RocketSVG";

const getRate = ({
  frame,
  stopAtFrames,
}: {
  frame: number;
  stopAtFrames: number[];
}) => {
  // sort descending
  stopAtFrames = stopAtFrames.sort((a, b) => b - a);
  const timesStopped = stopAtFrames.findIndex(
    (f) => f + ACTION_DURATION <= frame
  );
  const correctedTimeStopped =
    timesStopped === -1 ? 0 : stopAtFrames.length - timesStopped;
  const isStopped = stopAtFrames.find(
    (f) => frame >= f && frame < f + ACTION_DURATION
  );

  const f =
    (isStopped ? isStopped : frame) - correctedTimeStopped * ACTION_DURATION;

  return f * RATE_DECREASE;
};

export const getRates = (stopAtFrames: number[]) => {
  stopAtFrames = stopAtFrames.sort((a, b) => a - b);
  return stopAtFrames.map((f, i) => (f - i * ACTION_DURATION) * RATE_DECREASE);
};

export const Rocket: React.FC<{}> = () => {
  const frame = useCurrentFrame();
  const rate = getRate({
    frame,
    stopAtFrames: [
      PLANET_1_ACTION_FRAME,
      PLANET_2_ACTION_FRAME,
      PLANET_3_ACTION_FRAME,
    ],
  });

  const point = getPointAtLength(newPath, complexCurvePathLength * rate);

  const tan = getTangentAtLength(newPath, complexCurvePathLength * rate);
  const angleInRadians = Math.atan2(tan.y, tan.x);
  const angleInDegrees = angleInRadians * (180 / Math.PI) - 45;

  const rocketX = point.x - TL_ROCKET_WIDTH / 2;
  const rocketY = point.y - TL_ROCKET_HEIGHT / 2;

  return (
    <AbsoluteFill style={{ transform: "translateY(160px)" }}>
      <AbsoluteFill style={{}}>
        <svg
          style={{ width: 2160, height: 2160 }}
          viewBox="0 0 2160 2160"
          fill="none"
          overflow="visible"
        >
          <path d={newPath} stroke="white" strokeWidth="3" />
        </svg>
      </AbsoluteFill>
      <RocketSVG
        style={{
          transform: `translateX(${rocketX}px) translateY(${rocketY}px) rotate(${angleInDegrees}deg)`,
          transformBox: "fill-box",
        }}
      />
    </AbsoluteFill>
  );
};
