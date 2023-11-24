import React from "react";
import { AbsoluteFill } from "remotion";
import { RadialGradient } from "../RadialGradient";
import { PANE_BACKGROUND, PANE_BORDER } from "./Pane";
import { TitleCardOctocat } from "./TitleCardOctocat";
import SkySVG from "./svgs/SkySVG";

export const TopLanguagesTitleCard: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.2 }}>
        <RadialGradient />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.2 }}>
        <SkySVG style={{ transform: "scale(7)" }} />
      </AbsoluteFill>
      <TitleCardOctocat />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 80,
            fontFamily: "Mona Sans",
            fontWeight: 800,
            lineHeight: 1.1,
            backgroundColor: PANE_BACKGROUND,
            padding: "20px 80px",
            borderRadius: 50,
            border: PANE_BORDER,
            textAlign: "center",
          }}
        >
          Your top <br /> languages of 2023
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
