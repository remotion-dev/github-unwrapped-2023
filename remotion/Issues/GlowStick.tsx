import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  getAngleForShoot,
  ROCKET_ORIGIN_X,
  ROCKET_ORIGIN_Y,
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
    durationRestThreshold: 0.1,
  });

  const x = interpolate(progress, [0, 1], [ROCKET_ORIGIN_X, targetX]);
  const y = interpolate(progress, [0, 1], [ROCKET_ORIGIN_Y, targetY]);

  if (progress === 0) {
    return null;
  }

  return (
    <Img
      style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        position: "absolute",
        left: x - IMAGE_WIDTH / 2,
        top: y,
        transform: `rotate(${angleRadians + Math.PI / 2}rad)`,
        transformOrigin: "center 0",
      }}
      src={staticFile("glowstick.png")}
    />
  );
};
