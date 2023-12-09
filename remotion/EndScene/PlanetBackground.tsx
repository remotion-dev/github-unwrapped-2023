import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { GOLD_PLANET_BG } from ".";
import type { Planet } from "../../src/config";
import { Stars } from "../../vite/Home/Stars";
import { Gradient } from "../Gradients/NativeGradient";
import { GoldPlanetShine } from "./GoldPlanetShine";
import { Threads } from "./Threads";

export const prefetchPlanetLandingBackground = (planet: Planet): string[] => {
  if (planet === "Gold") {
    return [GOLD_PLANET_BG];
  }

  return [];
};

export const PlanetBackground: React.FC<{
  planet: Planet;
}> = ({ planet }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {planet === "Ice" ? <Gradient gradient="iceRadial" /> : null}
      {planet === "Silver" ? <Gradient gradient="silverRadial" /> : null}
      {planet === "Gold" ? <Img src={GOLD_PLANET_BG} /> : null}
      {planet === "Gold" ? <Stars /> : null}
      {planet === "Gold" ? <Threads /> : null}
      {planet === "Gold" && <GoldPlanetShine />}
    </AbsoluteFill>
  );
};
