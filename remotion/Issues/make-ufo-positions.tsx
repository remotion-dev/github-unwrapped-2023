import { interpolate, spring } from "remotion";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "../../types/constants";
import { Shot } from "./get-shots-to-fire";
import { ROCKET_HEIGHT } from "./Rocket";
import { sampleUniqueIndices } from "./sample-indices";
import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

export const PADDING = 150;
export const USABLE_CANVAS_WIDTH = VIDEO_WIDTH - PADDING * 2;
export const ROCKET_ORIGIN_X = VIDEO_WIDTH / 2;
const ROCKET_ORIGIN_Y = VIDEO_WIDTH - 150;
export const ROCKET_TOP_Y = ROCKET_ORIGIN_Y - ROCKET_HEIGHT / 2;
export const TIME_BEFORE_SHOOTING = 60;
export const SHOOT_DURATION = 14;

export const getFramesAfterWhichShootProgressIsReached = (
  progressToReach: number
) => {
  return Math.ceil(progressToReach * SHOOT_DURATION);
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

export const rocketRotation = (positions: Shot[], frame: number) => {
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
