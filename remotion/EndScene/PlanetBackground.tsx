import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { GOLD_PLANET_BG } from ".";
import type { AccentColor, Planet } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { planetToGradient } from "../planets";
import { GoldPlanetShine } from "./GoldPlanetShine";
import { Orbs, Threads } from "./Threads";

export const prefetchPlanetLandingBackground = (planet: Planet): string[] => {
  if (planet === "Gold") {
    return [GOLD_PLANET_BG, ...Orbs.map((o) => o.source)];
  }

  return [];
};

export const PlanetBackground: React.FC<{
  planet: Planet;
  accentColor: AccentColor;
}> = ({ planet }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <AbsoluteFill style={{ opacity }}>
        <Noise translateX={0} translateY={0} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity }}>
        {planet !== "Gold" && <Gradient gradient={planetToGradient(planet)} />}
        {planet === "Gold" && (
          <>
            <Img src={GOLD_PLANET_BG} />
            <Threads />
            <GoldPlanetShine />
          </>
        )}
      </AbsoluteFill>
    </>
  );
};
