import { interpolate, spring } from "remotion";
import { VIDEO_HEIGHT } from "../../types/constants";
import {
  PADDING,
  ROCKET_ORIGIN_X,
  ROCKET_TOP_Y,
  USABLE_CANVAS_WIDTH,
} from "./constants";
import { ShotWithShootDelay } from "./get-shots-to-fire";
import { sampleUniqueIndices } from "./sample-indices";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

export const getFramesAfterWhichShootProgressIsReached = (
  progressToReach: number,
  shootDuration: number
) => {
  return Math.ceil(progressToReach * shootDuration);
};

export type UfoPosition = {
  x: number;
  y: number;
  scale: number;
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

export const FPS = 30;

const makeYPosition = ({
  entranceYOffset,
  row,
  rowHeight,
}: {
  row: number;
  column: number;
  rowHeight: number;
  entranceYOffset: number;
}) => {
  return PADDING + row * rowHeight + entranceYOffset;
};

const getExtraPaddingIfInOfLastRow = ({
  row,
  numberOfUfos,
  perRow,
  ufoContainerWidth,
  spaceInbetweenUfo,
}: {
  row: number;
  numberOfUfos: number;
  perRow: number;
  ufoContainerWidth: number;
  spaceInbetweenUfo: number;
}) => {
  const inLastRow = row === Math.floor(numberOfUfos / perRow);
  const itemsInThisRow = inLastRow ? numberOfUfos % perRow : perRow;
  const spaceInThisRow =
    itemsInThisRow * ufoContainerWidth +
    spaceInbetweenUfo * (itemsInThisRow - 1);
  return (USABLE_CANVAS_WIDTH - spaceInThisRow) / 2;
};

const makeXPosition = ({
  column,
  i,
  spaceInbetweenUfo,
  ufoContainerWidth,
  perRow,
  numberOfUfos,
}: {
  ufoContainerWidth: number;
  column: number;
  spaceInbetweenUfo: number;
  i: number;
  perRow: number;
  numberOfUfos: number;
}) => {
  const row = Math.floor(i / perRow);
  const extraPadding = getExtraPaddingIfInOfLastRow({
    perRow,
    row,
    spaceInbetweenUfo,
    numberOfUfos,
    ufoContainerWidth,
  });

  const ufoPosition = ufoContainerWidth * column + column * spaceInbetweenUfo;
  const ufoMiddleOffset = ufoContainerWidth / 2;

  return PADDING + ufoMiddleOffset + ufoPosition + extraPadding;
};

const UFOS_MUST_BE_ABOVE_LINE = VIDEO_HEIGHT * 0.4;

export const UFO_ENTRANCE_DURATION = 30;
export const UFO_ENTRANCE_DELAY = 0;

export const makeUfoPositions = ({
  numberOfUfos,
  closedIssues,
  frame,
}: {
  numberOfUfos: number;
  closedIssues: number;
  frame: number;
}): { ufos: UfoPosition[]; closedIndices: number[] } => {
  const perRow = issuesPerRow(numberOfUfos);
  const spaceInbetweenUfo = 30;

  const entrace = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: UFO_ENTRANCE_DURATION,
    delay: UFO_ENTRANCE_DELAY,
  });

  const ufoContainerWidth =
    (USABLE_CANVAS_WIDTH - (perRow - 1) * spaceInbetweenUfo) / perRow;
  const ufoScale = 1 / (UFO_WIDTH / ufoContainerWidth);
  const ufoHeight = UFO_HEIGHT * ufoScale;
  const rowHeight = ufoHeight + 10;
  const rows = Math.ceil(numberOfUfos / perRow);

  const entranceYOffset = interpolate(
    entrace,
    [0, 1],
    [-rows * rowHeight - 100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const totalHeight = rows * rowHeight + PADDING;
  const moveUp = Math.min(0, UFOS_MUST_BE_ABOVE_LINE - totalHeight);

  const closedIndices = sampleUniqueIndices(numberOfUfos, closedIssues);

  const ufos = new Array(numberOfUfos).fill(0).map((_, i): UfoPosition => {
    const row = Math.floor(i / perRow);
    const column = i % perRow;

    return {
      x: makeXPosition({
        column,
        i,
        spaceInbetweenUfo,
        ufoContainerWidth: ufoContainerWidth,
        perRow,
        numberOfUfos: numberOfUfos,
      }),
      y:
        makeYPosition({
          column,
          entranceYOffset,
          row,
          rowHeight,
        }) + moveUp,
      scale: ufoScale,
      isClosed: closedIndices.includes(i),
    };
  });

  return {
    closedIndices,
    ufos: ufos,
  };
};

export const rocketRotation = (
  positions: ShotWithShootDelay[],
  frame: number
) => {
  const sortedByDelay = positions.sort((a, b) => a.shootDelay - b.shootDelay);

  const angles = sortedByDelay.map((p) => {
    const angle = getAngleForShoot(p.endX, p.endY);
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
    // Looks more correct with +1
    angles.map((a) => a.delay + 1),
    angles.map((a) => a.angle),
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
};

export const getAngleForShoot = (targetX: number, targetY: number) => {
  const deltaX = targetX - ROCKET_ORIGIN_X;
  const deltaY = targetY - ROCKET_TOP_Y;
  let angleRadians = Math.atan2(deltaY, deltaX);
  return angleRadians;
};
