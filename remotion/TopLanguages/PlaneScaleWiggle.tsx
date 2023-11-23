import { noise2D } from "@remotion/noise";
import { scalePath, translatePath } from "@remotion/paths";
import { makePie } from "@remotion/shapes";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import { LanguageDescription } from "./LanguageDescription";
import { LanguagesEnum, mapLanguageToPlanet } from "./constants";

const SCALE_FACTOR = 1;
const PATH_EXTRAPOLATION = 0.1;

export const wiggleSchema = z.object({
  language: LanguagesEnum,
  position: z.number(),
});

export const PlanetScaleWiggle: React.FC<z.infer<typeof wiggleSchema>> = ({
  language,
  position,
}) => {
  const { PlanetSVG, gradient } = mapLanguageToPlanet[language];
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const { path } = makePie({
    progress: 0.25 + PATH_EXTRAPOLATION,
    radius: width,
    closePath: false,
    rotation: (-PATH_EXTRAPOLATION / 2) * Math.PI * 2,
  });
  const translated = translatePath(path, -width, 0);
  const scaled = scalePath(translated, SCALE_FACTOR, SCALE_FACTOR);
  const translated2 = translatePath(scaled, 0, height * (1 - SCALE_FACTOR));

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
    <AbsoluteFill style={{}}>
      <AbsoluteFill style={{ opacity: 0.2 }}>
        <Gradient gradient={gradient} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: "0.7",
        }}
      >
        <PlanetSVG
          style={{
            scale: String(planetScale),
            rotate: rotate + "deg",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill />
      <AbsoluteFill>
        <svg viewBox={`0 0 1080 1080`}>
          <path d={translated2} fill="transparent" />
        </svg>
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
