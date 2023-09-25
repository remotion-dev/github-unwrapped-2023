import { interpolate } from "remotion";
import { EasingType, getEasingFunction } from "./easing";

type KeyframeType = number | [number, number] | [number, number, number];

export type Keyframe<T extends KeyframeType> = {
  time: number;
  easing: EasingType;
  value: T;
};

export function makeKeyFrames<T extends KeyframeType>(
  time: number,
  keyframes: Keyframe<T>[]
): T {
  if (typeof keyframes[0].value !== "number") {
    return new Array(keyframes[0].value.length).fill(0).map((_, i) => {
      return makeKeyFrames(
        time,
        keyframes.map((k) => ({
          ...k,
          value: (k.value as number[])[i] as number,
        }))
      ) as number;
    }) as T;
  }

  const next =
    keyframes.find((keyframe) => keyframe.time >= time) ??
    keyframes[keyframes.length - 1];
  const previous =
    keyframes.reverse().find((keyframe) => keyframe.time <= time) ??
    keyframes[0];

  if (previous.time === next.time) {
    return previous.value as T;
  }

  return interpolate(
    time,
    [previous.time, next.time],
    [previous.value as number, next.value as number],
    {
      easing: getEasingFunction({
        nextEasing: next.easing,
        previousEasing: previous.easing,
      }),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  ) as T;
}
