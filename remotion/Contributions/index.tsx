import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import React from "react";
import type { AccentColor } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { FPS } from "../Issues/make-ufo-positions";
import { accentColorToGradient } from "../Opening/TitleImage";
import { ContributionDot } from "./Dot";
import { computePositions } from "./compute-positions";

const TIMELINE_OFFSET_Y = 420;
export const CONTRIBUTIONS_SCENE_DURATION = 7 * FPS;
export const CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION = 10;

export const ContributionsScene: React.FC<{
  accentColor: AccentColor;
  contributionData: number[];
}> = ({ accentColor, contributionData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { positions, maxIndex } = computePositions({
    frame,
    data: contributionData,
    fps,
  });

  const target = positions[maxIndex];

  const fadeInGradient = interpolate(frame, [0, 10], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
      }}
    >
      <AbsoluteFill style={{ opacity: fadeInGradient }}>
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>
      <div
        style={{
          width: "100%",
          position: "absolute",
        }}
      >
        {positions.map((p, i) => (
          <ContributionDot
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            dot={p}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
