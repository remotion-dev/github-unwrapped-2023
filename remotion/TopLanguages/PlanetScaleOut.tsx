import { scalePath, translatePath } from "@remotion/paths";
import { makePie } from "@remotion/shapes";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { RadialGradient } from "../RadialGradient";
import { moveAlongLine } from "../move-along-line";
import { LangugageDescription } from "./LanguageDescription";
import { mapLanguageToPlanet } from "./constants";
import { remapSpeed } from "./remap-speed";
import {
  NewRocketSVG,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/NewRocketSVG";

const SCALE_FACTOR = 1;
const PATH_EXTRAPOLATION = 0.1;

export const PlanetScaleOut: React.FC = () => {
  const { PlanetSVG } = mapLanguageToPlanet.Java;
  const { width, height } = useVideoConfig();
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
  const left = interpolate(zoomOut, [0, 1], [-50, 0]);
  const top = interpolate(zoomOut, [0, 1], [30, 0]);

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
        <LangugageDescription
          delay={60}
          duration={90}
          language="Java"
          position={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
