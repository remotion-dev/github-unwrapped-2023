import React, { useMemo } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Planet } from "../../src/config";
import { GoldPlanet } from "./Planet";
import { IcePlanet } from "./orbs/IcePlanet";
import { SilverPlanet } from "./orbs/SilverPlanet";

export const PlanetAsset: React.FC<{
  planet: Planet;
  progress: number;
}> = ({ planet, progress }) => {
  const startDistance = 10;
  const endDistance = 1;

  const distance = interpolate(progress, [0, 1], [startDistance, endDistance], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = (1 / distance) * 2;

  const offset = Math.sin(-Math.PI * 1.5 + progress * Math.PI * 0.8) * -850;

  const style: React.CSSProperties = useMemo(() => {
    if (planet === "Gold") {
      return {
        transform: `translateY(${interpolate(progress, [0, 1], [500, 0])}px)`,
      };
    }

    return {
      transform: `translateY(${offset + 200}px) scale(${scale})`,
    };
  }, [offset, planet, progress, scale]);

  return (
    <AbsoluteFill style={style}>
      {planet === "Silver" && <SilverPlanet />}
      {planet === "Ice" && <IcePlanet />}
      {planet === "Gold" && <GoldPlanet />}
    </AbsoluteFill>
  );
};
