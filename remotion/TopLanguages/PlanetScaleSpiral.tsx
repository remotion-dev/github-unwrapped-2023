import { reversePath, translatePath } from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { moveAlongLine } from "../move-along-line";
import { LanguageDescription } from "./LanguageDescription";
import { LanguagesEnum, mapLanguageToPlanet } from "./constants";
import { remapSpeed } from "./remap-speed";
import {
  NewRocketSVG,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/NewRocketSVG";
import SkySVG from "./svgs/SkySVG";

export const spiralSchema = z.object({
  language: LanguagesEnum,
});

export const PlanetScaleSpiral: React.FC<z.infer<typeof spiralSchema>> = ({
  language,
}) => {
  const { PlanetSVG } = mapLanguageToPlanet[language];

  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const radius = interpolate(frame, [0, 100], [width / 3.5, width / 2]);

  const { path } = makeCircle({
    radius,
  });

  const spedUpFrame = remapSpeed(frame, (f) =>
    interpolate(f, [0, 200], [1, 2])
  );

  const progress = (spedUpFrame % 40) / 40;

  const centered = translatePath(
    reversePath(path),
    width / 2 - radius,
    height / 2 - radius
  );

  const move = moveAlongLine(centered, progress);

  const zoomOutProgress = interpolate(frame, [30, 130], [0, 1], {
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
        <AbsoluteFill
          style={{
            backgroundImage: "radial-gradient(#DD8B5A, #0A0A1B)",
            opacity: 0.2,
          }}
        />
        <AbsoluteFill>
          <SkySVG style={{ transform: "scale(6)", opacity: 0.3 }} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlanetSVG />
        </AbsoluteFill>
        <NewRocketSVG
          style={{
            transform: `translateX(${
              move.offset.x - TL_ROCKET_WIDTH / 2
            }px) translateY(${move.offset.y - TL_ROCKET_HEIGHT / 2}px) rotate(${
              move.angleInDegrees
            }deg) scale(0.5)`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <LanguageDescription
          delay={100}
          duration={90}
          language="Java"
          position={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
