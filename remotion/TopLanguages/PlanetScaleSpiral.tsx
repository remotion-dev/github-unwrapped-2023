import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { LanguageDescription } from "./LanguageDescription";
import { PlanetScaleSpiralWhole } from "./PlanetScaleSpiralWhole";
import { LanguagesEnum } from "./constants";

export const startRotationInRadiansSchema = z.number().step(0.1).min(0);

export const spiralSchema = z.object({
  language: LanguagesEnum,
  showHelperLine: z.boolean(),
  startRotationInRadians: startRotationInRadiansSchema,
  position: z.number().int(),
});

export const PlanetScaleSpiral: React.FC<z.infer<typeof spiralSchema>> = ({
  language,
  showHelperLine,
  startRotationInRadians,
  position,
}) => {
  const frame = useCurrentFrame();

  const zoomOutProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const translateX = interpolate(zoomOutProgress, [0, 1], [0, 0]);
  const translateY = interpolate(zoomOutProgress, [0, 1], [0, 0]);
  const scale = interpolate(zoomOutProgress, [0, 1], [1.5, 1]);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${translateX}%) translateY(${translateY}%) scale(${scale})`,
        }}
      >
        <PlanetScaleSpiralWhole
          startRotationInRadians={startRotationInRadians}
          showHelperLine={showHelperLine}
          language={language}
          position={position}
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
