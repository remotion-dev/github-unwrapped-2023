import { noise2D } from "@remotion/noise";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { LanguagesEnum } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { LanguageDescription } from "./LanguageDescription";
import { mapLanguageToPlanet } from "./constants";
import SkySVG from "./svgs/SkySVG";

export const wiggleSchema = z.object({
  language: LanguagesEnum,
  position: z.number(),
});

export const PlanetScaleWiggle: React.FC<z.infer<typeof wiggleSchema>> = ({
  language,
  position,
}) => {
  const { PlanetSVG, gradient } = mapLanguageToPlanet[language];
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const delay = 30;

  const shrinkSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
    },
    durationInFrames: 20,
    delay: delay - 1,
  });

  const growSpring = spring({
    frame,
    fps,
    delay,
  });

  const planetScale = 1 - shrinkSpring * 0.9 + growSpring * 0.9;
  const isAction = delay <= frame && frame < 50;
  const noise = noise2D("seed", frame / 10, 1) * 10;

  const rotate = isAction ? noise : 0;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.2 }}>
        <Gradient gradient={gradient} />
      </AbsoluteFill>
      <AbsoluteFill>
        <SkySVG style={{ opacity: 0.5 }} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: "0.7",
        }}
      >
        <PlanetSVG
          width={800}
          style={{
            scale: String(planetScale),
            rotate: rotate + "deg",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <LanguageDescription
          delay={60}
          duration={90}
          language={language}
          position={position}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
