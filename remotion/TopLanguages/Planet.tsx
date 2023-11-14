import { noise2D } from "@remotion/noise";
import { getPointAtLength } from "@remotion/paths";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TRANSFORM_PATH_Y } from "../../types/constants";
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
    x: point.x - boundingBox.width / 2,
    y: point.y - boundingBox.height / 2 + TRANSFORM_PATH_Y,
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

  const planetPosition = getPlanetPosition(rate, { width: 100, height: 100 });

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
              (1 - shrinkSpring * 0.2 + growSpring * 0.2) * 0.5
            }) rotate(${noise}deg)`
          : `scale(0.5)`,
        top: planetPosition.y,
        left: planetPosition.x,
        // ...style,
      }}
    >
      {/* <PlanetSVG /> */}
      <div
        style={{
          background: "white",
          height: 100,
          width: 100,
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
