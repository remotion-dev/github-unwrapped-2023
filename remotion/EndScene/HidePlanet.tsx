import React from "react";
import { AbsoluteFill } from "remotion";
import type { Planet } from "../../src/config";

export const HidePlanets: React.FC<{
  children: React.ReactNode;
  planet: Planet;
  exitProgress: number;
}> = ({ children, exitProgress }) => {
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${
          exitProgress ** 2 < 0.1 ? 0.1 : exitProgress ** 2
        })`,
        top: (1 - exitProgress) ** 4 * -1200,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
