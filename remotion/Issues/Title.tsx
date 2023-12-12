import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const IssuesDetected: React.FC<{
  issues: number;
  exit: number;
}> = ({ issues, exit }) => {
  const frame = useCurrentFrame();
  const opacity =
    interpolate(frame, [20, 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) - exit;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          fontSize: 50,
          fontFamily: "Seven Segment",
          opacity,
          color: "#B0E0BA",
        }}
      >
        {issues} issues invaded
      </div>
    </AbsoluteFill>
  );
};
