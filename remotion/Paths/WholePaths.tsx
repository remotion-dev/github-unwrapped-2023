import React, { useMemo } from "react";
import { AbsoluteFill, interpolateColors, random } from "remotion";
import { makeRandomPath, PATH_TARGET } from "./make-random-path";
import { Path } from "./Path";

export const WholePaths: React.FC<{
  extraPaths: number;
}> = ({ extraPaths }) => {
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
      <div
        style={{
          backgroundColor: "white",
          height: 250,
          width: 250,
          borderRadius: "50%",
          position: "absolute",
          left: PATH_TARGET.x,
          top: PATH_TARGET.y,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </AbsoluteFill>
  );
};
