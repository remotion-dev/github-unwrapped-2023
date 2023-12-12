import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { accentColorSchema, rocketSchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { accentColorToGradient } from "../Opening/TitleImage";
import { isMobileDevice } from "../Opening/devices";
import { TopLanguagesRocket } from "./Rocket";
import { TitleCardOctocat } from "./TitleCardOctocat";
import { TopLanguagesTitle } from "./TopLanguagesTitle";

export const topLanguagesTitleCardSchema = z.object({
  pluralizeLanguages: z.boolean(),
  accentColor: accentColorSchema,
  rocket: rocketSchema,
  randomizePlanetSeed: z.string(),
  randomizeOctocatSeed: z.number(),
});

export const TITLE_CARD_DURATION = 100;

export const TopLanguagesTitleCard: React.FC<
  z.infer<typeof topLanguagesTitleCardSchema>
> = ({
  pluralizeLanguages,
  accentColor,
  rocket,
  randomizePlanetSeed,
  randomizeOctocatSeed,
}) => {
  const frame = useCurrentFrame();
  const zoomOutProgress = interpolate(frame, [0, TITLE_CARD_DURATION], [0, 1]);
  const scale = interpolate(zoomOutProgress, [0, 1], [1.3, 1]);
  const opacity = Math.min(frame / 30);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {isMobileDevice() ? null : (
        <Audio
          startFrom={20}
          src={staticFile("second-whoosh.mp3")}
          volume={0.5}
        />
      )}
      <AbsoluteFill
        style={{
          transform: `rotate(180deg)`,
          opacity,
        }}
      >
        <Gradient gradient={accentColorToGradient(accentColor)} />
        <AbsoluteFill style={{ opacity: 0.5 }}>
          <Noise translateX={0} translateY={0} />
        </AbsoluteFill>
      </AbsoluteFill>
      <Sequence from={30} style={{ transform: `translateY(-300px)` }}>
        <AbsoluteFill style={{ marginTop: 100, marginLeft: 300 }}>
          <TopLanguagesRocket rocket={rocket} />
        </AbsoluteFill>
      </Sequence>
      <AbsoluteFill
        style={{
          transform:
            random(randomizeOctocatSeed) > 0.5 ? `scaleX(-1)` : undefined,
        }}
      >
        <TitleCardOctocat accentColor={accentColor} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopLanguagesTitle
          pluralize={pluralizeLanguages}
          randomizePlanetSeed={randomizePlanetSeed}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
