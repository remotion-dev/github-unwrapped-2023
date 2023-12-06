import React from "react";
import { AbsoluteFill } from "remotion";

export const HeadsUpDisplay: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 500,
          height: 100,
          marginTop: -500,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "Seven Segment",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        remotion-dev/remotion
      </div>
    </AbsoluteFill>
  );
};
