import { z } from "zod";

export const cornerType = z.enum([
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
]);
export type Corner = z.infer<typeof cornerType>;

export const clockDirectionSchema = z.enum(["clockwise", "counter-clockwise"]);
export type ClockDirection = z.infer<typeof clockDirectionSchema>;

export const enterDirection = z.enum([
  "top-clockwise",
  "top-counter-clockwise",
  "bottom-clockwise",
  "bottom-counter-clockwise",
]);
export type EnterDirection = z.infer<typeof enterDirection>;

export const exitDirection = z.enum(["left", "right", "top", "bottom"]);

export const deriveEnterDirectionFromCorner = (
  corner: Corner,
): EnterDirection => {
  if (corner === "top-left") {
    return "top-counter-clockwise";
  }

  if (corner === "bottom-left") {
    return "top-clockwise";
  }

  if (corner === "bottom-right") {
    return "top-counter-clockwise";
  }

  if (corner === "top-right") {
    return "top-clockwise";
  }

  throw new Error("corner not implemented");
};

export const deriveStartRotationFromEnterDirection = (
  direction: EnterDirection,
): number => {
  if (direction === "top-clockwise") {
    return Math.PI;
  }

  if (direction === "top-counter-clockwise") {
    return Math.PI;
  }

  return 0;
};

export const deriveClockDirectionFromEnterDirection = (
  direction: EnterDirection,
): ClockDirection => {
  if (direction === "top-clockwise") {
    return "clockwise";
  }

  if (direction === "top-counter-clockwise") {
    return "counter-clockwise";
  }

  if (direction === "bottom-clockwise") {
    return "clockwise";
  }

  if (direction === "bottom-counter-clockwise") {
    return "counter-clockwise";
  }

  throw new Error("direction not implemented");
};
