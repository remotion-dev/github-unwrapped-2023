import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { AccentColor } from "../../src/config";
import CockpitSVG from "./CockpitSVG";
import { CustomScreen } from "./CustomScreen";
import { HeadsUpDisplay } from "./HeadsUpDisplay";

export const AnimatedCockpit: React.FC<{
  xShake: number;
  yShake: number;
  rotationShake: number;
  accentColor: AccentColor;
  totalPullRequests: number;
}> = ({ xShake, yShake, rotationShake, accentColor, totalPullRequests }) => {
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

  const shake: React.CSSProperties = useMemo(() => {
    return {
      scale: String(scaleDivided),
      transform: `rotate(${rotationShake}rad) scale(${
        // +0.05 so noise doesn't cut off
        scaleDivided + 0.05
      }) translate(${xShake}px, ${yShake}px)`,
    };
  }, [rotationShake, scaleDivided, xShake, yShake]);

  return (
    <AbsoluteFill style={shake}>
      <HeadsUpDisplay />
      <CockpitSVG />
      <Sequence from={271}>
        <CustomScreen
          totalPullRequests={totalPullRequests}
          accentColor={accentColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
