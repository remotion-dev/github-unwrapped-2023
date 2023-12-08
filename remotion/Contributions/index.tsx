import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

import React, { useMemo } from "react";
import type { AccentColor } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { FPS } from "../Issues/make-ufo-positions";
import { accentColorToGradient } from "../Opening/TitleImage";
import { ContributionDot } from "./Dot";
import { computePositions } from "./compute-positions";

export const CONTRIBUTIONS_SCENE_DURATION = 7 * FPS;
export const CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION = 10;

const container: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  fontSize: 60,
};

export const ContributionsScene: React.FC<{
  accentColor: AccentColor;
  contributionData: number[];
}> = ({ accentColor, contributionData }) => {
  const frame = useCurrentFrame();

  const { positions } = useMemo(() => {
    return computePositions({
      data: contributionData,
    });
  }, [contributionData]);

  const fadeInGradient = interpolate(frame, [5, 12], [0, 1]);

  return (
    <AbsoluteFill style={container}>
      <AbsoluteFill style={{ opacity: fadeInGradient }}>
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>
      <div
        style={{
          width: "100%",
          position: "absolute",
          opacity: fadeInGradient,
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
