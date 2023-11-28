import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MAX_STARS } from ".";
import { StarSprite } from "../StarSprite";

const MOVE_AIM = 100;
export const HIT_RADIUS = 450;

const MAX_HITS = 10;

export const Star: React.FC<{
  duration: number;
  starsShown: number;
  id: string;
  angle: number;
}> = ({ duration, id, starsShown, angle }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const hitProbability = useMemo(
    () => interpolate(starsShown, [0, MAX_HITS, MAX_STARS], [1, 0.9, 0.4]),
    [starsShown],
  );
  const hitSpaceship = useMemo(
    () => random(id) < hitProbability,
    [hitProbability, id],
  );

  const randomRadius = hitSpaceship ? 400 : 200;

  const x = Math.sin(angle);
  const y = Math.cos(angle);

  const translateY = MOVE_AIM - y * randomRadius;
  const translateX = x * randomRadius;

  const distance = interpolate(frame, [0, duration + 10], [1, 0.005], {});
  const scale = 1 / distance - 1;

  console.log({ duration });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale * 0.7}) translateX(${
            translateX * scale
          }px) translateY(${translateY * scale}px)`,
          opacity: frame < duration ? 1 : 0,
        }}
      >
        <StarSprite
          burstFrame={hitSpaceship ? duration * 0.5 : undefined}
          transitionDuration={duration}
        />
      </AbsoluteFill>
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
    </AbsoluteFill>
  );
};
