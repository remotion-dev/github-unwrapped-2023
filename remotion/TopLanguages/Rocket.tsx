import { getPointAtLength, getTangentAtLength } from "@remotion/paths";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  RATE_DECREASE,
  TOP_LANGUAGES_DURATION,
  TRANSFORM_PATH_X,
  TRANSFORM_PATH_Y,
} from "../../types/constants";
import {
  ACTION_DURATION,
  complexCurvePathLength,
  firstPushEnd,
  fourthPushEnd,
  fourthPushStart,
  newPath,
  PLANET_1_POSITION,
  PLANET_2_POSITION,
  PLANET_3_POSITION,
  secondPushEnd,
  secondPushStart,
  thirdPushEnd,
  thirdPushStart,
} from "./constants";
import {
  NewRocketSVG,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/NewRocketSVG";

export const getActionFrames = (actionLocations: number[]) => {
  return (
    actionLocations
      //sort ascending
      .sort((a, b) => a - b)
      .map((percentage, index) => {
        // index must be added because the duration from every previous action should be considered
        const actionStartFrame =
          Math.floor(percentage * TOP_LANGUAGES_DURATION) - ACTION_DURATION / 2;
        const actionEndFrame = actionStartFrame + ACTION_DURATION;
        // start frame is included in action time, actionEndFrame is not
        return [actionStartFrame, actionEndFrame];
      })
  );
};

export const getRate = ({
  frame,
  actionLocations,
}: {
  frame: number;
  actionLocations: number[];
}) => {
  // [ [25, 30], [45,50] ]
  const actionFrames = getActionFrames(actionLocations.sort((a, b) => a - b));

  return interpolate(
    frame,
    [0, ...actionFrames.flat(), TOP_LANGUAGES_DURATION],
    [0, ...actionLocations.flatMap((l) => [l, l]), 1]
  );
};

export const getNewRate = (frame: number) => {
  const push1 = interpolate(frame, [0, firstPushEnd], [0, PLANET_1_POSITION], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const push2 = interpolate(
    frame,
    [secondPushStart, secondPushEnd],
    [0, PLANET_2_POSITION - PLANET_1_POSITION],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const push3 = interpolate(
    frame,
    [thirdPushStart, thirdPushEnd],
    [0, PLANET_3_POSITION - PLANET_2_POSITION],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const push4 = interpolate(
    frame,
    [fourthPushStart, fourthPushEnd],
    [0, 1 - PLANET_3_POSITION],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return push1 + push2 + push3 + push4;
};

export const getRates = (stopAtFrames: number[]) => {
  // sort descending
  stopAtFrames = stopAtFrames.sort((a, b) => a - b);
  return stopAtFrames.map((f, i) => (f - i * ACTION_DURATION) * RATE_DECREASE);
};

export const Rocket: React.FC = () => {
  const frame = useCurrentFrame();
  const newRate = getNewRate(frame);

  const point = getPointAtLength(newPath, complexCurvePathLength * newRate);

  const tan = getTangentAtLength(newPath, complexCurvePathLength * newRate);
  const angleInRadians = Math.atan2(tan.y, tan.x);
  const angleInDegrees = angleInRadians * (180 / Math.PI) + 90;

  const rocketX = point.x - TL_ROCKET_WIDTH / 2;
  const rocketY = point.y - TL_ROCKET_HEIGHT / 2;

  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${TRANSFORM_PATH_Y}px) translateX(${TRANSFORM_PATH_X})`,
      }}
    >
      <AbsoluteFill>
        <svg
          style={{ width: 2160, height: 2160 }}
          viewBox="0 0 2160 2160"
          fill="none"
          overflow="visible"
        >
          <path d={newPath} stroke="white" strokeWidth="0" />
        </svg>
      </AbsoluteFill>
      <NewRocketSVG
        style={{
          transform: `translateX(${rocketX}px) translateY(${rocketY}px) rotate(${angleInDegrees}deg)`,
          transformBox: "fill-box",
        }}
      />
    </AbsoluteFill>
  );
};
