import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolateColors,
  random,
  useCurrentFrame,
} from "remotion";
import { makeRandomPath } from "./make-random-path";
import { MergeStat } from "./MergeStat";
import { Path, PATH_ANIMATION_DURATION } from "./Path";

export const WholePaths: React.FC<{
  extraPaths: number;
}> = ({ extraPaths }) => {
  const frame = useCurrentFrame();
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
              ["#7E52E4", "#3A2A73"]
            ),
            "black",
          ]
        ),
      };
    });
  }, [extraPaths]);

  const merged = paths.filter((p) => {
    return frame >= p.delay + PATH_ANIMATION_DURATION - 30 ? p : null;
  }).length;

  return (
    <AbsoluteFill>
      {paths.map((path, i) => {
        return (
          <Path
            key={path.id}
            d={path.d}
            delay={path.delay}
            stroke={path.stroke}
          ></Path>
        );
      })}
      <MergeStat num={merged}></MergeStat>
    </AbsoluteFill>
  );
};
