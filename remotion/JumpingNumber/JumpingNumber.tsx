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

  const JUMPS = 10;
  const timePerNumber = duration / (to - from);
  const desiredTimePerJump = duration / JUMPS;
  const closestTimeDivisibleByJump = Math.max(
    1,
    Math.round(desiredTimePerJump / timePerNumber) * timePerNumber
  );

  const value = interpolate(frame, [0, duration - 1], [from, to], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const scaleProgress = spring({
    fps,
    frame: frame % closestTimeDivisibleByJump,
    config: {
      damping: 200,
    },
    durationInFrames: closestTimeDivisibleByJump,
  });

  const scale = interpolate(scaleProgress, [0, 1], [0.9, 1], {
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
        style={{ fontSize: 300, fontFamily: "Mona Sans", scale: String(scale) }}
      >
        {Math.round(value)}
      </h1>
    </div>
  );
};
