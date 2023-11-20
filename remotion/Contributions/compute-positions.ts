import { noise2D } from "@remotion/noise";
import { interpolate, interpolateColors, random, spring } from "remotion";
import type { ContributionDotType } from "./Dot";

const INITIAL_SIZE = 15;

const OFFSET_X = 70;
const OFFSET_Y = 0;
const SPACING = 3;

const START_SPREAD = 120;
const END_SPREAD = 135;

const SPREAD_DURATION = END_SPREAD - START_SPREAD;

const MAX_STAR_SIZE = 6;
const MIN_STAR_SIZE = 1;

const MAX_STAR_GLOW = 23;

const MIN_OPACITY = 1;

export const computePositions = (params: {
  frame: number;
  fps: number;
  data: number[][];
}) => {
  const max = Math.max(...params.data.map((d) => d[1]));
  const maxIndex = params.data.findIndex((d) => d[1] === max);

  const dataObject: Record<number, number> = Object.fromEntries(params.data);

  const positions = new Array(364).fill(0).map((_, i): ContributionDotType => {
    const col = Math.floor(i / 7);
    const row: number = i % 7;

    const x = col * (SPACING + INITIAL_SIZE) + OFFSET_X;
    const y = row * (SPACING + INITIAL_SIZE) + OFFSET_Y;

    const appearDelay = random(i) * 30;

    const noiseX = noise2D(`${i}x`, x * 10, y * 10);
    const noiseY = noise2D(`${i}y`, x * 10, y * 10);

    const appearFrame = 30 + appearDelay;
    const appear = params.frame > appearFrame;

    const moveDelay = START_SPREAD + appearDelay;
    const moveProgress = spring({
      fps: params.fps,
      frame: params.frame,
      delay: moveDelay,
      config: {},
      durationInFrames: SPREAD_DURATION,
    });

    const maxOpacity = interpolate(
      dataObject[i],
      [0, 128],
      [0.2, i === maxIndex ? 1 : 0.9],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const color =
      dataObject[i] > 0 && appear
        ? interpolateColors(
            dataObject[i],
            [0, 128],
            ["#0c2945", params.frame < moveDelay ? "#2486ff" : "#a3d3ff"]
          )
        : "#202138";

    const scale = interpolate(
      params.frame,
      [appearFrame, appearFrame + 30],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const opacity = interpolate(
      moveProgress,
      [0, 1],
      [MIN_OPACITY, scale * maxOpacity]
    );

    const xDelta = noiseX * 200;
    const yDelta = noiseY * 800 + 50;

    const xOffset = interpolate(
      params.frame,
      [moveDelay, moveDelay + SPREAD_DURATION],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const yOffset = interpolate(
      params.frame,
      [moveDelay, moveDelay + SPREAD_DURATION],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    const finalSize = interpolate(
      dataObject[i],
      [0, 128],
      [MIN_STAR_SIZE, MAX_STAR_SIZE]
    );

    const sizeOffset = INITIAL_SIZE * (1 - moveProgress);

    const size = interpolate(
      moveProgress,
      [0, 1],
      [INITIAL_SIZE, finalSize + sizeOffset]
    );

    const maxGlow = interpolate(dataObject[i], [0, 128], [0, MAX_STAR_GLOW]);
    const glow = interpolate(moveProgress, [0, 1], [0, maxGlow]);

    const borderRadius = interpolate(moveProgress, [0, 1], [3, size / 2]);

    return {
      col,
      row,
      x: x + xOffset * xDelta,
      y: y + yOffset * yDelta,
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
