import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

import React from "react";

const SIZE = 12;

export const CommitHistory: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          top: 256,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {new Array(52).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 ${SIZE}px`,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {new Array(7).fill(0).map((_, i2) => (
                <div
                  key={i2}
                  style={{
                    flex: `0 0 ${SIZE}px`,
                    height: SIZE,
                    borderRadius: 2,
                    background: "#212121",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
