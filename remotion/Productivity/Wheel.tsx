import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FPS } from "../Issues/make-ufo-positions";

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
      mass: 10,
      damping: 200,
      stiffness: 200,
    },
    durationInFrames: 100,
    delay,
    durationRestThreshold: 0.0001,
  });
};

const WHEEL_INIT_SPEED =
  wheelSpring({ fps: FPS, frame: 10, delay: 0 }) -
  wheelSpring({ fps: FPS, frame: 0, delay: 0 });

export const Wheel: React.FC<{
  value: string;
  values: string[];
  radius: number;
  renderLabel: (value: string) => React.ReactNode;
  delay: number;
  soundDelay: number;
}> = ({ value, values, radius, renderLabel, delay, soundDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
      <Sequence from={soundDelay}>
        <Audio src={staticFile("stop.mp3")} volume={0.3} />
      </Sequence>
      {values.map((f, i) => {
        const index = i / values.length + rotation;

        const thisIndex = (i + Number(value)) % values.length;
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
                Number(value) === thisIndex && frame - 5 > delay
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
                width: 410,
                paddingRight: 50,
              }}
            >
              {renderLabel(values[thisIndex])}
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
