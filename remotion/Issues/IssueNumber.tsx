import { noise2D } from "@remotion/noise";
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SevenSegment } from "../SevenSegment/SevenSegmentNumber";

export const IssueNumber: React.FC<{
  totalIssues: number;
  label: string;
  align: "left" | "right";
}> = ({ totalIssues, label, align }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = ((noise2D(label, frame / 30, 0) + 1) / 2) * 0.3 + 0.7;

  const currentNumber = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "800",
        justifyContent: "flex-end",
        alignItems: align === "left" ? "flex-start" : "flex-end",
        padding: 40,
      }}
    >
      <div style={{ opacity }}>
        <SevenSegment
          max={totalIssues}
          num={Math.round(currentNumber * totalIssues)}
          fontSize={120}
        />
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          color: "white",
          fontSize: 30,
          marginBottom: 14,
          paddingLeft: align === "left" ? 15 : 0,
          paddingRight: align === "right" ? 9 : 0,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};
