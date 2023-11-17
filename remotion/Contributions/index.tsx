import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
} from "remotion";

import { noise2D } from "@remotion/noise";
import React from "react";
import { FPS } from "../Issues/make-ufo-positions";
import { JumpingNumber } from "../JumpingNumber/JumpingNumber";
import { Background } from "./Background";
import { Sparkle } from "./Sparkle";

const SIZE = 15;

const TIMELINE_OFFSET_Y = 420;

const OFFSET_X = 70;
const OFFSET_Y = 0;
const SPACING = 3;

const START_SPREAD = 120;
const END_SPREAD = 135;
const SPREAD_DURATION = END_SPREAD - START_SPREAD;

const MAX_STAR_SIZE = 6;
const MIN_STAR_SIZE = 1;

const MAX_STAR_GLOW = 23;

const MIN_OPACITY = 1;

const data = new Array(364)
  .fill(0)
  .map((_, i) => [
    i,
    Math.random() < 0.25 ? 0 : Math.floor(Math.random() * 128),
  ]);

const sampleData: Record<number, number> = Object.fromEntries(data);

const max = Math.max(...data.map((d) => d[1]));
const maxIndex = data.findIndex((d) => d[1] === max);

const computePositions = (params: {
  frame: number;
  data: Record<number, number>;
}) => {
  const positions = new Array(364).fill(0).map((_, i) => {
    const col = Math.floor(i / 7);
    const row: number = i % 7;

    let x = col * (SPACING + SIZE) + OFFSET_X;
    let y = row * (SPACING + SIZE) + OFFSET_Y;
    let width = SIZE;
    let height = SIZE;
    let opacity = MIN_OPACITY;
    let color = "#202138";

    const noise = noise2D(`${i}`, x * 10, y * 10);

    const noiseX = noise2D(`${i}x`, x * 10, y * 10);
    const noiseY = noise2D(`${i}y`, x * 10, y * 10);

    const appearFrame = 30 + noise * 30;
    const appear = params.frame > appearFrame;

    const moveFrame = START_SPREAD + noise * SPREAD_DURATION;
    const move = params.frame > moveFrame;

    let maxOpacity = interpolate(
      params.data[i],
      [0, 128],
      [0.2, i === maxIndex ? 1 : 0.9],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    if (appear) {
      color =
        params.data[i] > 0
          ? interpolateColors(
              params.data[i],
              [0, 128],
              ["#0c2945", params.frame < moveFrame ? "#2486ff" : "#a3d3ff"]
            )
          : color;
    }

    if (move) {
      const scale = interpolate(
        params.frame,
        [appearFrame, appearFrame + 30],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );

      opacity = scale * maxOpacity;
    }

    if (move) {
      const xDelta = noiseX * 200;
      const yDelta = noiseY * 800 + 50;

      const x_v = interpolate(
        params.frame,
        [moveFrame, moveFrame + SPREAD_DURATION],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );

      const y_v = interpolate(
        params.frame,
        [moveFrame, moveFrame + SPREAD_DURATION],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );

      x += xDelta * x_v;
      y += yDelta * y_v;
    }

    if (move) {
      const size = interpolate(
        params.data[i],
        [0, 128],
        [MIN_STAR_SIZE, MAX_STAR_SIZE]
      );

      const scale = interpolate(
        params.frame,
        [moveFrame, moveFrame + SPREAD_DURATION],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );

      width = size + width * (1 - scale);
      height = size + height * (1 - scale);
    }

    let glow = 0;

    if (move && params.data[i] > 0) {
      glow = interpolate(params.data[i], [0, 128], [0, MAX_STAR_GLOW]);
    }

    console.log(opacity);
    return {
      col,
      row,
      x,
      y,
      opacity,
      color,
      borderRadius: move ? "50%" : undefined,
      width,
      height,
      glow,
    };
  });

  return positions;
};

export const ContributionsScene: React.FC = () => {
  // const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const positions = computePositions({ frame, data: sampleData });

  const target = positions[maxIndex];

  const entrance = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
  });

  const entranceYOffset = interpolate(
    entrance,
    [0, 1],
    [-120, TIMELINE_OFFSET_Y],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,

        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
      <AbsoluteFill>
        <Background></Background>
      </AbsoluteFill>
      <h1
        style={{
          fontSize: 100,
          fontFamily: "Mona Sans",
          color: "white",
          opacity: 1 - entranceYOffset / TIMELINE_OFFSET_Y,
        }}
      >
        Contributions
      </h1>

      <div
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          top: entranceYOffset,
        }}
      >
        {positions.map((p, i) => (
          <div
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: p.height + p.glow,
              width: p.width + p.glow,
              opacity: p.opacity,
              borderRadius: "50%",
              background:
                p.glow > 0
                  ? "radial-gradient(circle at center, #e0ff5e 0, #3b6dd1 30%, #0086d4 50%, #021d57 65%, #01194a 100%)"
                  : undefined,
            }}
          >
            <div
              key={i}
              style={{
                height: p.height,
                width: p.width,

                borderRadius: p.borderRadius,
                background: p.color,
              }}
            ></div>
          </div>
        ))}
      </div>
      <Sparkle
        x={target.x}
        y={target.y + TIMELINE_OFFSET_Y}
        scale={1}
        currentFrame={frame}
        startFrame={160}
      />
      <AbsoluteFill
        style={{
          fontSize: 100,
          color: "white",
          fontFamily: "Mona Sans",
          fontWeight: "800",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 40,
        }}
      >
        <JumpingNumber duration={60} from={0} to={13239}></JumpingNumber>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
