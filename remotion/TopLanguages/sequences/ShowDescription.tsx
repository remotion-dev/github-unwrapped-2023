import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";
import { TopLanguagesCanvas, topLanguagesSchema } from "..";
import {
  actionPositions,
  ACTION_DURATION,
  complexCurvePathLength,
  newPath,
} from "../constants";
import { LangugageDescription } from "../LanguageDescription";
import { getNewRate } from "../Rocket";

const SCALE_BREAKPOINT = 130;

const withinBoundaries = (boundaries: [number, number], value: number) => {
  const [min, max] = boundaries;
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

const computeTranslation = (
  frame: number
): { marginLeft: number; marginTop: number } => {
  const rate = getNewRate(frame);

  if (frame < SCALE_BREAKPOINT) {
    return { marginLeft: -1030, marginTop: -0 };
  }

  const point = getPointAtLength(newPath, complexCurvePathLength * rate);

  return {
    marginLeft: Math.max(-1080, -point.x + 520),
    marginTop: -point.y + 520,
  };
};

export const ShowDescription: React.FC<z.infer<typeof topLanguagesSchema>> = (
  props
) => {
  const frame = useCurrentFrame();
  const scale = frame < SCALE_BREAKPOINT ? 1 : 1.6;
  const translation = computeTranslation(frame);

  const languages = [props.first, props.second, props.third];

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <TopLanguagesCanvas
        {...props}
        style={{
          ...translation,
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
