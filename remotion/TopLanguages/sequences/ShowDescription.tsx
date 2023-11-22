import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { z } from "zod";
import type { topLanguagesSchema } from "..";
import { TopLanguagesCanvas } from "..";
import { LangugageDescription } from "../LanguageDescription";
import { getNewRate } from "../Rocket";
import {
  ACTION_DURATION,
  actionPositions,
  complexCurvePathLength,
  newPath,
} from "../constants";

const SCALE_BREAKPOINT = 130;

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
            // eslint-disable-next-line react/no-array-index-key
            key={l + index}
            delay={actionPositions[index]}
            duration={ACTION_DURATION / 2}
            language={l}
            position={index}
          />
        );
      })}
    </AbsoluteFill>
  );
};
