import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ROCKET_ORIGIN_X, ROCKET_TOP_Y } from "./constants";
import { getAngleForShoot } from "./make-ufo-positions";

const IMAGE_WIDTH = 30;
const IMAGE_HEIGHT = 165;
const STICK_PADDING_TOP = 10;

export const GlowStick: React.FC<{
  targetX: number;
  targetY: number;
  shootDelay: number;
  duration: number;
}> = ({ targetX, targetY, shootDelay, duration }) => {
  const angleRadians = getAngleForShoot(targetX, targetY);

  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [shootDelay, duration + shootDelay],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const x = interpolate(progress, [0, 1], [ROCKET_ORIGIN_X, targetX]);
  const y = interpolate(progress, [0, 1], [ROCKET_TOP_Y, targetY]);

  const translateX = -IMAGE_WIDTH / 2;

  if (progress === 0) {
    return null;
  }

  return (
    <AbsoluteFill>
      <Img
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          position: "absolute",
          left: x,
          top: y,
          transform: `translateY(-${STICK_PADDING_TOP}px) translateX(${translateX}px) rotate(${
            angleRadians + Math.PI / 2
          }rad)`,
          transformOrigin: `${IMAGE_WIDTH / 2}px ${STICK_PADDING_TOP}px`,
        }}
        src={staticFile("glow-stick.png")}
      />
    </AbsoluteFill>
  );
};
