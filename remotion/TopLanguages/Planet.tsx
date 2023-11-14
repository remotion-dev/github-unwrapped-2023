import { noise2D } from "@remotion/noise";
import { getPointAtLength } from "@remotion/paths";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ACTION_DURATION,
  complexCurvePathLength,
  Language,
  mapLanguageToPlanet,
  newPath,
} from "./constants";

const getPlanetPosition = (
  rate: number,
  boundingBox: { width: number; height: number }
) => {
  const point = getPointAtLength(newPath, complexCurvePathLength * rate);

  return {
    x: point.x - boundingBox.width / 4,
    y: point.y - boundingBox.height / 4,
  };
};

export const Planet: React.FC<{
  actionFrame: number;
  rate: number;
  language: Language;
  style?: React.CSSProperties;
}> = ({ actionFrame, style, rate, language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const noise = noise2D("seed", frame / 10, 1) * 10;
  const isAction =
    frame >= actionFrame && frame < actionFrame + ACTION_DURATION;

  const { PlanetSVG, boundingBox } = mapLanguageToPlanet[language];

  const planetPosition = getPlanetPosition(rate, boundingBox);

  const shrinkSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
    },
    durationInFrames: 20,
    delay: actionFrame,
  });

  const growSpring = spring({
    frame,
    fps,
    delay: actionFrame + 2,
  });

  return (
    <div
      style={{
        position: "absolute",
        transform: isAction
          ? `scale(${
              1 - shrinkSpring * 0.2 + growSpring * 0.2
            }) rotate(${noise}deg)`
          : undefined,
        top: planetPosition.y,
        left: planetPosition.x,
        // ...style,
      }}
    >
      {/* <JavaPlanetSVG /> */}
      {/* <PythonPlanetSVG /> */}
      <PlanetSVG />
    </div>
  );
};
