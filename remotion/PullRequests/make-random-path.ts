import { noise2D } from "@remotion/noise";
import { Easing, Internals, interpolate, random } from "remotion";
import { PATHS_COMP_HEIGHT } from "./Path";

const width = 1080;

function bellCurve(x: number): number {
  // Constants for a standard bell curve
  const mean = 0.5;
  const variance = 0.04;

  // Gaussian function
  return (
    (1 / Math.sqrt(2 * Math.PI * variance)) *
    Math.exp(-((x - mean) ** 2) / (2 * variance))
  );
}

const PATH_START = {
  x: width / 2,
  y: PATHS_COMP_HEIGHT + 100,
};

export const PATH_TARGET = {
  x: width / 2,
  y: 567.4,
};

const getX = (seed: string | number, noiseRatio: number) => {
  return (noise2D(seed, noiseRatio, random(seed) * noiseRatio) * width) / 2;
};

const getNoiseRatio = ({
  i,
  itemsToOffset,
  numberOfItems,
}: {
  i: number;
  itemsToOffset: number;
  numberOfItems: number;
}) => {
  return (
    new Array(i)
      .fill(true)
      .map((_, index) => index - itemsToOffset)
      .map((b) => {
        return bellCurve(b / (numberOfItems - itemsToOffset));
      })
      .reduce((a, b) => {
        return a + b;
      }, 0) /
    (numberOfItems - itemsToOffset)
  );
};

const shouldBendInwards = ({
  seed,
  itemsToOffset,
  numberOfItems,
}: {
  seed: number | string;
  itemsToOffset: number;
  numberOfItems: number;
}) => {
  const i = Math.round(numberOfItems * 0.9);
  const noiseRatio = getNoiseRatio({ i, itemsToOffset, numberOfItems });
  const x = getX(seed, noiseRatio);

  return Math.abs(x) < 150;
};

export const makeRandomPath = (seed: string | number, shouldCut: boolean) => {
  const numberOfItems = 140;
  const itemsToOffset = Math.round(numberOfItems / 7);

  const bendInwards = shouldBendInwards({ itemsToOffset, numberOfItems, seed });

  const points = new Array(numberOfItems).fill(1).map((a, i) => {
    const progress = interpolate(i, [0, numberOfItems - 1], [0, 1]);

    const noiseRatio = getNoiseRatio({ i, itemsToOffset, numberOfItems });

    const x = getX(seed, noiseRatio);

    const extraCurve = bendInwards ? 0 : random(seed) * 200 + 50;

    const bentInwardsX = bendInwards
      ? interpolate(progress, [0.8, 1], [x, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.ease),
        })
      : x;

    const normalY = interpolate(
      progress,
      [0, 1],
      [PATH_START.y, PATH_TARGET.y - extraCurve],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );

    const st = {
      y: normalY,
      x:
        interpolate(progress, [0, 1], [PATH_START.x, PATH_TARGET.x], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) + bentInwardsX,
    };

    return st;
  });

  const lastPoint = points[points.length - 1];
  const signedDistanceToMiddle = lastPoint.x - width / 2;
  const distanceToMiddle = Math.abs(signedDistanceToMiddle);
  const morePointsToAdd = Math.floor(distanceToMiddle / 10);
  const drawArcToMiddle = new Array(morePointsToAdd).fill(true).map((_, i) => {
    const angle = (i / morePointsToAdd) * Math.PI;
    const y = lastPoint.y - (Math.sin(angle) * distanceToMiddle) / 2;
    const x =
      lastPoint.x +
      ((Math.cos(angle) * distanceToMiddle) / 2) *
        Math.sign(signedDistanceToMiddle) +
      (distanceToMiddle / 2) * -Math.sign(signedDistanceToMiddle);

    return { x, y };
  });

  const slicedPoints = shouldCut ? points.slice(115) : points;
  const p = [...slicedPoints, ...drawArcToMiddle, PATH_TARGET]
    .filter(Internals.truthy)
    .map((point) => {
      if (point === slicedPoints[0]) {
        return `M${point.x} ${point.y}`;
      }

      return `L${point.x} ${point.y}`;
    })
    .join(" ");

  return p;
};
