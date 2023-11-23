import { scalePath, translatePath } from "@remotion/paths";
import { makePie } from "@remotion/shapes";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { RadialGradient } from "../RadialGradient";
import { moveAlongLine } from "../move-along-line";
import { LanguageDescription } from "./LanguageDescription";
import { LanguagesEnum, mapLanguageToPlanet } from "./constants";
import type { Corner } from "./corner";
import { cornerType } from "./corner";
import { remapSpeed } from "./remap-speed";
import {
  NewRocketSVG,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/NewRocketSVG";

const SCALE_FACTOR = 1;
const PATH_EXTRAPOLATION = 0.1;

export const zoomOutSchema = z.object({
  corner: cornerType,
  language: LanguagesEnum,
});

const initialLeft = (corner: Corner) => {
  if (corner === "top-left") {
    return -50;
  }

  if (corner === "top-right") {
    return 50;
  }

  if (corner === "bottom-left") {
    return -50;
  }

  if (corner === "bottom-right") {
    return 50;
  }

  throw new Error("Invalid corner");
};

const initialTop = (corner: Corner) => {
  if (corner === "top-left") {
    return -30;
  }

  if (corner === "top-right") {
    return -30;
  }

  if (corner === "bottom-left") {
    return 30;
  }

  if (corner === "bottom-right") {
    return 30;
  }

  throw new Error("Invalid corner");
};

const arcRotation = (corner: Corner) => {
  if (corner === "bottom-left") {
    return (-PATH_EXTRAPOLATION / 2) * Math.PI * 2;
  }

  if (corner === "bottom-right") {
    return 1.5 * Math.PI - (PATH_EXTRAPOLATION / 2) * Math.PI * 2;
  }

  if (corner === "top-left") {
    return 0.5 * Math.PI - (PATH_EXTRAPOLATION / 2) * Math.PI * 2;
  }

  if (corner === "top-right") {
    return Number(Math.PI) - (PATH_EXTRAPOLATION / 2) * Math.PI * 2;
  }

  return 0;
};

const pathTranslation = ({
  corner,
  width,
  height,
}: {
  corner: Corner;
  width: number;
  height: number;
}): [number, number] => {
  if (corner === "bottom-left") {
    return [-width, 0];
  }

  if (corner === "bottom-right") {
    return [0, 0];
  }

  if (corner === "top-left") {
    return [-width, -height];
  }

  if (corner === "top-right") {
    return [0, -height];
  }

  throw new Error("Invalid corner");
};

export const PlanetScaleOut: React.FC<z.infer<typeof zoomOutSchema>> = ({
  corner,
  language,
}) => {
  const { PlanetSVG } = mapLanguageToPlanet[language];
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const { path } = makePie({
    progress: 0.25 + PATH_EXTRAPOLATION,
    radius: width,
    closePath: false,
    rotation: arcRotation(corner),
  });
  const translation = pathTranslation({ corner, width, height });
  const translated = translatePath(path, translation[0], translation[1]);
  const scaled = scalePath(translated, SCALE_FACTOR, SCALE_FACTOR);
  const translated2 = translatePath(scaled, 0, height * (1 - SCALE_FACTOR));

  const speedFunction = (f: number) => interpolate(f, [0, 100], [1, 7]);

  const remappedFrame = remapSpeed(frame, speedFunction);

  const progress = interpolate(remappedFrame, [0, 80], [0, 1]);
  const move = moveAlongLine(translated2, progress);

  const zoomOutJump = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const zoomOutConstant = interpolate(frame, [0, 70], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const zoomOut = zoomOutJump * 0.8 + zoomOutConstant * 0.2;

  const scale = interpolate(zoomOut, [0, 1], [3, 1.5]);
  const left = interpolate(zoomOut, [0, 1], [initialLeft(corner), 0]);
  const top = interpolate(zoomOut, [0, 1], [initialTop(corner), 0]);

  const radialGradientScale = interpolate(zoomOut, [0, 1], [200, 100]) + "%";

  return (
    <AbsoluteFill style={{}}>
      <AbsoluteFill
        style={{ width: radialGradientScale, height: radialGradientScale }}
      >
        <RadialGradient />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: String(scale),
          left: left + "%",
          top: top + "%",
        }}
      >
        <PlanetSVG />
      </AbsoluteFill>
      <AbsoluteFill>
        <NewRocketSVG
          style={{
            transform: `translateX(${
              move.offset.x - TL_ROCKET_WIDTH / 2
            }px) translateY(${move.offset.y - TL_ROCKET_HEIGHT / 2}px) rotate(${
              move.angleInDegrees
            }deg) scale(1.5)`,
          }}
        />
      </AbsoluteFill>
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
          position={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
