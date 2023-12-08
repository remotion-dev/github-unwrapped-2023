import React from "react";
import { spring, useCurrentFrame } from "remotion";
import { VIDEO_FPS } from "../../types/constants";

export const GoldPlanetShine: React.FC = () => {
  const frame = useCurrentFrame();
  const channel = spring({
    fps: VIDEO_FPS,
    frame,
    delay: 30,
    config: {
      damping: 200,
    },
  });

  return (
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
  );
};
