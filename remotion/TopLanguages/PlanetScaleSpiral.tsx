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

export const spiralSchema = z.object({
  language: LanguagesEnum,
});

export const PlanetScaleSpiral: React.FC<z.infer<typeof spiralSchema>> = () => {
  const { PlanetSVG } = mapLanguageToPlanet.Java;

  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const radius = interpolate(frame, [0, 100], [width / 4, width / 3]);

  const { path } = makeCircle({
    radius,
  });

  const spedUpFrame = remapSpeed(frame, (f) =>
    interpolate(f, [0, 100], [1, 2])
  );

  const progress = (spedUpFrame % 30) / 30;

  const centered = translatePath(
    reversePath(path),
    width / 2 - radius,
    height / 2 - radius
  );

  const move = moveAlongLine(centered, progress);

  return (
    <AbsoluteFill style={{}}>
      <AbsoluteFill>
        <svg viewBox={`0 0 1080 1080`}>
          <path d={centered} stroke="red" fill="transparent" />
        </svg>
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
          }deg) scale(1)`,
        }}
      />
    </AbsoluteFill>
  );
};
