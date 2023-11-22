import { noise2D } from "@remotion/noise";
import { getPointAtLength } from "@remotion/paths";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TRANSFORM_PATH_X, TRANSFORM_PATH_Y } from "../../types/constants";
import type { LanguageEnumType } from "./constants";
import {
  ACTION_DURATION,
  actionPositions,
  complexCurvePathLength,
  mapLanguageToPlanet,
  newPath,
} from "./constants";

const getPlanetPosition = (
  rate: number,
  boundingBox: { width: number; height: number }
) => {
  const point = getPointAtLength(newPath, complexCurvePathLength * rate);

  return {
    x: point.x - boundingBox.width / 2 + TRANSFORM_PATH_X,
    y: point.y - boundingBox.height / 2 + TRANSFORM_PATH_Y,
  };
};

export const Planet: React.FC<{
  actionIndex: number;
  planetPositionRate: number;
  language: LanguageEnumType;
  isMain: boolean;
  delay: number;
}> = ({ actionIndex, language, isMain, planetPositionRate, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const noise = noise2D("seed", frame / 10, 1) * 10;
  const actionFrames = [
    actionPositions[actionIndex],
    actionPositions[actionIndex] + ACTION_DURATION,
  ];
  const isAction = actionFrames[0] <= frame && frame < actionFrames[1];

  const { PlanetSVG, boundingBox } = mapLanguageToPlanet[language];

  const planetPosition = getPlanetPosition(planetPositionRate, boundingBox);

  const shrinkSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
    },
    durationInFrames: 20,
    delay: delay - 1,
  });

  const growSpring = spring({
    frame,
    fps,
    delay,
  });

  const scale =
    (1 - shrinkSpring * 0.9 + growSpring * 0.9) * (isMain ? 1 : 0.7);

  const rotate = isAction ? noise : 0;

  return (
    <div
      style={{
        position: "absolute",
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        top: planetPosition.y,
        left: planetPosition.x,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlanetSVG />
    </div>
  );
};
