import { TransitionSeries } from "@remotion/transitions";
import React from "react";
import { AbsoluteFill } from "remotion";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { PromoVideoTitle } from "./Title";

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Gradient gradient="blueRadial" />
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <Noise translateX={0} translateY={0} />
      </AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <PromoVideoTitle />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
