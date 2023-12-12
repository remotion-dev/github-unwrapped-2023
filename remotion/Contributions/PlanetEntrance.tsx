import React from "react";
import { Easing, Img, interpolate, useCurrentFrame } from "remotion";
import { type Planet } from "../../src/config";
import { getPlanetFile } from "../planets";

export const PlanetEntrance: React.FC<{
  planet: Planet;
  startingFrame?: number;
}> = ({ planet, startingFrame }) => {
  const frame = useCurrentFrame();

  const planetSize = interpolate(
    frame + (startingFrame || 0),
    [80, 180],
    [0, 1200],
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
        width: planetSize,
        position: "absolute",
        top: 500 + planetY - planetSize / 2,
        left: 550 - planetSize / 2,
      }}
    />
  );
};
