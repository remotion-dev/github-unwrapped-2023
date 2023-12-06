import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import React from "react";
import type { AccentColor } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { FPS } from "../Issues/make-ufo-positions";
import { JumpingNumber } from "../JumpingNumber/JumpingNumber";
import { Noise } from "../Noise";
import { accentColorToGradient } from "../Opening/TitleImage";
import { ContributionDot } from "./Dot";
import { Sparkle } from "./Sparkle";
import { computePositions } from "./compute-positions";

const TIMELINE_OFFSET_Y = 420;

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

  const entrance = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
  });

  const entranceYOffset = interpolate(
    entrance,
    [0, 1],
    [-120, TIMELINE_OFFSET_Y],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
      }}
    >
      <AbsoluteFill>
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Noise translateX={0} translateY={0} />
      </AbsoluteFill>
      <div
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          top: entranceYOffset,
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
      <Sparkle
        x={target.x}
        y={target.y + TIMELINE_OFFSET_Y}
        scale={1}
        currentFrame={frame}
        startFrame={160}
      />
      <AbsoluteFill
        style={{
          fontSize: 100,
          color: "white",
          fontFamily: "Mona Sans",
          fontWeight: "800",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 40,
        }}
      >
        <JumpingNumber duration={60} from={0} to={13239} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
