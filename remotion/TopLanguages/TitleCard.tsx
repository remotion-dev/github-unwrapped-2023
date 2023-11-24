import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { RadialGradient } from "../RadialGradient";
import { TitleCardOctocat } from "./TitleCardOctocat";
import { TopLanguagesTitle } from "./TopLanguagesTitle";
import { Intro } from "./sequences/Intro";
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
      <AbsoluteFill style={{ transform: `translateY(-300px)` }}>
        <Intro first="Java" second="JavaScript" third="Java" />
      </AbsoluteFill>
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
