import { noise2D } from "@remotion/noise";
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SevenSegment } from "../SevenSegment/SevenSegmentNumber";

export const IssueNumber: React.FC<{
  currentNumber: number;
  max: number;
  label: string;
  align: "left" | "right";
}> = ({ currentNumber, label, align, max }) => {
  const frame = useCurrentFrame();

  const opacity = ((noise2D(label, frame / 30, 0) + 1) / 2) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "800",
      }}
    >
      <div
        style={{
          alignItems: align === "left" ? "flex-start" : "flex-end",
          display: "inline-flex",
          flexDirection: "column",
          [align === "left" ? "left" : "right"]: 40,
          width: 300,
          position: "absolute",
          bottom: 35,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <div style={{ opacity }}>
          <SevenSegment max={max} num={currentNumber} fontSize={120} />
        </div>
        <div
          style={{
            fontFamily: "Mona Sans",
            color: "white",
            fontSize: 30,
            marginBottom: 14,
            marginTop: 19,
            fontWeight: "700",
            paddingLeft: align === "left" ? 15 : 0,
            paddingRight: align === "right" ? 15 : 0,
            opacity: 0.7,
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
