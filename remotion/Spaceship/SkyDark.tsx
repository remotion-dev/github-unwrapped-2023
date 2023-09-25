import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { AfterEffectsImg } from "../helpers/AfterEffectsImg";
import { makeKeyFrames } from "../helpers/keyframes";

export const SkyDark: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <AfterEffectsImg
        height={7701}
        width={8192}
        src={staticFile("Spaceship/Sky-dark.png")}
        anchorPoint={[4096, 3850.5]}
        scale={0.142103}
        position={makeKeyFrames(frame, [
          {
            time: 0,
            value: [540, 540, 0],
            easing: "ease-out",
          },
          {
            time: 91,
            value: [460, 500, 0],
            easing: "ease-in",
          },
          {
            time: 95,
            value: [460, 500, 0],
            easing: "ease-out",
          },
          {
            time: 180,
            value: [560, 520, 0],
            easing: "ease-in",
          },
          {
            time: 186,
            value: [560, 520, 0],
            easing: "ease-out",
          },
          {
            time: 272,
            value: [540, 540, 0],
            easing: "ease-in",
          },
          {
            time: 281,
            value: [540, 540, 0],
            easing: "ease-out",
          },
          {
            time: 375,
            value: [610, 540, 0],
            easing: "easy-ease",
          },
        ])}
        rotationInDegrees={makeKeyFrames(frame, [
          {
            time: 0,
            value: 0,
            easing: "ease-out",
          },
          {
            time: 91,
            value: 20,
            easing: "ease-in",
          },
          {
            time: 95,
            value: 20,
            easing: "ease-out",
          },
          {
            time: 180,
            value: -22,
            easing: "ease-in",
          },
          {
            time: 186,
            value: -22,
            easing: "ease-out",
          },
          {
            time: 272,
            value: 0,
            easing: "ease-in",
          },
          {
            time: 281,
            value: 0,
            easing: "ease-out",
          },
          {
            time: 375,
            value: 0,
            easing: "easy-ease",
          },
        ])}
      ></AfterEffectsImg>
    </AbsoluteFill>
  );
};
