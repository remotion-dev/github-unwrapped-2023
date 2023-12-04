import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { AccentColor } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { accentColorToGradient } from "../Opening/TitleImage";
import { Background } from "./Background";
import { Box } from "./Box";

export const SponsorshipsScene: React.FC<{
  accentColor: AccentColor;
}> = ({ accentColor }) => {
  // const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

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
        <Background />
      </AbsoluteFill>

      <Box currentFrame={frame} startFrame={0} x={520} y={640} scale={1.2} />
    </AbsoluteFill>
  );
};
