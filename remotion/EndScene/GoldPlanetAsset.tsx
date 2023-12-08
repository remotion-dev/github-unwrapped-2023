import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Planet } from "../../src/config";
import { GoldPlanet } from "./Planet";
import { IcePlanet } from "./orbs/IcePlanet";
import { SilverPlanet } from "./orbs/SilverPlanet";

export const PlanetAsset: React.FC<{
  planet: Planet;
  enterProgress: number;
}> = ({ planet, enterProgress }) => {
  const enterOffset = interpolate(enterProgress, [0, 1], [1000, 0]);

  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${enterOffset}px)`,
      }}
    >
      {planet === "Silver" && <SilverPlanet />}
      {planet === "Ice" && <IcePlanet />}
      {planet === "Gold" && <GoldPlanet />}
    </AbsoluteFill>
  );
};
