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
        <div
          style={{
            width: 200,
            height: 200,
            backgroundColor: "white",
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 30px rgba(0,0,0,0.3)",
            flexDirection: "column",
            color: "#353CA3",
          }}
        >
          <Pie
            progress={progress}
            strokeWidth={10}
            stroke="#353CA3"
            fill="transparent"
            radius={40}
            strokeLinecap="round"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
