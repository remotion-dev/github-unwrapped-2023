import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { JumpingNumber } from "../JumpingNumber/JumpingNumber";
import {
  UFO_ENTRANCE_DELAY,
  UFO_ENTRANCE_DURATION,
} from "./make-ufo-positions";
import { ROCKET_JUMP_IN_DELAY, ROCKET_JUMP_IN_DURATION } from "./Rocket";

export const IssueNumber: React.FC<{
  closedIssues: number;
  openIssues: number;
}> = ({ closedIssues, openIssues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: UFO_ENTRANCE_DURATION,
    delay: UFO_ENTRANCE_DELAY,
  });

  const fadeOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: ROCKET_JUMP_IN_DELAY,
    durationInFrames: ROCKET_JUMP_IN_DURATION,
  });

  return (
    <AbsoluteFill
      style={{
        color: "white",
        fontFamily: "Mona Sans",
        fontWeight: "800",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        scale: String(scale),
        marginTop: 50,
        opacity: 1 - fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 150,
        }}
      >
        <JumpingNumber
          duration={30}
          from={0}
          to={closedIssues + openIssues}
        ></JumpingNumber>
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          color: "white",
          fontSize: 30,
        }}
      >
        issues opened
      </div>
    </AbsoluteFill>
  );
};
