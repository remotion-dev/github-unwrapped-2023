import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StarSprite } from "../StarSprite";

const MOVE_AIM = 100;
export const HIT_RADIUS = 450;

export const ANIMATION_DURATION_PER_STAR = 20;

export const Star: React.FC<{
  duration: number;
  angle: number;
  showDots: boolean;
  hitSpaceship: boolean;
}> = ({ duration, angle, showDots, hitSpaceship }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const randomRadius = hitSpaceship ? 200 : 400;

  const x = Math.sin(angle);
  const y = Math.cos(angle);

  const translateY = MOVE_AIM - y * randomRadius;
  const translateX = x * randomRadius;

  const stop = hitSpaceship ? duration * 0.5 : duration;

  const distance = interpolate(frame, [0, stop], [1, stop ? 0.5 : 0.000001], {
    extrapolateRight: hitSpaceship ? "clamp" : "extend",
  });
  const justScale = 1 / distance - 1;

  const extraScale = hitSpaceship
    ? interpolate(frame, [stop, stop + 6], [0, 0.1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const scale = justScale + extraScale;

  const shouldDisplay = hitSpaceship
    ? frame < stop + 6
    : scale < 1000 && scale > 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {shouldDisplay ? (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${scale * 0.7}) translateX(${
              translateX * scale
            }px) translateY(${translateY * scale}px)`,
          }}
        >
          <StarSprite burstFrame={hitSpaceship ? stop : undefined} />
        </AbsoluteFill>
      ) : null}
      {showDots ? (
        <AbsoluteFill>
          <svg viewBox="0 0 1080 1080">
            <circle
              r={10}
              fill="red"
              cx={width / 2 + translateX}
              cy={height / 2 + translateY}
            />
          </svg>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
