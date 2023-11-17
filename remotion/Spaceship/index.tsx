import React from "react";
import { AbsoluteFill } from "remotion";
import { SkyBg } from "./SkyBg";
import { SkyDark } from "./SkyDark";

export const Spaceship: React.FC = () => {
  return (
    <AbsoluteFill>
      <SkyBg />
      <SkyDark />
    </AbsoluteFill>
  );
};
