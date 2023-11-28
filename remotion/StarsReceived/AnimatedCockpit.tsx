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

  const distance = interpolate(entryProgress, [0, 1], [0.000000005, 1], {});
  const scaleDivided = 1 / distance;

  return (
    <AbsoluteFill
      style={{
        scale: String(scaleDivided),
      }}
    >
      <CockpitSVG />
    </AbsoluteFill>
  );
};
