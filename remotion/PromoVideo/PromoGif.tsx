import React from "react";
import { AbsoluteFill } from "remotion";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { PromoVideoTitle } from "./Title";

export const PromoGif: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Gradient gradient="blueRadial" />
        <AbsoluteFill style={{ opacity: 0.3 }}>
          <Noise translateX={0} translateY={0} />
        </AbsoluteFill>
      </AbsoluteFill>
      <PromoVideoTitle layout="landscape" />
    </AbsoluteFill>
  );
};
