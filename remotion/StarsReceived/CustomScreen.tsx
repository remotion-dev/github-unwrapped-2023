import React from "react";
import { AbsoluteFill } from "remotion";

export const CustomScreen: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        marginLeft: 876,
        marginTop: 850,
        transform: "scale(1.5)",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `matrix3d(0.054203, 0.018674, 0, -0.000075, 
            -0.029199, 0.08233, 0, 0.000013, 
            0, 0, 1, 0, 
            139, 125, 0, 1)`,
          transformOrigin: "0 0 0",
          backgroundColor: "green",
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
          }}
        >
          123
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
