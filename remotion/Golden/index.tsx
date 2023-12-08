import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";

import type { Rocket } from "../../src/config";
import { GoldPlanetAsset } from "./GoldPlanetAsset";
import { GoldPlanetShine } from "./GoldPlanetShine";
import { LandingRocket } from "./LandingRocket";
import { PlanetBackground } from "./PlanetBackground";
import Stars from "./SparkingStars";
import { Threads } from "./Threads";

export const GOLD_PLANET_ASSET = staticFile("gold-planet.svg");
export const GOLD_PLANET_BG = staticFile("gold-gradient-bg.png");
export const GOLD_PLANET_SOUND = staticFile("church_chior.mp3");

const container: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  fontSize: 60,
  width: "100%",
  height: "100%",
};

export const GoldenScene: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  return (
    <AbsoluteFill style={container}>
      <Audio
        // TODO: License
        // TODO: Mute other sound
        src={GOLD_PLANET_SOUND}
      />
      <Stars />
      <PlanetBackground />
      <Threads />
      <GoldPlanetShine />
      <GoldPlanetAsset />
      <LandingRocket rocket={rocket} />
    </AbsoluteFill>
  );
};
