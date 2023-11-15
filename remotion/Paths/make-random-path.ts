import { noise2D } from "@remotion/noise";
import { interpolate, random } from "remotion";

const width = 1080;

function bellCurve(x: number): number {
  // Constants for a standard bell curve
  const mean = 0.5;
  const variance = 0.04;

  // Gaussian function
  return (
    (1 / Math.sqrt(2 * Math.PI * variance)) *
    Math.exp(-Math.pow(x - mean, 2) / (2 * variance))
  );
}

export const makeRandomPath = (seed: string | number) => {
  const end = {
    x: width / 2,
    y: 267.4,
  };

  const start = {
    x: width / 2,
    y: 4274,
  };

  const numberOfItems = 70;

  const points = new Array(numberOfItems).fill(1).map((a, i) => {
    const progress = interpolate(i, [0, numberOfItems - 1], [0, 1]);

    const noiseRatio =
      new Array(i)
        .fill(true)
        .map((_, i) => i - 10)
        .map((b) => {
          return bellCurve(b / (numberOfItems - 10));
        })
        .reduce((a, b) => {
          return a + b;
        }, 0) /
      (numberOfItems - 10);

    const x = (noise2D(seed, noiseRatio, 0) * width) / 2;

    const normalY = interpolate(
      progress,
      [0, 1],
      [start.y, end.y - random(seed) * 200 - 50]
    );

    const st = {
      y: normalY,
      x:
        interpolate(progress, [0, 1], [start.x, end.x], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }) + x,
    };

    return st;
  });

  const lastPoint = points[points.length - 1];
  const signedDistanceToMiddle = lastPoint.x - width / 2;
  const distanceToMiddle = Math.abs(signedDistanceToMiddle);
  const morePointsToAdd = Math.round(distanceToMiddle / 5);
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

  const p = [...points, ...drawArcToMiddle, end]
    .map((p) => {
      if (p === points[0]) {
        return `M${p.x} ${p.y}`;
      }

      return `L${p.x} ${p.y}`;
    })
    .join(" ");

  return p;
};
