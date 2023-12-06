import { noise2D } from "@remotion/noise";
import { interpolate, interpolateColors, random, spring } from "remotion";
import type { ContributionDotType } from "./Dot";

const INITIAL_SIZE = 15;

const OFFSET_X = 70;
const OFFSET_Y = 0;
const SPACING = 3;

const START_SPREAD = 120;
const END_SPREAD = 150;

const SPREAD_DURATION = END_SPREAD - START_SPREAD;

const MAX_STAR_SIZE = 6;
const MIN_STAR_SIZE = 1;

const MAX_STAR_GLOW = 23;

const MIN_OPACITY = 1;

export const computePositions = (params: {
  frame: number;
  fps: number;
  data: number[];
}) => {
  const max = Math.max(...params.data);
  const maxIndex = params.data.findIndex((d) => d === max);

  const positions = new Array(364).fill(0).map((_, i): ContributionDotType => {
    const col = Math.floor(i / 7);
    const row: number = i % 7;

    const x = col * (SPACING + INITIAL_SIZE) + OFFSET_X;
    const y = row * (SPACING + INITIAL_SIZE) + OFFSET_Y;

    const appearDelay = random(i) * 30 + 15;

    const noiseX = noise2D(`${i}x`, x * 10, y * 10);
    const noiseY = noise2D(`${i}y`, x * 10, y * 10);

    const appear = spring({
      fps: params.fps,
      frame: params.frame,
      delay: appearDelay,
      config: {
        damping: 200,
      },
      durationInFrames: 30,
    });

    const moveDelay = START_SPREAD + appearDelay;

    const moveProgress = spring({
      fps: params.fps,
      frame: params.frame,
      delay: moveDelay,
      config: {
        damping: 200,
      },
      durationInFrames: SPREAD_DURATION,
    });

    const maxOpacity = interpolate(params.data[i], [0, 128], [0.2, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const starColor = "#a3d3ff";

    const activityColor =
      params.data[i] === 0
        ? "#202138"
        : interpolateColors(params.data[i], [0, 128], ["#0c2945", "#2486ff"]);

    const color = interpolateColors(
      appear + moveProgress,
      [0, 1, 2],
      ["#202138", activityColor, starColor],
    );

    const opacity = interpolate(
      moveProgress,
      [0, 1],
      [MIN_OPACITY, moveProgress * maxOpacity],
    );

    const xDelta = noiseX * 200;
    const yDelta = noiseY * 800 + 50;

    const finalSize = interpolate(
      params.data[i],
      [0, 128],
      [MIN_STAR_SIZE, MAX_STAR_SIZE],
    );

    const sizeOffset = INITIAL_SIZE * (1 - moveProgress);

    const size = interpolate(
      moveProgress,
      [0, 1],
      [INITIAL_SIZE, finalSize + sizeOffset],
    );

    const maxGlow = interpolate(params.data[i], [0, 128], [0, MAX_STAR_GLOW]);
    const glow = interpolate(moveProgress, [0, 1], [0, maxGlow]);

    const borderRadius = interpolate(moveProgress, [0, 1], [3, size / 2]);

    return {
      col,
      row,
      x: x + moveProgress * xDelta,
      y: y + moveProgress * yDelta,
      opacity,
      color,
      borderRadius,
      width: size,
      height: size,
      glow,
    };
  });

  return { positions, maxIndex };
};
