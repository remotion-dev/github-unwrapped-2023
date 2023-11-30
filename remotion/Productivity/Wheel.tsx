import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const items = 7;
const radius = 80;

export const Wheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 30,
  });

  const rotation = interpolate(progress, [0, 1], [1, 0]) % Math.PI;

  return (
    <AbsoluteFill
      style={{
        perspective: 10000,
      }}
    >
      {new Array(items).fill(true).map((f, i) => {
        const index = i / items + rotation;

        const z = Math.cos(index * -Math.PI * 2) * radius;
        const y = Math.sin(index * Math.PI * 2) * radius;
        const r = interpolate(index, [0, 1], [0, Math.PI * 2]);

        return (
          <AbsoluteFill
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              justifyContent: "center",
              fontSize: 50,
              transform: `translateZ(${z}px) translateY(${y}px) rotateX(${r}deg)`,
              backfaceVisibility: "hidden",
              perspective: 1000,
              color: "white",
              fontFamily: "Mona Sans",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                transform: `rotateX(-${r}rad)`,
                backfaceVisibility: "hidden",
                textAlign: "right",
                lineHeight: 1,
                width: 250,
              }}
            >
              {
                [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ][i % 7]
              }
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
