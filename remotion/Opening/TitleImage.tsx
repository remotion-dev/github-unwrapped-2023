import React from "react";
import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import type { AccentColor } from "../../src/config";
import {
  accentColorSchema,
  openingSceneStartAngle,
  rocketSchema,
} from "../../src/config";
import type { GradientType } from "../Gradients/available-gradients";
import { PANE_BORDER } from "../TopLanguages/Pane";

export const openingTitleSchema = z.object({
  login: z.string(),
  startAngle: openingSceneStartAngle,
  rocket: rocketSchema,
  accentColor: accentColorSchema,
});

const TITLE_IMAGE_INNER_BORDER_RADIUS = 30;
const TITLE_IMAGE_BORDER_PADDING = 20;

export const accentColorToGradient = (
  accentColor: AccentColor,
): GradientType => {
  if (accentColor === "blue") {
    return "blueRadial";
  }

  return "purpleRadial";
};

export const getAvatarImage = (login: string) => {
  return `https://github.com/${login}.png`;
};

export const TitleImage: React.FC<z.infer<typeof openingTitleSchema>> = ({
  login,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flip = spring({
    fps,
    frame,
    config: {},
    delay: 50,
  });

  const flipRad = interpolate(flip, [0, 1], [Math.PI, 0]);

  return (
    <div
      style={{
        height: 160,
        width: 160,
        marginRight: TITLE_IMAGE_BORDER_PADDING,
        perspective: 1000,
        position: "relative",
      }}
    >
      <Img
        src={getAvatarImage(login)}
        style={{
          width: 160,
          borderRadius: TITLE_IMAGE_INNER_BORDER_RADIUS,
          height: 160,
          border: PANE_BORDER,
          transform: `rotateY(${flipRad}rad)`,
          backfaceVisibility: "hidden",
          position: "absolute",
        }}
      />
    </div>
  );
};
