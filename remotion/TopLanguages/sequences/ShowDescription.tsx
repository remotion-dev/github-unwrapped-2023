import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";
import { topLanguagesSchema, ZoomedOutTopLanguages } from "..";
import {
  actionPositions,
  ACTION_DURATION,
  complexCurvePathLength,
  newPath,
} from "../constants";
import { LangugageDescription } from "../LanguageDescription";
import { getNewRate } from "../Rocket";

const SCALE_BREAKPOINT = 130;

const computeTranslation = (
  frame: number,
  scale = 1
): { marginLeft: number; marginTop: number } => {
  // return { marginLeft: -860, marginTop: -250 };

  const rate = getNewRate(frame);
  console.log(frame);

  if (frame < SCALE_BREAKPOINT) {
    return { marginLeft: -860, marginTop: -250 };
  }

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
  const { marginLeft, marginTop } = computeTranslation(frame, scale);

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
      />
      {languages.map((l, index) => {
        return (
          <LangugageDescription
            key={l + index}
            actionFrames={[
              actionPositions[index],
              actionPositions[index] + ACTION_DURATION,
            ]}
            language={l}
            position={index}
          />
        );
      })}
    </AbsoluteFill>
  );
};
