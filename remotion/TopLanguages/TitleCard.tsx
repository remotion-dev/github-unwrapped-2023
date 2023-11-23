import React from "react";
import { AbsoluteFill } from "remotion";
import { OctocatBody } from "../../vite/VideoPage/Background/Octocat-body";
import { OctocatLine } from "../../vite/VideoPage/Background/octocat-line";
import { RadialGradient } from "../RadialGradient";
import { PANE_BACKGROUND, PANE_BORDER } from "./Pane";
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
      <AbsoluteFill>
        <svg
          style={{
            position: "fixed",
            width: "150%",
            bottom: 0,
            right: -100,
          }}
          viewBox="0 0 1442 997"
          fill="none"
        >
          <OctocatBody />
          <OctocatLine />
        </svg>
      </AbsoluteFill>
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
