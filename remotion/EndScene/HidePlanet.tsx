import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Planet } from "../../src/config";

export const HidePlanets: React.FC<{
  children: React.ReactNode;
  planet: Planet;
  progress: number;
}> = ({ children, planet, progress }) => {
  const startDistance = 10;
  const endDistance = 1;

  const distance = interpolate(progress, [0, 1], [startDistance, endDistance], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = 1 / distance;
  const offset = Math.sin(-Math.PI * 1.5 + progress * Math.PI * 0.8) * -850;
  const style: React.CSSProperties = useMemo(() => {
    if (planet === "Gold") {
      return {
        transform: `translateY(${interpolate(progress, [0, 1], [1000, 0])}px)`,
      };
    }

    return {
      transform: `translateY(${offset}px) scale(${scale})`,
    };
  }, [offset, planet, progress, scale]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};
