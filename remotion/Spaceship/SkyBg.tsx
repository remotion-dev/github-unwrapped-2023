import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { AfterEffectsImg } from "../helpers/AfterEffectsLayer";
import { makeKeyFrames } from "../helpers/keyframes";

export const SkyBg: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AfterEffectsImg
      height={6908}
      width={8192}
      scale={0.162}
      rotationInDegrees={makeKeyFrames(frame, [
        { time: 0, value: 0, easing: "ease-out" },
        {
          time: 91,
          value: 10,
          easing: "ease-in",
        },
        {
          time: 95,
          value: 10,
          easing: "ease-out",
        },
        {
          time: 180,
          value: -10,
          easing: "ease-in",
        },
        {
          time: 186,
          value: -10,
          easing: "ease-out",
        },
        {
          easing: "ease-in",
          time: 273,
          value: 0,
        },
        {
          easing: "ease-out",
          time: 281,
          value: 0,
        },
        {
          easing: "easy-ease",
          time: 375,
          value: 0,
        },
      ])}
      position={makeKeyFrames(frame, [
        { time: 0, value: [456, 524], easing: "ease-out" },
        {
          time: 91,
          value: [416, 484],
          easing: "ease-in",
        },
        {
          time: 95,
          value: [416, 484],
          easing: "ease-out",
        },
        {
          time: 180,
          value: [596, 504],
          easing: "ease-in",
        },
        {
          time: 186,
          value: [596, 504],
          easing: "ease-out",
        },
        {
          easing: "ease-in",
          time: 273,
          value: [456, 524],
        },
        {
          easing: "ease-out",
          time: 281,
          value: [456, 524],
        },
        {
          easing: "easy-ease",
          time: 375,
          value: [512, 524],
        },
      ])}
    >
      <Img src={staticFile("Spaceship/Sky-BG.png")} />
    </AfterEffectsImg>
  );
};
