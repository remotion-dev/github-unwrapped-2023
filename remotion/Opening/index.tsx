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
import type { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import Background from "./Background";
import Foreground from "./Foreground";
import { TakeOff } from "./TakeOff";
import { OpeningTitle } from "./Title";
import type { openingTitleSchema } from "./TitleImage";

export const OPENING_SCENE_LENGTH = 120;
export const OPENING_SCENE_OUT_TRANSITION = 20;

const OpeningSceneFull: React.FC<z.infer<typeof openingTitleSchema>> = ({
  login,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const exitProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: durationInFrames - OPENING_SCENE_OUT_TRANSITION,
    durationInFrames: OPENING_SCENE_OUT_TRANSITION * 3,
  });

  const distance = interpolate(exitProgress, [0, 1], [1, 0.05], {});
  const scaleDivided = 1 / distance;
  const translateX = (scaleDivided - 1) * 200;

  const bottomTranslateY = interpolate(exitProgress, [0, 0.7], [0, 500]);

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
          <OpeningTitle login={login} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            transform: `translateY(${bottomTranslateY}px)`,
          }}
        >
          <Background />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            transformOrigin: "bottom",
            transform: `scale(${scaleDivided}) translateY(${translateX}px)`,
          }}
        >
          <Foreground />
        </AbsoluteFill>
        <AbsoluteFill>
          <TakeOff />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OpeningSceneZoomOut: React.FC<z.infer<typeof openingTitleSchema>> = ({
  login,
}) => {
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
      <OpeningSceneFull login={login} />
    </AbsoluteFill>
  );
};

export const OpeningScene: React.FC<z.infer<typeof openingTitleSchema>> = ({
  login,
}) => {
  return (
    <AbsoluteFill style={{}}>
      <OpeningSceneZoomOut login={login} />
    </AbsoluteFill>
  );
};
