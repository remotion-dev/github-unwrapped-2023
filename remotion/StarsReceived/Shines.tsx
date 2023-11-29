import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

const WIDTH = 30;
const HEIGHT = 165;

export const shineSchema = z.object({
  rotation: z.number().step(0.1),
  showHelpers: z.boolean(),
});

export const Shine: React.FC<z.infer<typeof shineSchema>> = ({
  rotation,
  showHelpers,
}) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const innerRadius = 200;

  const progress = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const perspective = interpolate(progress, [0, 1], [800, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const offset = interpolate(progress, [0, 1], [0, 900]);

  const angle = 10;

  const x = Math.sin(rotation) * innerRadius;
  const y = Math.cos(rotation) * innerRadius;

  const rotationX = Math.cos(rotation) * angle;
  const rotationY = -Math.sin(rotation) * angle;

  return (
    <AbsoluteFill
      style={{
        perspective,
        transform: `translateX(${x}px) translateY(${y}px)`,
        opacity: interpolate(frame, [0, 5], [0, 0.2], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg) rotateZ(${-rotation}rad)`,
        }}
      >
        <Img
          style={{
            width: WIDTH,
            height: HEIGHT,
            marginTop: HEIGHT + offset,
          }}
          src={staticFile("shine.png")}
        />
      </AbsoluteFill>{" "}
      {showHelpers ? (
        <div
          style={{
            top: height / 2 - 5,
            left: width / 2 - 5,
            position: "absolute",
            backgroundColor: "green",
            height: 10,
            width: 10,
          }}
        />
      ) : null}
      {showHelpers ? (
        <div
          style={{
            top: y + height / 2 - 5,
            left: x + width / 2 - 5,
            position: "absolute",
            backgroundColor: "red",
            height: 10,
            width: 10,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export const Shines: React.FC<{
  xShake: number;
  yShake: number;
  rotationShake: number;
}> = ({ xShake, yShake, rotationShake }) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: `translateX(${xShake}px) translateY(${yShake}px)`,
      }}
    >
      {new Array(1000).fill(true).map((a, i) => {
        const angle = random(i) * Math.PI + Math.PI / 2;
        const height = 300;

        return (
          // eslint-disable-next-line react/jsx-key
          <Sequence
            from={i * 0.3}
            style={{
              transform: `translateY(${height}px)`,
            }}
            durationInFrames={10}
          >
            <Shine
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              rotation={angle + rotationShake}
              showHelpers={false}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
