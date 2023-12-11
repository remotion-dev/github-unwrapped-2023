import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { VIDEO_FPS } from "../../types/constants";

export const GoldPlanetShine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const channel = spring({
    fps: VIDEO_FPS,
    frame,
    config: {
      damping: 200,
    },
  });

  const fadeOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: 2 * VIDEO_FPS + 1,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: channel - fadeOut,
          position: "absolute",
          top: -1000 + 1000 * channel,
          width: 320,
          height: "100%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
    </AbsoluteFill>
  );
};
