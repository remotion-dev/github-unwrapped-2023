import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Series,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { RemotionShineEffect } from "../PullRequests/RemotionShineEffect";
import type { PromoVideoLayout } from "./promo-video-layout";

export const YourYearInReview: React.FC<{
  layout: PromoVideoLayout;
}> = ({ layout }) => {
  const widthWidth = layout === "short" ? 800 : 350;
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${interpolate(frame, [0, 100], [1, 1.1])})`,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "bold",
        fontSize: layout === "landscape" ? 65 : 70,
        display: "flex",
        flexDirection: layout === "landscape" ? "row" : "column",
      }}
    >
      <div
        style={{
          height: widthWidth,
          width: widthWidth,
          marginRight: layout === "landscape" ? 50 : 0,
          borderRadius: 40,
          position: "relative",
        }}
      >
        <AbsoluteFill>
          <RemotionShineEffect
            width={widthWidth}
            height={widthWidth}
            borderRadius={20}
            id="hi"
          />
        </AbsoluteFill>
        <Series>
          <Series.Sequence durationInFrames={60}>
            <OffthreadVideo
              startFrom={320}
              muted
              style={{
                position: "absolute",
                height: widthWidth - 2,
                width: widthWidth - 2,
                borderRadius: 20,
                marginRight: 50,
              }}
              src={staticFile("sample.mp4")}
            />
          </Series.Sequence>
          <Series.Sequence durationInFrames={60}>
            <OffthreadVideo
              startFrom={550}
              muted
              style={{
                position: "absolute",
                height: widthWidth - 2,
                width: widthWidth - 2,
                borderRadius: 20,
                marginRight: 50,
              }}
              src={staticFile("sample.mp4")}
            />
          </Series.Sequence>
          <Series.Sequence durationInFrames={60}>
            <OffthreadVideo
              startFrom={830}
              muted
              style={{
                height: widthWidth - 2,
                width: widthWidth - 2,
                borderRadius: 20,
                marginRight: 50,
              }}
              src={staticFile("sample.mp4")}
            />
          </Series.Sequence>
        </Series>
      </div>
      <div
        style={{
          textAlign: layout === "landscape" ? "left" : "center",
          marginTop: layout === "landscape" ? 0 : 150,
          backgroundClip: "text",
          backgroundImage:
            "linear-gradient(270.02deg, #bbb 20.63%, #fff 99.87%)",
          WebkitBackgroundClip: "text",
          backgroundColor: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Get your
        <br />
        personalized video
      </div>
    </AbsoluteFill>
  );
};
