import { reversePath, translatePath } from "@remotion/paths";
import { makeCircle } from "@remotion/shapes";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { moveAlongLine } from "../move-along-line";
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

export const PlanetScaleSpiralWhole: React.FC<z.infer<typeof spiralSchema>> = ({
  language,
}) => {
  const { PlanetSVG } = mapLanguageToPlanet[language];

  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const _radius = (f: number) =>
    interpolate(f, [0, 100], [width / 3.5, width / 2.5]);
  const radius = _radius(frame);

  const { path } = makeCircle({
    radius,
  });

  const spedUpFrame = remapSpeed(frame, (f) =>
    interpolate(f, [0, 200], [1, 2])
  );

  const frameOutOfOrbit = 112;
  const p = frameOutOfOrbit / 3;

  const progress = (f: number) => (f % p) / p;

  const centered = translatePath(
    reversePath(path),
    width / 2 - radius,
    height / 2 - radius
  );

  const moveAtEnd = moveAlongLine(centered, progress(frameOutOfOrbit));
  const radiusAtEnd = _radius(frameOutOfOrbit);
  const extrapolatedX =
    moveAtEnd.offset.x +
    Math.cos(moveAtEnd.angleInRadians) * radiusAtEnd * 2 * Math.PI;
  const extrapolatedY =
    moveAtEnd.offset.y +
    Math.sin(moveAtEnd.angleInRadians) * radiusAtEnd * 2 * Math.PI;
  const extrapolatedLine = `M ${moveAtEnd.offset.x} ${moveAtEnd.offset.y} L ${extrapolatedX} ${extrapolatedY}`;
  const currentMove = moveAlongLine(
    spedUpFrame > frameOutOfOrbit ? extrapolatedLine : centered,
    progress(spedUpFrame)
  );

  return (
    <AbsoluteFill>
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
            currentMove.offset.x - TL_ROCKET_WIDTH / 2
          }px) translateY(${
            currentMove.offset.y - TL_ROCKET_HEIGHT / 2
          }px) rotate(${currentMove.angleInDegrees}deg) scale(0.5)`,
        }}
      />
      <AbsoluteFill>
        <svg viewBox={`0 0 1080 1080`}>
          <path d={extrapolatedLine} fill="transparent" stroke="white" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
