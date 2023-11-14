import React from "react";
import { AbsoluteFill } from "remotion";
import { Path1 } from "./Path1";
import { Path2 } from "./Path2";
import { Path3 } from "./Path3";
import { Path4 } from "./Path4";
import { Path5 } from "./Path5";

export const WholePaths: React.FC = () => {
  return (
    <AbsoluteFill>
      <Path1></Path1>
      <Path2></Path2>
      <Path3></Path3>
      <Path4></Path4>
      <Path5></Path5>
    </AbsoluteFill>
  );
};
