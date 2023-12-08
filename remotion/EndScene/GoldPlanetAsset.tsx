import React from "react";
import { AbsoluteFill } from "remotion";
import type { Planet } from "../../src/config";
import { GoldPlanet } from "./Planet";
import { IcePlanet } from "./orbs/IcePlanet";
import { SilverPlanet } from "./orbs/SilverPlanet";

export const PlanetAsset: React.FC<{
  planet: Planet;
}> = ({ planet }) => {
  return (
    <AbsoluteFill>
      {planet === "Silver" && <SilverPlanet />}
      {planet === "Ice" && <IcePlanet />}
      {planet === "Gold" && <GoldPlanet />}
    </AbsoluteFill>
  );
};
