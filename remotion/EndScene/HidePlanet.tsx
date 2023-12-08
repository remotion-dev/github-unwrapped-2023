import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Planet } from "../../src/config";

export const HidePlanets: React.FC<{
  children: React.ReactNode;
  planet: Planet;
  exitProgress: number;
}> = ({ children, planet, exitProgress }) => {
  const startDistance = 10;
  const endDistance = 1;

  const distance = interpolate(
    exitProgress,
    [0, 1],
    [startDistance, endDistance],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = 1 / distance;

  const offset = Math.sin(-Math.PI * 1.5 + exitProgress * Math.PI * 0.8) * -850;

  const style: React.CSSProperties = useMemo(() => {
    if (planet === "Gold") {
      return {
        transform: `translateY(${interpolate(
          exitProgress,
          [0, 1],
          [2000, 0],
        )}px)`,
      };
    }

    return {
      transform: `translateY(${offset}px) scale(${scale})`,
    };
  }, [planet, offset, scale, exitProgress]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};
