import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const items = 18;
const radius = 200;

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

  const rotation = (interpolate(progress, [0, 1], [0.2, 0]) % Math.PI) * 2;

  return (
    <AbsoluteFill
      style={{
        perspective: 5000,
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
                display: "flex",
                flexDirection: "row",
                width: 600,
                marginLeft: 100,
              }}
            >
              <div
                style={{
                  lineHeight: 1,
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
                  ][i % 6]
                }
              </div>
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
