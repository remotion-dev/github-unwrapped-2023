import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Gradient } from "../Gradients/NativeGradient";
import Background from "./Background";
import Foreground from "./Foreground";
import { TakeOff } from "./TakeOff";

export const OPENING_SCENE_LENGTH = 120;

const OpeningSceneFull: React.FC = () => {
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
        }}
      >
        <AbsoluteFill>
          <Gradient gradient="blueRadial" />
        </AbsoluteFill>
        <AbsoluteFill>
          <Background />
        </AbsoluteFill>
        <AbsoluteFill>
          <Foreground />
        </AbsoluteFill>
        <AbsoluteFill>
          <TakeOff />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OpeningSceneZoomOut: React.FC = () => {
  const { width, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const delay = 10;
  const durationInFrames = 60;

  const zoomOut =
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      durationInFrames,
      delay,
    }) *
      0.9 +
    interpolate(frame, [0, delay + durationInFrames], [-0.1, 0.1], {
      extrapolateRight: "clamp",
    });

  const scale = interpolate(zoomOut, [0, 1], [2.5, 1]);
  const offset = interpolate(zoomOut, [0, 1], [width / 2, 0]);
  const x = offset / scale;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translateX(-${x}px) translateY(50px)`,
      }}
    >
      <OpeningSceneFull />
    </AbsoluteFill>
  );
};

export const OpeningScene: React.FC = () => {
  return (
    <AbsoluteFill style={{}}>
      <OpeningSceneZoomOut />
    </AbsoluteFill>
  );
};
