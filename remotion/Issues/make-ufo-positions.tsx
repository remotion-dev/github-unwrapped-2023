import { interpolate } from "remotion";
import { VIDEO_HEIGHT } from "../../types/constants";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";
import {
  PADDING,
  ROCKET_ORIGIN_X,
  ROCKET_TOP_Y,
  USABLE_CANVAS_WIDTH,
} from "./constants";
import type { ShotWithShootDelay } from "./get-shots-to-fire";
import { sampleUniqueIndices } from "./sample-indices";

export const getFramesAfterWhichShootProgressIsReached = (
  progressToReach: number,
  shootDuration: number,
) => {
  return Math.ceil(progressToReach * shootDuration);
};

export type UfoPosition = {
  x: number;
  y: number;
  scale: number;
  isClosed: boolean;
  column: number;
};

export const getAngleForShoot = (targetX: number, targetY: number) => {
  const deltaX = targetX - ROCKET_ORIGIN_X;
  const deltaY = targetY - ROCKET_TOP_Y;
  const angleRadians = Math.atan2(deltaY, deltaX);
  return angleRadians;
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
  row,
  rowHeight,
}: {
  row: number;
  column: number;
  rowHeight: number;
}) => {
  return PADDING + row * rowHeight;
};

const getExtraPaddingIfInOfLastRow = ({
  row,
  numberOfUfos,
  columns,
  ufoContainerWidth,
  spaceInbetweenUfo,
}: {
  row: number;
  numberOfUfos: number;
  columns: number;
  ufoContainerWidth: number;
  spaceInbetweenUfo: number;
}) => {
  const inLastRow = row === Math.floor(numberOfUfos / columns);
  const itemsInThisRow = inLastRow ? numberOfUfos % columns : columns;
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
  columns,
  numberOfUfos,
}: {
  ufoContainerWidth: number;
  column: number;
  spaceInbetweenUfo: number;
  i: number;
  columns: number;
  numberOfUfos: number;
}) => {
  const row = Math.floor(i / columns);
  const extraPadding = getExtraPaddingIfInOfLastRow({
    columns,
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

export const UFO_ENTRANCE_DELAY = 5;

const reduceTotalNumberOfUfos = (numberOfUfos: number) => {
  const maxUfos = 100;

  if (numberOfUfos > maxUfos) {
    const factor = 1 / (numberOfUfos / maxUfos);
    return { factor, numberOfUfos: maxUfos };
  }

  return { factor: 1, numberOfUfos };
};

export const makeUfoPositions = ({
  totalUfos: originalTotalUfos,
  closedIssues: originalClosedIssues,
}: {
  totalUfos: number;
  closedIssues: number;
}): {
  ufos: UfoPosition[];
  closedIndices: number[];
  offsetDueToManyUfos: number;
  factor: number;
  columns: number;
  totalHeight: number;
} => {
  const { factor, numberOfUfos: totalUfos } =
    reduceTotalNumberOfUfos(originalTotalUfos);

  const closedIssues = Math.round(originalClosedIssues * factor);

  const columns = issuesPerRow(totalUfos);
  const spaceInbetweenUfo = 30;

  const ufoContainerWidth =
    (USABLE_CANVAS_WIDTH - (columns - 1) * spaceInbetweenUfo) / columns;
  const ufoScale = 1 / (UFO_WIDTH / ufoContainerWidth);
  const ufoHeight = UFO_HEIGHT * ufoScale;
  const rowHeight = ufoHeight + 10;
  const rows = Math.ceil(totalUfos / columns);

  const totalHeight = rows * rowHeight + PADDING;
  const offsetDueToManyUfos = Math.min(
    0,
    UFOS_MUST_BE_ABOVE_LINE - totalHeight,
  );

  const closedIndices = sampleUniqueIndices(totalUfos, closedIssues);

  const ufos = new Array(totalUfos).fill(0).map((_, i): UfoPosition => {
    const row = Math.floor(i / columns);
    const column = i % columns;

    return {
      x: makeXPosition({
        column,
        i,
        spaceInbetweenUfo,
        ufoContainerWidth,
        columns,
        numberOfUfos: totalUfos,
      }),
      y:
        makeYPosition({
          column,
          row,
          rowHeight,
        }) + offsetDueToManyUfos,
      scale: ufoScale,
      column,
      isClosed: closedIndices.includes(i),
    };
  });

  return {
    closedIndices,
    ufos,
    offsetDueToManyUfos,
    factor,
    columns,
    totalHeight,
  };
};

export const rocketRotation = (
  positions: ShotWithShootDelay[],
  frame: number,
) => {
  const sortedByDelay = positions.sort((a, b) => a.shootDelay - b.shootDelay);

  const angles = sortedByDelay.map((p) => {
    const angle = getAngleForShoot(p.endX, p.endY);
    return { angle, delay: p.shootDelay };
  });
  if (angles.length === 0) {
    return -Math.PI / 2;
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
    },
  );
};
