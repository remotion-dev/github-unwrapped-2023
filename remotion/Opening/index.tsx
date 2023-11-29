import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import Background from "./Background";
import Foreground from "./Foreground";
import Spaceship from "./Spaceship";

export const OPENING_SCENE_LENGTH = 60;

export const OpeningScene: React.FC = () => {
  // const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
        }}
      >
        <AbsoluteFill>
          <Background />
        </AbsoluteFill>

        <AbsoluteFill style={{ top: 0 }}>
          <Foreground />
        </AbsoluteFill>
        <AbsoluteFill style={{ top: -100 }}>
          <Spaceship />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
