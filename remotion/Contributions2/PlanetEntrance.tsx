import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { PlanetEnum, type Planet } from "../../src/config";

const SILVER_PLANET = staticFile("planet-silver.png");
const ICE_PLANET = staticFile("planet-ice.png");
const GOLD_PLANET = staticFile("planet-gold.png");
// const TEST = staticFile("planet-leafy.png");

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

export const getPlanetFile = (planet: Planet) => {
  switch (planet) {
    case "Silver":
      return SILVER_PLANET;
    case "Ice":
      return ICE_PLANET;
    default:
      return GOLD_PLANET;
  }
};

export const PlanetEntrance: React.FC<{
  planet: Planet;
  startingFrame?: number;
}> = ({ planet, startingFrame }) => {
  const frame = useCurrentFrame();

  const planetSize = interpolate(
    frame + (startingFrame || 0),
    [80, 180],
    [0, 1000],
    {
      extrapolateRight: "clamp",
      easing: Easing.inOut((t) => t),
    },
  );

  const planetY = interpolate(
    frame + (startingFrame || 0),
    [80, 180],
    [0, 700],
    {
      extrapolateRight: "clamp",
      easing: Easing.inOut((t) => t),
    },
  );

  return (
    <Img
      src={getPlanetFile(planet)}
      style={{
        transform:
          planet === PlanetEnum.Enum.Silver ? "rotate(40deg)" : "rotate(20deg)",
        width: planetSize,
        position: "absolute",
        top: 500 + planetY - planetSize / 2,
        left: 550 - planetSize / 2,
      }}
    />
  );
};
