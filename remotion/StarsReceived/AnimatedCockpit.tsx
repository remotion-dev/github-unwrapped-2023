import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import CockpitSVG from "./CockpitSVG";

export const AnimatedCockpit: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const entryProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const scale = interpolate(entryProgress, [0, 1], [4, 1]);

  return (
    <AbsoluteFill
      style={{
        scale: String(scale),
      }}
    >
      <CockpitSVG />
    </AbsoluteFill>
  );
};
