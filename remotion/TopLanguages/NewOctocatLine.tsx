import { evolvePath } from "@remotion/paths";
import React from "react";

export const NewOctocatLine: React.FC<{
  progress: number;
  d: string;
}> = ({ progress, d }) => {
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
        strokeLinecap="round"
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
          <stop stopColor="#3772A7" />
          <stop offset="1" stopColor="#8EAFB2" />
        </linearGradient>
      </defs>
    </>
  );
};
