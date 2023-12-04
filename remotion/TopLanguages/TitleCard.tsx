import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { accentColorSchema, rocketSchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { accentColorToGradient } from "../Opening/TitleImage";
import { TopLanguagesRocket } from "./Rocket";
import { TitleCardOctocat } from "./TitleCardOctocat";
import { TopLanguagesTitle } from "./TopLanguagesTitle";

export const topLanguagesTitleCardSchema = z.object({
  login: z.string(),
  pluralizeLanguages: z.boolean(),
  accentColor: accentColorSchema,
  rocket: rocketSchema,
});

export const TITLE_CARD_DURATION = 100;

export const TopLanguagesTitleCard: React.FC<
  z.infer<typeof topLanguagesTitleCardSchema>
> = ({ login, pluralizeLanguages, accentColor, rocket }) => {
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
      <AbsoluteFill
        style={{
          transform: `rotate(180deg)`,
          opacity,
        }}
      >
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>
      <Sequence from={30} style={{ transform: `translateY(-300px)` }}>
        <AbsoluteFill style={{ marginTop: 100, marginLeft: 300 }}>
          <TopLanguagesRocket rocket={rocket} />
        </AbsoluteFill>
      </Sequence>
      <TitleCardOctocat accentColor={accentColor} />
      <AbsoluteFill style={{ opacity: 0.5 }}>
        <Noise translateX={0} translateY={0} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopLanguagesTitle pluralize={pluralizeLanguages} login={login} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
