import { scalePath, translatePath } from "@remotion/paths";
import { makePie } from "@remotion/shapes";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { RadialGradient } from "../RadialGradient";
import { moveAlongLine } from "../move-along-line";
import { mapLanguageToPlanet } from "./constants";
import { remapSpeed } from "./remap-speed";
import {
  NewRocketSVG,
  TL_ROCKET_HEIGHT,
  TL_ROCKET_WIDTH,
} from "./svgs/NewRocketSVG";

const SCALE_FACTOR = 0.9;
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

  const progress = interpolate(remappedFrame, [0, 100], [0, 1]);
  const move = moveAlongLine(translated2, progress);

  return (
    <AbsoluteFill style={{}}>
      <RadialGradient />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: "3",
          left: "-50%",
          top: "30%",
          filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.2))",
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
            }deg)`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <svg viewBox={`0 0 1080 1080`}>
          <path d={translated2} fill="transparent" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
