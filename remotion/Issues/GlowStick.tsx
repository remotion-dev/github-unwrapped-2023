import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HelperPoint } from "./HelperPoint";
import {
  getAngleForShoot,
  ROCKET_ORIGIN_X,
  ROCKET_TOP_Y,
  SHOOT_DURATION,
  SHOT_SPRING_CONFIG,
} from "./make-ufo-positions";

const IMAGE_WIDTH = 30;
const IMAGE_HEIGHT = 165;

export const GlowStick: React.FC<{
  targetX: number;
  targetY: number;
  shootDelay: number;
}> = ({ targetX, targetY, shootDelay }) => {
  const angleRadians = getAngleForShoot(targetX, targetY);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: SHOT_SPRING_CONFIG,
    durationInFrames: SHOOT_DURATION,
    delay: shootDelay,
  });

  const x = interpolate(progress, [0, 1], [ROCKET_ORIGIN_X, targetX]);
  const y = interpolate(progress, [0, 1], [ROCKET_TOP_Y, targetY]);

  const translateX = -IMAGE_WIDTH / 2;
  const translateY = 0;

  return (
    <AbsoluteFill>
      <HelperPoint x={x} y={y}></HelperPoint>
      <Img
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          position: "absolute",
          left: x,
          top: y,
          transform: `rotate(${
            angleRadians + Math.PI / 2
          }rad) translateX(${translateX}px) translateY(${translateY}px)`,
          transformOrigin: `${IMAGE_WIDTH / 2}px 0`,
        }}
        src={staticFile("glowstick.png")}
      />
    </AbsoluteFill>
  );
};
