import React, { useMemo } from "react";
import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import {
  INITIAL_SIZE,
  MAX_STAR_GLOW,
  MAX_STAR_SIZE,
  MIN_OPACITY,
  MIN_STAR_SIZE,
  appearDelays,
} from "./compute-positions";

export type ContributionDotType = {
  col: number;
  row: number;
  x: number;
  y: number;
  data: number;
  index: number;
};

const END_SPREAD = 210;

const SPREAD_DURATION = END_SPREAD;

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

  const { noiseX, noiseY, delay } = appearDelays[p.index];

  const moveDelay = delay;

  const moveProgress = interpolate(
    frame,
    [0, moveDelay + SPREAD_DURATION],
    [1, 0],
    {
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, -0.02, 0.32, 1),
    },
  );

  const maxOpacity = interpolate(p.data, [0, 128], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    moveProgress,
    [0, 1],
    [MIN_OPACITY, moveProgress * maxOpacity],
  );

  const color = interpolateColors(
    1 + moveProgress,
    [0, 1, 2],
    ["#202138", activityColor, starColor],
  );

  const finalSize = interpolate(
    p.data,
    [0, 128],
    [MIN_STAR_SIZE, MAX_STAR_SIZE],
  );
  const sizeOffset = INITIAL_SIZE * (1 - moveProgress);

  const size = interpolate(
    moveProgress,
    [0, 1],
    [INITIAL_SIZE, finalSize + sizeOffset],
  );

  const maxGlow = interpolate(p.data, [0, 128], [0, MAX_STAR_GLOW]);
  const glow = interpolate(moveProgress, [0, 1], [0, maxGlow]);

  const borderRadius = interpolate(moveProgress, [0, 1], [3, size / 2]);

  const noiseAngle = Math.atan2(noiseY, noiseX);

  const towardsCenter = moveProgress * 1200;

  const pushFromCenter = Math.sin(noiseAngle + frame / 100) * towardsCenter;
  const pushFromTop = Math.cos(noiseAngle + frame / 100) * towardsCenter;

  const xDelta = noiseX * 200;
  const yDelta = noiseY * 800;

  const style: React.CSSProperties = useMemo(() => {
    return {
      position: "absolute",
      left: p.x + moveProgress * xDelta + pushFromCenter,
      top: p.y + moveProgress * yDelta + pushFromTop,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: size + glow,
      width: size + glow,
      opacity,
      borderRadius: "50%",
      background:
        glow > 0
          ? "radial-gradient(circle at center, #e0ff5e 0, #3b6dd1 30%, #0086d4 50%, #021d57 65%, #01194a 100%)"
          : undefined,
    };
  }, [
    glow,
    moveProgress,
    opacity,
    p.x,
    p.y,
    pushFromCenter,
    pushFromTop,
    size,
    xDelta,
    yDelta,
  ]);

  const inner: React.CSSProperties = useMemo(() => {
    return {
      height: size,
      width: size,
      borderRadius,
      background: color,
    };
  }, [size, borderRadius, color]);

  return (
    <div style={style}>
      <div style={inner} />
    </div>
  );
};
