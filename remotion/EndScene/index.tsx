import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { z } from "zod";
import { PlanetEnum, rocketSchema } from "../../src/config";
import { CallToAction } from "./CallToAction";
import { PlanetAsset } from "./GoldPlanetAsset";
import { GoldPlanetShine } from "./GoldPlanetShine";
import { LandingRocket } from "./LandingRocket";
import { PlanetBackground } from "./PlanetBackground";
import Stars from "./SparkingStars";
import { Threads } from "./Threads";
import { getOrbEnter } from "./orb-enter";

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

export const endSceneSchema = z.object({
  rocket: rocketSchema,
  planet: PlanetEnum,
});

export const EndScene: React.FC<z.infer<typeof endSceneSchema>> = ({
  rocket,
  planet,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { progress } = getOrbEnter({ fps, frame });

  return (
    <AbsoluteFill>
      <PlanetBackground planet={planet} />
      <AbsoluteFill
        style={{
          ...container,
          transform: `scale(${interpolate(frame, [0, 100], [1, 1.1])})`,
        }}
      >
        {planet === "Gold" ? (
          <Audio
            // TODO: License
            // TODO: Mute other sound
            src={GOLD_PLANET_SOUND}
          />
        ) : null}
        {planet === "Gold" ? <Stars /> : null}
        {planet === "Gold" ? <Threads /> : null}
        {planet === "Gold" && <GoldPlanetShine />}
        <CallToAction progress={progress} />
        <PlanetAsset planet={planet} />
        <LandingRocket rocket={rocket} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
