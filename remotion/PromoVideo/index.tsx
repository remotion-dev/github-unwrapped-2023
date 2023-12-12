import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { Planets } from "./Planets";
import { PromoVideoTitle } from "./Title";
import { YourYearInReview } from "./Title2";
import { promoVideoLayout } from "./promo-video-layout";

export const promoVideoSchema = z.object({
  layout: promoVideoLayout,
});

export const PromoVideo: React.FC<z.infer<typeof promoVideoSchema>> = ({
  layout,
}) => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("trailer.wav")} />
      <Gradient gradient="blueRadial" />
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <Noise translateX={0} translateY={0} />
      </AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <PromoVideoTitle layout={layout} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({
            config: {
              damping: 200,
            },
          })}
        />
        <TransitionSeries.Sequence durationInFrames={90}>
          <Planets layout={layout} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: {
              damping: 200,
            },
            durationInFrames: 10,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <YourYearInReview layout={layout} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
