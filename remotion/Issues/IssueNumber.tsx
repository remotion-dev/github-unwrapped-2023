import React from "react";
import { AbsoluteFill } from "remotion";
import { SevenSegmentNumber } from "../JumpingNumber/SevenSegmentNumber";

export const IssueNumber: React.FC<{
  closedIssues: number;
  openIssues: number;
}> = ({ closedIssues, openIssues }) => {
  return (
    <AbsoluteFill
      style={{
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "800",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 40,
      }}
    >
      <div
        style={{
          fontFamily: "Mona Sans",
          color: "white",
          fontSize: 30,
          marginBottom: 14,
        }}
      >
        Issues opened
      </div>
      <SevenSegmentNumber
        duration={30}
        from={0}
        to={closedIssues + openIssues}
      ></SevenSegmentNumber>
    </AbsoluteFill>
  );
};
