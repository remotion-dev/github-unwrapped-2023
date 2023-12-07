import React from "react";
import { AbsoluteFill } from "remotion";

export const CockpitRightScreen: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
