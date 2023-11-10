type Point = {
  x: number;
  y: number;
};

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
  let intersection = getLineIntersection(
    startX,
    startY,
    endX,
    endY,
    topLeft.x,
    topLeft.y,
    bottomRight.x,
    topLeft.y
  ); // Top side
  if (intersection) return intersection;

  intersection = getLineIntersection(
    startX,
    startY,
    endX,
    endY,
    bottomRight.x,
    topLeft.y,
    bottomRight.x,
    bottomRight.y
  ); // Right side
  if (intersection) return intersection;

  intersection = getLineIntersection(
    startX,
    startY,
    endX,
    endY,
    bottomRight.x,
    bottomRight.y,
    topLeft.x,
    bottomRight.y
  ); // Bottom side
  if (intersection) return intersection;

  intersection = getLineIntersection(
    startX,
    startY,
    endX,
    endY,
    topLeft.x,
    bottomRight.y,
    topLeft.x,
    topLeft.y
  ); // Left side
  if (intersection) return intersection;

  return null;
}

function getLineIntersection(
  aStartX: number,
  aStartY: number,
  aEndX: number,
  aEndY: number,
  bStartX: number,
  bStartY: number,
  bEndX: number,
  bEndY: number
): Point | null {
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

  if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
    return {
      x: aStartX + lambda * (aEndX - aStartX),
      y: aStartY + lambda * (aEndY - aStartY),
    };
  }

  return null;
}
