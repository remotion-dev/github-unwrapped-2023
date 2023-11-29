import { noise2D } from "@remotion/noise";
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

  const xShake = noise2D("xshake", frame / 10, 0) * 10;
  const yShake = noise2D("yshake", frame / 10, 0) * 10;

  const distance = interpolate(entryProgress, [0, 1], [0.000000005, 1], {});
  const scaleDivided = 1 / distance;

  return (
    <AbsoluteFill
      style={{
        scale: String(scaleDivided),
        transform: `scale(${scaleDivided}) translate(${xShake}px, ${yShake}px)`,
      }}
    >
      <CockpitSVG />
    </AbsoluteFill>
  );
};
