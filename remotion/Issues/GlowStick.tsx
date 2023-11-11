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
} from "./make-ufo-positions";

const IMAGE_WIDTH = 30;
const IMAGE_HEIGHT = 165;

export const GlowStick: React.FC<{
  targetX: number;
  targetY: number;
  shootDelay: number;
  shootDuration: number;
}> = ({ targetX, targetY, shootDelay, shootDuration }) => {
  const angleRadians = getAngleForShoot(targetX, targetY);

  // Make the glowstick only reach the bottom
  const actualTargetY = targetY;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: shootDuration,
    delay: shootDelay,
    durationRestThreshold: 0.1,
  });

  const x = interpolate(progress, [0, 1], [ROCKET_ORIGIN_X, targetX]);
  const y = interpolate(progress, [0, 1], [ROCKET_ORIGIN_Y, actualTargetY]);

  const scaleY = interpolate(progress, [0.8, 1], [1, 0.3], {
    extrapolateLeft: "clamp",
  });

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
        top: y - IMAGE_HEIGHT / 2,
        transform: `rotate(${angleRadians + Math.PI / 2}rad) scaleY(${scaleY})`,
      }}
      src={staticFile("glowstick.png")}
    />
  );
};
