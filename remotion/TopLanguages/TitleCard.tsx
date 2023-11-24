import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { RadialGradient } from "../RadialGradient";
import { Rocket } from "./Rocket";
import { TitleCardOctocat } from "./TitleCardOctocat";
import { TopLanguagesTitle } from "./TopLanguagesTitle";
import SkySVG from "./svgs/SkySVG";

export const TopLanguagesTitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const zoomOutProgress = interpolate(frame, [0, 80], [0, 1]);
  const scale = interpolate(zoomOutProgress, [0, 1], [1.3, 1]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.5 }}>
        <RadialGradient />
      </AbsoluteFill>
      <Sequence from={30} style={{ transform: `translateY(-300px)` }}>
        <AbsoluteFill style={{ marginTop: 200, marginLeft: 300 }}>
          <Rocket />
        </AbsoluteFill>
      </Sequence>
      <AbsoluteFill style={{ opacity: 0.5 }}>
        <SkySVG style={{ transform: "scale(1)" }} />
      </AbsoluteFill>
      <TitleCardOctocat />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TopLanguagesTitle />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
