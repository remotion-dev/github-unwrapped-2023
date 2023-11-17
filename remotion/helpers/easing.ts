import { Easing } from "remotion";

export type EasingType = "ease-in" | "ease-out" | "linear" | "easy-ease";

export const getEasingFunction = ({
  nextEasing,
  previousEasing,
}: {
  nextEasing: EasingType;
  previousEasing: EasingType;
}): ((t: number) => number) => {
  if (nextEasing === "easy-ease" && previousEasing === "ease-out") {
    return Easing.inOut(Easing.ease);
  }

  if (nextEasing === "easy-ease" && previousEasing === "ease-in") {
    return Easing.inOut(Easing.ease);
  }

  if (nextEasing === "ease-in" && previousEasing === "ease-out") {
    return Easing.inOut(Easing.ease);
  }

  if (nextEasing === "ease-in") {
    return Easing.in(Easing.ease);
  }

  if (nextEasing === "ease-out") {
    return Easing.out(Easing.ease);
  }

  return Easing.linear;
};
