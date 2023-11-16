import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ZoomedOutTopLanguages } from "..";
import {
  complexCurvePathLength,
  newPath,
  PLANET_POSITIONS,
} from "../constants";
import { getRate } from "../Rocket";

const computeTranslation = (
  frame: number,
  scale = 1
): { marginLeft: number; marginTop: number } => {
  if (frame < 250) {
    return { marginLeft: -860, marginTop: -250 };
  }

  const rate = getRate({
    frame,
    actionLocations: PLANET_POSITIONS,
  });

  const point = getPointAtLength(newPath, complexCurvePathLength * rate);

  const center = 1080;

  const scaledPoint = {
    x: 1080 + (point.x - center) * scale,
    y: 1080 + (point.y - center) * scale,
  };

  return {
    marginLeft: -scaledPoint.x + 520,
    marginTop: -scaledPoint.y + 520,
  };
};

export const ShowDescription: React.FC = (props) => {
  const frameOffset = 80;
  const frame = useCurrentFrame();
  const scale = frame < 170 ? 0.8 : 1.6;
  const { marginLeft, marginTop } = computeTranslation(
    frame + frameOffset,
    scale
  );

  return (
    <AbsoluteFill>
      <ZoomedOutTopLanguages
        first={""}
        second={""}
        third={""}
        style={{
          marginLeft: marginLeft,
          marginTop: marginTop,
          transform: `scale(${scale})`,
        }}
        frameOffset={frameOffset}
      />
    </AbsoluteFill>
  );
};
