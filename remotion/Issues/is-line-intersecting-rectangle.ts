type Point = {
  x: number;
  y: number;
};

function getLineIntersection({
  aStartX,
  aStartY,
  aEndX,
  aEndY,
  bStartX,
  bStartY,
  bEndX,
  bEndY,
}: {
  aStartX: number;
  aStartY: number;
  aEndX: number;
  aEndY: number;
  bStartX: number;
  bStartY: number;
  bEndX: number;
  bEndY: number;
}): Point | null {
  const det =
    (aEndX - aStartX) * (bEndY - bStartY) -
    (bEndX - bStartX) * (aEndY - aStartY);
  if (det === 0) {
    return null; // Lines are parallel
  }

  const lambda =
    ((bEndY - bStartY) * (bEndX - aStartX) +
      (bStartX - bEndX) * (bEndY - aStartY)) /
    det;
  const gamma =
    ((aStartY - aEndY) * (bEndX - aStartX) +
      (aEndX - aStartX) * (bEndY - aStartY)) /
    det;

  if (lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1) {
    return {
      x: aStartX + lambda * (aEndX - aStartX),
      y: aStartY + lambda * (aEndY - aStartY),
    };
  }

  return null;
}

export function findLineRectangleIntersection({
  startX,
  startY,
  endX,
  endY,
  centerX,
  centerY,
  width,
  height,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}): Point | null {
  // Convert center-based rectangle coordinates to top-left and bottom-right
  const topLeft: Point = { x: centerX - width / 2, y: centerY - height / 2 };
  const bottomRight: Point = {
    x: centerX + width / 2,
    y: centerY + height / 2,
  };

  // Check each side of the rectangle for intersection
  let intersection = getLineIntersection({
    aStartX: startX,
    aStartY: startY,
    aEndX: endX,
    aEndY: endY,
    bStartX: topLeft.x,
    bStartY: topLeft.y,
    bEndX: bottomRight.x,
    bEndY: topLeft.y,
  }); // Top side
  if (intersection) return intersection;

  intersection = getLineIntersection({
    aStartX: startX,
    aStartY: startY,
    aEndX: endX,
    aEndY: endY,
    bStartX: bottomRight.x,
    bStartY: topLeft.y,
    bEndX: bottomRight.x,
    bEndY: bottomRight.y,
  }); // Right side
  if (intersection) return intersection;

  intersection = getLineIntersection({
    aStartX: startX,
    aStartY: startY,
    aEndX: endX,
    aEndY: endY,
    bStartX: bottomRight.x,
    bStartY: bottomRight.y,
    bEndX: topLeft.x,
    bEndY: bottomRight.y,
  }); // Bottom side
  if (intersection) return intersection;

  intersection = getLineIntersection({
    aStartX: startX,
    aStartY: startY,
    aEndX: endX,
    aEndY: endY,
    bStartX: topLeft.x,
    bStartY: bottomRight.y,
    bEndX: topLeft.x,
    bEndY: topLeft.y,
  }); // Left side
  if (intersection) return intersection;

  return null;
}
