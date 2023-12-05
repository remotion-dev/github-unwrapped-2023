import { evolvePath } from "@remotion/paths";
import React from "react";
import type { AccentColor } from "../../src/config";

const getLeftColor = (accentColor: AccentColor) => {
  if (accentColor === "blue") {
    return ["#3772A7", "#8EAFB2"] as const;
  }

  if (accentColor === "purple") {
    return ["#5e366e", "#7B6793"] as const;
  }

  throw new Error("Invalid accent color");
};

export const NewOctocatLine: React.FC<{
  progress: number;
  d: string;
  accentColor: AccentColor;
}> = ({ progress, d, accentColor }) => {
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);

  return (
    <>
      <path
        d={d}
        stroke="url(#octocatgradient)"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
      <defs>
        <linearGradient
          id="octocatgradient"
          x1="1118.7"
          y1="720.3"
          x2="1450.77"
          y2="720.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={getLeftColor(accentColor)[0]} />
          <stop offset="1" stopColor={getLeftColor(accentColor)[1]} />
        </linearGradient>
      </defs>
    </>
  );
};
