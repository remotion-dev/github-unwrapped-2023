import { scalePath, translatePath } from "@remotion/paths";
import { makePie } from "@remotion/shapes";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import type { Corner } from "../../src/config";
import { cornerType, languageSchema, rocketSchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { isMobileDevice } from "../Opening/devices";
import { moveAlongLine } from "../move-along-line";
import { LanguagePlanet } from "./Language";
import { LanguageDescription } from "./LanguageDescription";
import { computePlanetInfo } from "./constants";
import { remapSpeed } from "./remap-speed";
import {
  RocketFront,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/FrontRocketSource";

const SCALE_FACTOR = 1;
const PATH_EXTRAPOLATION = 0.1;

export const zoomOutSchema = z.object({
  corner: cornerType,
  language: languageSchema,
  position: z.number().int(),
  rocket: rocketSchema,
});

const initialLeft = (corner: Corner) => {
  if (corner === "top-left") {
    return -40;
  }

  if (corner === "top-right") {
    return 40;
  }

  if (corner === "bottom-left") {
    return -40;
  }

  if (corner === "bottom-right") {
    return 40;
  }

  throw new Error("Invalid corner");
};

const initialTop = (corner: Corner) => {
  if (corner === "top-left") {
    return -15;
  }

  if (corner === "top-right") {
    return -15;
  }

  if (corner === "bottom-left") {
    return 15;
  }

  if (corner === "bottom-right") {
    return 15;
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
  position,
  rocket,
}) => {
  const planetInfo = computePlanetInfo(language);
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

  const progress = interpolate(remappedFrame, [15, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
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

  const scale = interpolate(zoomOut, [0, 1], [3, 1]);
  const left = interpolate(zoomOut, [0, 1], [initialLeft(corner), 0]);
  const top = interpolate(zoomOut, [0, 1], [initialTop(corner), 0]);

  const gradientOpacity = interpolate(frame, [0, 15], [0, planetInfo.opacity], {
    extrapolateRight: "clamp",
  });

  const noiseOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {isMobileDevice() ? null : (
        <Audio
          startFrom={10}
          src={staticFile("first-flyby.mp3")}
          volume={0.5}
        />
      )}
      <AbsoluteFill
        style={{
          scale: String(scale),
          left: left + "%",
          top: top + "%",
        }}
      >
        <AbsoluteFill
          style={{
            opacity: gradientOpacity,
          }}
        >
          <Gradient gradient={planetInfo.gradient} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            opacity: noiseOpacity,
          }}
        >
          <Noise translateX={0} translateY={-1080} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LanguagePlanet
            planetInfo={planetInfo}
            style={{
              height: 360,
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
      <Sequence durationInFrames={50} from={10}>
        <RocketFront
          style={{
            transform: `translateX(${
              move.offset.x - TL_ROCKET_WIDTH / 2
            }px) translateY(${move.offset.y - TL_ROCKET_HEIGHT / 2}px) rotate(${
              move.angleInDegrees
            }deg) scale(1.5)`,
          }}
          rocket={rocket}
        />
      </Sequence>
      <Sequence from={60}>
        <LanguageDescription
          delay={0}
          duration={90}
          language={language}
          position={position}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
