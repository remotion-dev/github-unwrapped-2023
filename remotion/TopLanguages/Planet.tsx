import { noise2D } from "@remotion/noise";
import { getPointAtLength } from "@remotion/paths";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TRANSFORM_PATH_X, TRANSFORM_PATH_Y } from "../../types/constants";
import {
  complexCurvePathLength,
  LanguageEnumType,
  mapLanguageToPlanet,
  newPath,
} from "./constants";
import { getActionFrames } from "./Rocket";

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
  actionPositions: number[];
  language: LanguageEnumType;
  style?: React.CSSProperties;
  isMain: boolean;
  frameOffset: number;
}> = ({ actionIndex, actionPositions, language, isMain, frameOffset }) => {
  const actionPosition = actionPositions[actionIndex];
  const frame = useCurrentFrame();
  const frameWithOffset = frame + frameOffset;
  const { fps } = useVideoConfig();
  const noise = noise2D("seed", frameWithOffset / 10, 1) * 10;
  const actionFrames = getActionFrames(actionPositions);
  const isAction =
    actionFrames[actionIndex][0] <= frameWithOffset &&
    frameWithOffset < actionFrames[actionIndex][1];

  const { PlanetSVG, boundingBox } = mapLanguageToPlanet[language];

  const planetPosition = getPlanetPosition(actionPosition, boundingBox);

  const shrinkSpring = spring({
    frame: frameWithOffset,
    fps,
    config: {
      damping: 14,
    },
    durationInFrames: 20,
    delay: actionFrames[actionIndex][0],
  });

  const growSpring = spring({
    frame: frameWithOffset,
    fps,
    delay: actionFrames[actionIndex][0],
  });

  return (
    <div
      style={{
        position: "absolute",
        transform: isAction
          ? `scale(${
              (1 - shrinkSpring * 0.9 + growSpring * 0.9) * (isMain ? 1 : 0.5)
            }) rotate(${noise}deg)`
          : `scale(${isMain ? 1 : 0.5})`,
        top: planetPosition.y,
        left: planetPosition.x,
      }}
    >
      <PlanetSVG />
    </div>
  );
};
