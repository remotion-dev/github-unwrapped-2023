import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { z } from "zod";
import { PlanetEnum, rocketSchema } from "../../src/config";
import { FPS } from "../Issues/make-ufo-positions";
import { CallToAction } from "./CallToAction";
import { PlanetAsset } from "./GoldPlanetAsset";
import { HidePlanets } from "./HidePlanet";
import { LandingRocket } from "./LandingRocket";
import { PlanetBackground } from "./PlanetBackground";

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

export const END_SCENE_DURATION = 6.5 * FPS;

export const EndScene: React.FC<z.infer<typeof endSceneSchema>> = ({
  rocket,
  planet,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 60,
    durationRestThreshold: 0.00001,
  });

  const exitProgress =
    1 -
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      durationInFrames: 150,
      delay: 70,
    });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={container}>
        {planet === "Gold" ? (
          <Audio
            // TODO: License
            // TODO: Mute other sound
            src={GOLD_PLANET_SOUND}
          />
        ) : null}
        <PlanetBackground planet={planet} />
        <HidePlanets exitProgress={exitProgress} planet={planet}>
          <PlanetAsset enterProgress={enterProgress} planet={planet} />
          <LandingRocket planetType={planet} rocket={rocket} />
        </HidePlanets>
        <CallToAction
          enterProgress={enterProgress}
          exitProgress={exitProgress}
          planet={planet}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
