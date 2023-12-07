import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { noise2D } from "@remotion/noise";
import React, { useMemo } from "react";
import type { AccentColor } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { FPS } from "../Issues/make-ufo-positions";
import { accentColorToGradient } from "../Opening/TitleImage";
import { ContributionDot } from "./Dot";
import { Sparkle } from "./Sparkle";
import {
  INITIAL_SIZE,
  OFFSET_X,
  OFFSET_Y,
  SPACING,
  computePositions,
} from "./compute-positions";

const TIMELINE_OFFSET_Y = 420;
export const CONTRIBUTIONS_SCENE_DURATION = 7 * FPS;
export const CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION = 10;

export const ContributionsScene: React.FC<{
  accentColor: AccentColor;
  contributionData: number[];
}> = ({ accentColor, contributionData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearDelays = useMemo(() => {
    return new Array(365).fill(true).map((_, i) => {
      const col = Math.floor(i / 7);
      const row: number = i % 7;

      const x = col * (SPACING + INITIAL_SIZE) + OFFSET_X;
      const y = row * (SPACING + INITIAL_SIZE) + OFFSET_Y;

      return {
        delay: Math.floor(random(i) * 30 + 15),
        noiseX: Number(noise2D(`${i}x`, x * 10, y * 10).toFixed(2)),
        noiseY: Number(noise2D(`${i}y`, x * 10, y * 10).toFixed(2)),
      };
    });
  }, []);
  console.log(appearDelays);

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
    delay: CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION,
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
    </AbsoluteFill>
  );
};
