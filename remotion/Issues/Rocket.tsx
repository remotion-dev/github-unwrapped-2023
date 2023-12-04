import type { SVGProps } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import type { Rocket } from "../../src/config";
import {
  RocketFront,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "../TopLanguages/svgs/NewRocketSVG";
import {
  ROCKET_ORIGIN_X,
  ROCKET_TOP_Y,
  TIME_BEFORE_SHOOTING,
} from "./constants";
import type { ShotWithShootDelay } from "./get-shots-to-fire";
import { rocketRotation } from "./make-ufo-positions";

export const ROCKET_JUMP_IN_DURATION = 20;
export const ROCKET_JUMP_IN_DELAY = TIME_BEFORE_SHOOTING - 30;

export const RocketComponent = ({
  shots,
  jumpIn,
  rocket,
  ...props
}: SVGProps<SVGSVGElement> & {
  shots: ShotWithShootDelay[];
  jumpIn: number;
  rocket: Rocket;
}) => {
  const frame = useCurrentFrame();

  const yOffset = interpolate(jumpIn, [0, 1], [400, 0]);

  const normalRocketRotation = rocketRotation(shots, frame) + Math.PI / 2;
  const rotation = interpolate(
    frame,
    [TIME_BEFORE_SHOOTING - 20, TIME_BEFORE_SHOOTING],
    [0, normalRocketRotation],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        height: TL_ROCKET_HEIGHT,
        width: TL_ROCKET_WIDTH,
        position: "absolute",
        left: ROCKET_ORIGIN_X - TL_ROCKET_WIDTH / 2,
        top: ROCKET_TOP_Y + yOffset,
        transform: `rotate(${rotation}rad)`,
        transformOrigin: `${TL_ROCKET_WIDTH / 2}px 0`,
      }}
    >
      <RocketFront rocket={rocket} {...props} />
    </div>
  );
};
