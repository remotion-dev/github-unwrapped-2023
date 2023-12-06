import { Pie } from "@remotion/shapes";
import React from "react";
import { AbsoluteFill } from "remotion";

export const PrefetchProgress: React.FC<{
  progress: number;
}> = ({ progress }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Pie
          progress={progress}
          strokeWidth={4}
          stroke="#6D708C"
          fill="transparent"
          radius={67.11}
          strokeLinecap="round"
          closePath={false}
        />
      </div>
    </AbsoluteFill>
  );
};
