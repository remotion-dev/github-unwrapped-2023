import React from "react";

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { injectFont } from "../font";

export const jumpingNumberSchema = z.object({
  duration: z.number().int().default(60),
  from: z.number().int().default(0),
  to: z.number().int().default(100),
});

injectFont();

export const JumpingNumber: React.FC<z.infer<typeof jumpingNumberSchema>> = ({
  duration,
  from,
  to,
}) => {
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

  const lastDigit = to % 10;

  const scale = interpolate((value - lastDigit - 1) % 10, [0, 9], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 300,
          fontFamily: "Mona Sans",
          scale: String(scale),
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {Math.round(value)}
      </h1>
    </div>
  );
};
