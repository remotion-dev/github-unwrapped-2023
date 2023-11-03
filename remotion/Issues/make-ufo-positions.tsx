import { noise2D } from "@remotion/noise";
import { interpolate } from "remotion";
import { sampleUniqueIndices } from "./sample-indices";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

export const CANVAS_WIDTH = 1080;
export const PADDING = 100;
export const USABLE_CANVAS_WIDTH = CANVAS_WIDTH - PADDING * 2;
export const ROCKET_ORIGIN_X = CANVAS_WIDTH / 2;
export const ROCKET_ORIGIN_Y = CANVAS_WIDTH - 150;

export type UfoPosition = {
  x: number;
  y: number;
  scale: number;
  shootDelay: number;
  shootDuration: number;
  isClosed: boolean;
};

const issuesPerRow = (numberOfIssues: number) => {
  if (numberOfIssues < 4) {
    return 3;
  }
  if (numberOfIssues < 15) {
    return 4;
  }
  if (numberOfIssues < 30) {
    return 6;
  }
  return 8;
};

export const makeUfoPositions = (
  numberOfUfos: number,
  closedIssues: number,
  frame: number
): UfoPosition[] => {
  const perRow = issuesPerRow(numberOfUfos);
  const spaceInbetweenUfo = 10;

  const ufoContainerWidth =
    (USABLE_CANVAS_WIDTH - (perRow - 1) * spaceInbetweenUfo) / perRow;

  const ufoScale = 1 / (UFO_WIDTH / ufoContainerWidth);
  const ufoHeight = UFO_HEIGHT * ufoScale;

  const rowHeight = ufoHeight + 10;

  const totalAnimationDuration = Math.max(30, Math.min(90, numberOfUfos * 14));

  const delayBetweenAnimations = totalAnimationDuration / closedIssues;

  const closedIndices = sampleUniqueIndices(numberOfUfos, closedIssues);

  return new Array(numberOfUfos).fill(0).map((_, i) => {
    const width = ufoContainerWidth;

    const row = Math.floor(i / perRow);
    const column = i % perRow;

    return {
      x:
        width * column +
        PADDING +
        width / 2 +
        column * spaceInbetweenUfo +
        noise2D("seed", frame / 100, i) * 10,
      y: PADDING + row * rowHeight + Math.sin(frame / 20 + column / 6) * 30,
      scale: ufoScale,
      shootDelay:
        (closedIssues - closedIndices.indexOf(i)) * delayBetweenAnimations + 60,
      shootDuration: 14,
      isClosed: closedIndices.includes(i),
    };
  });
};

export const rocketRotation = (positions: UfoPosition[], frame: number) => {
  const sortedByDelay = positions
    .filter((p) => p.isClosed)
    .sort((a, b) => a.shootDelay - b.shootDelay);

  const angles = sortedByDelay.map((p) => {
    const angle = getAngleForShoot(p.x, p.y);
    return { angle, delay: p.shootDelay };
  });
  if (angles.length === 0) {
    return 0;
  }

  if (angles.length === 1) {
    return angles[0].angle;
  }

  return interpolate(
    frame,
    angles.map((a) => a.delay),
    angles.map((a) => a.angle),
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
};

export const getAngleForShoot = (targetX: number, targetY: number) => {
  const deltaX = targetX - ROCKET_ORIGIN_X;
  const deltaY = targetY - ROCKET_ORIGIN_Y;
  let angleRadians = Math.atan2(deltaY, deltaX);
  return angleRadians;
};
