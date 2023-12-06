import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { Rocket } from "../../src/config";
import { TRANSFORM_PATH_X, TRANSFORM_PATH_Y } from "../../types/constants";
import { moveAlongLine } from "../move-along-line";
import {
  PLANET_1_POSITION,
  PLANET_2_POSITION,
  PLANET_3_POSITION,
  complexCurvePathLength,
  firstPushEnd,
  fourthPushEnd,
  fourthPushStart,
  newPath,
  secondPushEnd,
  secondPushStart,
  thirdPushEnd,
  thirdPushStart,
} from "./constants";
import {
  RocketFront,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/FrontRocketSource";

const getNewRate = (frame: number) => {
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
    },
  );

  const push3 = interpolate(
    frame,
    [thirdPushStart, thirdPushEnd],
    [0, PLANET_3_POSITION - PLANET_2_POSITION],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const push4 = interpolate(
    frame,
    [fourthPushStart, fourthPushEnd],
    [0, 1 - PLANET_3_POSITION],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return push1 + push2 + push3 + push4;
};

export const TopLanguagesRocket: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const frame = useCurrentFrame();
  const newRate = getNewRate(frame);

  const point = getPointAtLength(newPath, complexCurvePathLength * newRate);

  const { angleInDegrees } = moveAlongLine(newPath, newRate);

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
          style={{ width: 1080, height: 1080 }}
          viewBox="0 0 1080 1080"
          fill="none"
          overflow="visible"
        >
          <path d={newPath} stroke="white" strokeWidth="0" />
        </svg>
      </AbsoluteFill>
      <RocketFront
        rocket={rocket}
        style={{
          transform: `translateX(${rocketX}px) translateY(${rocketY}px) rotate(${angleInDegrees}deg)`,
          transformBox: "fill-box",
        }}
      />
    </AbsoluteFill>
  );
};
