import type { SlideDirection } from "@remotion/transitions/slide";
import { z } from "zod";
import { type Corner } from "../../src/config";

export const clockDirectionSchema = z.enum(["clockwise", "counter-clockwise"]);
export type ClockDirection = z.infer<typeof clockDirectionSchema>;

export const enterDirectionSchema = z.enum([
  "top-clockwise",
  "left-clockwise",
  "right-counter-clockwise",
  "bottom-clockwise",
]);

export type EnterDirection = z.infer<typeof enterDirectionSchema>;

const exitDirectionSchema = z.enum(["left", "right", "top", "bottom"]);
type ExitDirection = z.infer<typeof exitDirectionSchema>;

export const deriveEnterDirectionFromCorner = (
  corner: Corner,
): EnterDirection => {
  if (corner === "top-left") {
    return "right-counter-clockwise";
  }

  if (corner === "bottom-left") {
    return "top-clockwise";
  }

  if (corner === "bottom-right") {
    return "left-clockwise";
  }

  if (corner === "top-right") {
    return "bottom-clockwise";
  }

  throw new Error("corner not implemented");
};

export const deriveStartRotationFromEnterDirection = (
  direction: EnterDirection,
): number => {
  if (direction === "top-clockwise") {
    return Math.PI;
  }

  if (direction === "left-clockwise") {
    return Math.PI / 2;
  }

  if (direction === "right-counter-clockwise") {
    return Math.PI / 2;
  }

  if (direction === "bottom-clockwise") {
    return 0;
  }

  return 0;
};

export const deriveClockDirectionFromEnterDirection = (
  direction: EnterDirection,
): ClockDirection => {
  if (direction === "top-clockwise") {
    return "clockwise";
  }

  if (direction === "left-clockwise") {
    return "clockwise";
  }

  if (direction === "right-counter-clockwise") {
    return "counter-clockwise";
  }

  if (direction === "bottom-clockwise") {
    return "clockwise";
  }

  throw new Error("direction not implemented");
};

export const mapEnterDirectionIntoSlideDirection = (
  enterDirection: EnterDirection,
): SlideDirection => {
  if (enterDirection === "top-clockwise") {
    return "from-bottom";
  }

  if (enterDirection === "left-clockwise") {
    return "from-right";
  }

  if (enterDirection === "right-counter-clockwise") {
    return "from-left";
  }

  if (enterDirection === "bottom-clockwise") {
    return "from-top";
  }

  throw new Error("direction not implemented");
};

export const mapEnterDirectionToExitDirection = (
  direction: EnterDirection,
): ExitDirection => {
  if (direction === "top-clockwise") {
    return "left";
  }

  if (direction === "left-clockwise") {
    return "bottom";
  }

  if (direction === "right-counter-clockwise") {
    return "bottom";
  }

  if (direction === "bottom-clockwise") {
    return "right";
  }

  throw new Error("direction not implemented");
};

export const mapExitDirectionIntoSlideDirection = (
  exitDirection: ExitDirection,
): SlideDirection => {
  if (exitDirection === "bottom") {
    return "from-bottom";
  }

  if (exitDirection === "top") {
    return "from-top";
  }

  if (exitDirection === "left") {
    return "from-left";
  }

  if (exitDirection === "right") {
    return "from-right";
  }

  throw new Error("direction not implemented");
};
