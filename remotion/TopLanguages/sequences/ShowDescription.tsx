import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";
import { topLanguagesSchema, ZoomedOutTopLanguages } from "..";
import {
  complexCurvePathLength,
  newPath,
  PLANET_POSITIONS,
} from "../constants";
import { LangugageDescription } from "../LanguageDescription";
import { getRate } from "../Rocket";

const FRAME_OFFSET = 40;
const SCALE_BREAKPOINT = 140;

const computeTranslation = (
  frame: number,
  scale = 1
): { marginLeft: number; marginTop: number } => {
  if (frame < SCALE_BREAKPOINT + FRAME_OFFSET) {
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

export const ShowDescription: React.FC<z.infer<typeof topLanguagesSchema>> = (
  props
) => {
  const frame = useCurrentFrame();
  const scale = frame < SCALE_BREAKPOINT ? 0.8 : 1.6;
  const { marginLeft, marginTop } = computeTranslation(
    frame + FRAME_OFFSET,
    scale
  );

  const languages = [props.first, props.second, props.third];

  return (
    <AbsoluteFill>
      <ZoomedOutTopLanguages
        {...props}
        style={{
          marginLeft: marginLeft,
          marginTop: marginTop,
          transform: `scale(${scale})`,
        }}
        frameOffset={FRAME_OFFSET}
      />
      {languages.map((l, index) => (
        <LangugageDescription
          key={l + index}
          language={l}
          position={index}
          frameOffset={FRAME_OFFSET}
        />
      ))}
    </AbsoluteFill>
  );
};
