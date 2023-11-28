import { Pie } from "@remotion/shapes";
import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { MAX_STARS } from ".";
import { StarSprite } from "../StarSprite";

const MOVE_AIM = 100;
const HIT_RADIUS = 500;

const MIN_NON_HIT_RADIUS = 900;
const MAX_NON_HIT_RADIUS = 800;

const MAX_HITS = 10;

export const Star: React.FC<{
  duration: number;
  starsShown: number;
  showHitWindow: boolean;
  id: string;
}> = ({ duration, id, starsShown, showHitWindow }) => {
  const hitProbability = useMemo(
    () => interpolate(starsShown, [0, MAX_HITS, MAX_STARS], [1, 0.9, 0.4]),
    [starsShown],
  );
  const hitSpaceship = useMemo(
    () => random(id) < hitProbability,
    [hitProbability, id],
  );
  const frame = useCurrentFrame();

  const interpolateRandom = interpolate(
    random(id + "a"),
    [0, 1],
    [-Math.PI / 2, Math.PI / 2],
  );

  const randomRadiusMultiplier = useMemo(() => random(id + "b"), [id]);

  const randomRadius = hitSpaceship
    ? randomRadiusMultiplier * HIT_RADIUS
    : randomRadiusMultiplier * (MAX_NON_HIT_RADIUS - MIN_NON_HIT_RADIUS) +
      MIN_NON_HIT_RADIUS;

  const x = Math.sin(interpolateRandom);
  const y = Math.cos(interpolateRandom);

  const translateY = MOVE_AIM - y * randomRadius;
  const translateX = x * randomRadius;

  const distance = interpolate(frame, [0, duration + 10], [1, 0.005], {});
  const scale = 1 / distance - 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showHitWindow ? (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pie
            radius={HIT_RADIUS}
            progress={0.5}
            fill="white"
            rotation={-0.5 * Math.PI}
            style={{
              transform: `translateY(100px)`,
              opacity: 0.1,
            }}
          />
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateX(${translateX * scale}px) translateY(${
            translateY * scale
          }px) scale(${scale * 0.7})`,
          opacity: frame < duration ? 1 : 0,
        }}
      >
        <StarSprite
          burstFrame={hitSpaceship ? duration * (4 / 5) : undefined}
          transitionDuration={duration}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
