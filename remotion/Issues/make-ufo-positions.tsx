import { UFO_HEIGHT, UFO_WIDTH } from "./Ufo";

export const CANVAS_WIDTH = 1080;
export const PADDING = 100;
export const USABLE_CANVAS_WIDTH = CANVAS_WIDTH - PADDING * 2;

type UfoPosition = {
  x: number;
  y: number;
  scale: number;
};

export const makeUfoPositions = (numberOfUfos: number): UfoPosition[] => {
  const perRow = 4;
  const ufoScale = 1 / (UFO_WIDTH / (USABLE_CANVAS_WIDTH / perRow));
  const ufoHeight = UFO_HEIGHT * ufoScale;

  const rowHeight = ufoHeight + 10;

  return new Array(numberOfUfos).fill(0).map((_, i) => {
    const width = USABLE_CANVAS_WIDTH / perRow;

    const row = Math.floor(i / perRow);
    const column = i % perRow;

    return {
      x: width * column + PADDING + width / 2,
      y: PADDING + row * rowHeight,
      scale: ufoScale,
    };
  });
};
