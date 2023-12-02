import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import Background from "./Background";
import Foreground from "./Foreground";
import { TakeOff } from "./TakeOff";

export const OPENING_SCENE_LENGTH = 60;

export const OpeningScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio
        startFrom={0}
        src={staticFile(
          "SCI FI SPACESHIP Medium 03 Exterior Start Departure Fast 01.mp3",
        )}
      />
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
        <AbsoluteFill>
          <TakeOff />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
