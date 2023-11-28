import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Box } from "./Box";

export const SponsorshipsScene: React.FC = () => {
  // const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,

        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>

      <Box currentFrame={frame} startFrame={0} x={520} y={640} scale={1.2} />
    </AbsoluteFill>
  );
};
