import {
  getLength,
  getPointAtLength,
  getTangentAtLength,
} from "@remotion/paths";

export const moveAlongLine = (path: string, progress: number) => {
  const length = getLength(path);
  const tan = getTangentAtLength(path, length * progress + 0.0001);

  const angleInRadians = Math.atan2(tan.y, tan.x);
  const angleInDegrees = angleInRadians * (180 / Math.PI) + 90;

  const offset = getPointAtLength(path, length * progress);

  return { angleInDegrees, offset, angleInRadians };
};
