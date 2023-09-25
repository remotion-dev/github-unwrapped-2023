import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { AfterEffectsImg } from "../helpers/AfterEffectsImg";
import { makeKeyFrames } from "../helpers/keyframes";

export const SkyDark: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <AfterEffectsImg
        height={8192}
        width={7701}
        src={staticFile("Sky-dark.png")}
        anchorPoint={[4096, 3850.5]}
        scale={0.142103}
        position={makeKeyFrames(frame, [
          {
            time: 0,
            value: [540, 540],
            easing: "ease-out",
          },
          {
            time: 91,
            easing: "ease-in",
            value: [460, 500],
          },
          {
            time: 95,
            easing: "ease-out",
            value: [460, 500],
          },
          {
            time: 180,
            easing: "ease-in",
            value: [650, 520],
          },
          {
            time: 186,
            easing: "ease-out",
            value: [650, 520],
          },
          {
            time: 272,
            easing: "ease-in",
            value: [540, 540],
          },
          {
            time: 281,
            easing: "ease-out",
            value: [540, 540],
          },
        ])}
      ></AfterEffectsImg>
    </AbsoluteFill>
  );
};
