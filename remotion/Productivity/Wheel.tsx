import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { days, type Weekday } from "../../src/config";
import { FPS } from "../Issues/make-ufo-positions";

const items = 7;
const radius = 90;

const wheelSpring = ({
  fps,
  frame,
  delay,
}: {
  fps: number;
  frame: number;
  delay: number;
}) => {
  return spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 30,
    delay,
  });
};

const WHEEL_INIT_SPEED =
  wheelSpring({ fps: FPS, frame: 10, delay: 0 }) -
  wheelSpring({ fps: FPS, frame: 0, delay: 0 });

const weekdayToName = (weekday: Weekday, values: string[]) => {
  return values[weekday];
};

export const Wheel: React.FC<{
  day: Weekday;
  values: string[];
}> = ({ day, values }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 30;
  const progress =
    wheelSpring({ fps, frame, delay }) +
    interpolate(frame, [delay - 1, delay], [-WHEEL_INIT_SPEED / 10, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "extend",
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

        const thisIndex = (i + Number(day)) % values.length;
        const zPosition = Math.cos(index * -Math.PI * 2) * radius;
        const y = Math.sin(index * Math.PI * 2) * radius;
        const r = interpolate(index, [0, 1], [0, Math.PI * 2]);

        return (
          <AbsoluteFill
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              justifyContent: "center",
              fontSize: 65,
              transform: `translateZ(${zPosition}px) translateY(${y}px) rotateX(${r}deg)`,
              backfaceVisibility: "hidden",
              perspective: 1000,
              color:
                Number(day) === thisIndex && frame - 5 > delay
                  ? "white"
                  : "rgba(255, 255, 255, 0.3)",
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
                width: 400,
                paddingRight: 40,
              }}
            >
              {weekdayToName(days[thisIndex], values)}
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
