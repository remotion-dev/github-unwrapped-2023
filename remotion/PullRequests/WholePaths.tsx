import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  random,
  useCurrentFrame,
} from "remotion";
import { MergeStat } from "./MergeStat";
import { PATH_ANIMATION_DURATION, Path } from "./Path";
import { makeRandomPath } from "./make-random-path";

export const WholePaths: React.FC<{
  extraPaths: number;
  initialPullRequests: number;
}> = ({ extraPaths, initialPullRequests }) => {
  const frame = useCurrentFrame();

  const counter = Math.round(
    interpolate(
      frame,
      [0, PATH_ANIMATION_DURATION - 40],
      [0, initialPullRequests],
      {
        easing: Easing.out(Easing.ease),
        extrapolateRight: "clamp",
      },
    ),
  );

  const paths = useMemo(() => {
    return Array.from({ length: extraPaths }).map((_, i) => {
      const seed = `seed${random(i)}`;

      return {
        id: seed,
        d: makeRandomPath(`seed${random(i)}`),
        delay: random(seed + "delay") * 25,
        stroke: interpolateColors(
          random(seed + "x"),
          [-1, 2],
          [
            interpolateColors(
              random(seed + "2"),
              [0, 1],
              ["#7E52E4", "#3A2A73"],
            ),
            "black",
          ],
        ),
      };
    });
  }, [extraPaths]);

  const merged = paths.filter((p) => {
    return frame >= p.delay + PATH_ANIMATION_DURATION - 30 ? p : null;
  }).length;

  return (
    <AbsoluteFill>
      {paths.map((path) => {
        return (
          <Path
            key={path.id}
            d={path.d}
            delay={path.delay}
            stroke={path.stroke}
          />
        );
      })}
      {frame > 117 ? (
        <MergeStat
          totalNum={extraPaths + initialPullRequests}
          num={merged + counter}
        />
      ) : null}
    </AbsoluteFill>
  );
};
