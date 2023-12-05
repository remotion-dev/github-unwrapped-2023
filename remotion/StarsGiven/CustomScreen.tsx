import React from "react";
import { AbsoluteFill } from "remotion";
import type { AccentColor } from "../../src/config";
import { PullRequests } from "../Paths/PullRequests";

export const CustomScreen: React.FC<{
  accentColor: AccentColor;
  totalPullRequests: number;
}> = ({ accentColor, totalPullRequests }) => {
  return (
    <AbsoluteFill
      style={{
        marginLeft: 881,
        marginTop: 853,
        transform: "scale(1.51)",
        opacity: 1,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `matrix3d(0.054203, 0.018674, 0, -0.000075, 
            -0.029199, 0.08233, 0, 0.000013, 
            0, 0, 1, 0, 
            139, 125, 0, 1)`,
          transformOrigin: "0 0 0",
          width: 1080,
          height: 1080,
        }}
      >
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 400,
            color: "white",
            height: 1080,
            width: 1080,
            overflow: "hidden",
          }}
        >
          <PullRequests
            accentColor={accentColor}
            totalPullRequests={totalPullRequests}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
