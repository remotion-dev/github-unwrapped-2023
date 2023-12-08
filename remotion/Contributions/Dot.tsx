import React, { useMemo } from "react";
import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { appearDelays } from "./compute-positions";

export type ContributionDotType = {
  col: number;
  row: number;
  x: number;
  y: number;
  opacity: number;
  borderRadius: string | number;
  width: number;
  height: number;
  glow: number;
  data: number;
  index: number;
};

const START_SPREAD = 120;
const END_SPREAD = 150;

const SPREAD_DURATION = END_SPREAD - START_SPREAD;

export const ContributionDot: React.FC<{
  dot: ContributionDotType;
}> = ({ dot: p }) => {
  const frame = useCurrentFrame();
  const starColor = "#a3d3ff";

  const activityColor = interpolateColors(
    p.data,
    [0, 128],
    ["#202138", "#2486ff"],
  );

  const { delay: appearDelay } = appearDelays[p.index];

  const moveDelay = START_SPREAD + appearDelay;

  const moveProgress = interpolate(
    frame,
    [moveDelay, moveDelay + SPREAD_DURATION],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    },
  );

  const color = interpolateColors(
    1 + moveProgress,
    [0, 1, 2],
    ["#202138", activityColor, starColor],
  );

  const style: React.CSSProperties = useMemo(() => {
    return {
      position: "absolute",
      left: p.x,
      top: p.y,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: p.height + p.glow,
      width: p.width + p.glow,
      opacity: p.opacity,
      borderRadius: "50%",
      background:
        p.glow > 0
          ? "radial-gradient(circle at center, #e0ff5e 0, #3b6dd1 30%, #0086d4 50%, #021d57 65%, #01194a 100%)"
          : undefined,
    };
  }, [p.glow, p.height, p.opacity, p.width, p.x, p.y]);

  const inner: React.CSSProperties = useMemo(() => {
    return {
      height: p.height,
      width: p.width,
      borderRadius: p.borderRadius,
      background: color,
    };
  }, [p.borderRadius, color, p.height, p.width]);

  return (
    <div style={style}>
      <div style={inner} />
    </div>
  );
};
