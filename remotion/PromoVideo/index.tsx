import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { PromoVideoTitle } from "./Title";
import { YourYearInReview } from "./Title2";

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("trailer.wav")} />
      <Gradient gradient="blueRadial" />
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <Noise translateX={0} translateY={0} />
      </AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <PromoVideoTitle />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: {
              damping: 200,
            },
          })}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <YourYearInReview />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
