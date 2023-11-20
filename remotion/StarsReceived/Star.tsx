import React, { useMemo } from "react";
import { interpolate, random, Sequence, useCurrentFrame } from "remotion";
import { StarSprite } from "../StarSprite";

const MOVE_AIM = 100;
const RADIUS = 1500;
const BURST_FRAME = 20;

export const Star: React.FC<{ initialFrame: number }> = ({ initialFrame }) => {
  const frame = useCurrentFrame();

  const randomValue = useMemo(() => random(null), []);
  const interpolateRandom = interpolate(
    randomValue,
    [0, 1],
    [-Math.PI / 2, Math.PI / 2]
  );
  const randomRadius = useMemo(() => random(null) * RADIUS, []);

  const x = Math.sin(interpolateRandom);
  const y = Math.cos(interpolateRandom);

  const translateY = MOVE_AIM - y * randomRadius;
  const translateX = x * randomRadius;

  const scale = interpolate(frame, [initialFrame, initialFrame + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={initialFrame}>
      {/* <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pie
          radius={RADIUS}
          progress={0.5}
          fill="white"
          rotation={-0.5 * Math.PI}
          style={{
            transform: `translateY(100px)`,
            opacity: 0.1,
          }}
        />
      </AbsoluteFill> */}

      <Sequence
        style={{
          transform: `scale(${
            scale * 0.7
          }) translateX(${translateX}px) translateY(${translateY}px) `,
        }}
      >
        <StarSprite burstFrame={BURST_FRAME} />
      </Sequence>
      {/* <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            background: "dodgerblue",
            zIndex: 100,
            transform: `translateY(${translateY}px) translateX(${translateX}px)`,
          }}
        ></div>
      </AbsoluteFill> */}
    </Sequence>
  );
};
