import React from "react";

import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { injectFont } from "../font";

injectFont();

export const Go: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 100,
          fontFamily: "Mona Sans",
          scale: String(scale),
          color: "white",
        }}
      >
        Go!
      </h1>
    </div>
  );
};
