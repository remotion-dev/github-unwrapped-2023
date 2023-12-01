import React from "react";
import { AbsoluteFill } from "remotion";

export const RadialGradient: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        zIndex: -1,
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    />
  );
};
