import React from "react";
import { AbsoluteFill, OffthreadVideo, Series, staticFile } from "remotion";
import { RemotionShineEffect } from "../PullRequests/RemotionShineEffect";

export const YourYearInReview: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "bold",
        fontSize: 65,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          height: 350,
          width: 350,
          marginRight: 50,
          borderRadius: 40,
          position: "relative",
        }}
      >
        <AbsoluteFill>
          <RemotionShineEffect
            width={350}
            height={350}
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
                height: 348,
                width: 348,
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
                height: 348,
                width: 348,
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
                height: 348,
                width: 348,
                borderRadius: 20,
                marginRight: 50,
              }}
              src={staticFile("sample.mp4")}
            />
          </Series.Sequence>
        </Series>
      </div>
      <div>
        Your coding year
        <br />
        in review
      </div>
    </AbsoluteFill>
  );
};
