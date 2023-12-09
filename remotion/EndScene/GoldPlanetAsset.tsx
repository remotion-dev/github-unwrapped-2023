import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { Planet } from "../../src/config";
import { GOLD_PLANET, GoldPlanet } from "./Planet";
import { ICE_PLANET, IcePlanet } from "./orbs/IcePlanet";
import { SILVER_PLANET, SilverPlanet } from "./orbs/SilverPlanet";

export const prefetchPlanetImage = (planet: Planet) => {
  switch (planet) {
    case "Silver":
      return SILVER_PLANET;
    case "Ice":
      return ICE_PLANET;
    default:
      return GOLD_PLANET;
  }
};

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
