import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { VIDEO_FPS } from "../../types/constants";

import type { Rocket } from "../../src/config";
import { RocketSide } from "../Spaceship";
import Stars from "./SparkingStars";
import { Threads } from "./Threads";

export const GOLD_PLANET_ASSET = staticFile("gold-planet.svg");
export const GOLD_PLANET_BG = staticFile("gold-gradient-bg.png");
export const GOLD_PLANET_SOUND = staticFile("church_chior.mp3");

export const GoldenScene: React.FC<{
  rocket: Rocket;
}> = ({ rocket }) => {
  const frame = useCurrentFrame();

  const gradient = spring({
    fps: VIDEO_FPS,
    frame: frame / 6,
    config: {
      damping: 200,
    },
  });

  const planet = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    config: {
      damping: 200,
    },
  });

  const channel = spring({
    fps: VIDEO_FPS,
    frame,
    delay: 30,
    config: {
      damping: 200,
    },
  });

  const starship = spring({
    fps: VIDEO_FPS,
    frame: frame / 12,
    delay: 0,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio
        // TODO: License
        // TODO: Mute other sound
        src={staticFile("church_chior.mp3")}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 60,
          width: "100%",
          height: "100%",
        }}
      >
        <AbsoluteFill style={{ background: "black" }}>
          <Stars />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            top: gradient * 800 - 800,
            left: gradient * 800 - 800,
          }}
        >
          <Img src={GOLD_PLANET_BG} />
        </AbsoluteFill>
        <Threads />
        <div
          style={{
            opacity: channel,
            position: "absolute",
            left: 410,
            top: -1000 + 1000 * channel,
            width: 240,
            height: "100%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        <Img
          src={staticFile("golden-planet.png")}
          style={{
            width: 900,
            position: "absolute",
            bottom: -300 + 200 * planet,
            left: 85,
          }}
        />

        <AbsoluteFill
          style={{
            position: "absolute",
            left: 330,
          }}
        >
          <div
            style={{
              width: 400,
              position: "relative",
              top: -600 + 1150 * starship,
            }}
          >
            <RocketSide rocket={rocket} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
