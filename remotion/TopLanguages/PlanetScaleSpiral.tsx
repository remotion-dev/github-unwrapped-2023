import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { LanguageDescription } from "./LanguageDescription";
import { PlanetScaleSpiralWhole } from "./PlanetScaleSpiralWhole";
import { LanguagesEnum } from "./constants";

export const spiralSchema = z.object({
  language: LanguagesEnum,
  showHelperLine: z.boolean(),
  orbitOffset: z.number().step(0.1)
});

export const PlanetScaleSpiral: React.FC<z.infer<typeof spiralSchema>> = ({
  language,
  showHelperLine,
  orbitOffset
}) => {
  const frame = useCurrentFrame();

  const zoomOutProgress = interpolate(frame, [30, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const translateX = interpolate(zoomOutProgress, [0, 1], [50, 0]);
  const translateY = interpolate(zoomOutProgress, [0, 1], [50, 0]);
  const scale = interpolate(zoomOutProgress, [0, 1], [2, 1]);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${translateX}%) translateY(${translateY}%) scale(${scale})`,
        }}
      >
        <PlanetScaleSpiralWhole orbitOffset={orbitOffset} showHelperLine={showHelperLine} language={language} />
      </AbsoluteFill>
      <AbsoluteFill>
        <LanguageDescription
          delay={100}
          duration={90}
          language={language}
          position={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
