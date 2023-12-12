import { TransitionSeries, springTiming } from "@remotion/transitions";
import { flip } from "@remotion/transitions/flip";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CallToAction } from "../EndScene/CallToAction";
import { RemotionShineEffect } from "../PullRequests/RemotionShineEffect";
import type { PromoVideoLayout } from "./promo-video-layout";

export const PromoVideoCallToAction: React.FC<{
  layout: PromoVideoLayout;
}> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pressIn = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: 27,
  });

  return (
    <AbsoluteFill
      style={{
        perspective: 1000,
        scale: layout === "landscape" ? "0.8" : "1",
      }}
    >
      <TransitionSeries
        style={{
          transform: `scale(${interpolate(
            frame,
            [0, 100],
            [1, 1.1],
          )}) rotateX(${interpolate(frame, [0, 100], [0, 0.2])}rad)`,
        }}
      >
        <TransitionSeries.Sequence durationInFrames={60}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "#30313E",
                  borderRadius: 10,
                  width: 800,
                  height: 140,
                  border: "5px solid rgba(255,255,255, 0.1)",
                  color: "rgba(255, 255,255, 8)",
                  paddingLeft: 40,
                  fontFamily: "Mona Sans",
                  fontSize: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  lineHeight: "125px",
                }}
              >
                <RemotionShineEffect
                  width={800}
                  height={140}
                  borderRadius={10}
                  id="hi"
                />

                {"YourUsername".substring(0, Math.round(frame - 10))}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#484B5C",
                width: 800,
                height: 140,
                borderRadius: 10,
                marginTop: 30,
                fontFamily: "Mona Sans",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
                scale: String(1 - pressIn * 0.1),
              }}
            >
              Unwrap
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={springTiming({
            config: {
              damping: 200,
            },
          })}
          presentation={flip({ direction: "from-right" })}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <AbsoluteFill
            style={{
              scale: "1.2",
            }}
          >
            <CallToAction enterProgress={1} exitProgress={0} planet="Ice" />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
