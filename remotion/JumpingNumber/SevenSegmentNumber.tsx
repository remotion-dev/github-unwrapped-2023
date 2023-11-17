import React from "react";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { injectFont } from "../font";
import { SevenSegment } from "../SevenSegment/SevenSegmentNumber";

export const jumpingNumberSchema = z.object({
  duration: z.number().int().default(60),
  from: z.number().int().default(0),
  to: z.number().int().default(100),
});

injectFont();

export const SevenSegmentNumber: React.FC<
  z.infer<typeof jumpingNumberSchema>
> = ({ duration, from, to }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: duration,
  });

  const value = interpolate(spr, [0, 1], [from, to], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <span
      style={{
        fontVariantNumeric: "tabular-nums",
        display: "inline-block",
      }}
    >
      <SevenSegment max={to} num={Math.round(value)} fontSize={120} />
    </span>
  );
};
