/* eslint-disable react/no-array-index-key */
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  interpolateColors,
  staticFile,
  useCurrentFrame,
} from "remotion";

import React, { useMemo } from "react";
import type { Planet, Rocket } from "../../src/config";
import { type AccentColor } from "../../src/config";
import { appearDelays } from "../Contributions/compute-positions";
import { Gradient } from "../Gradients/NativeGradient";
import { IssueNumber } from "../Issues/IssueNumber";
import { FPS } from "../Issues/make-ufo-positions";
import { accentColorToGradient } from "../Opening/TitleImage";
import * as FrontRocketSource from "../TopLanguages/svgs/FrontRocketSource";
import { PlanetEntrance } from "./PlanetEntrance";

export const CONTRIBUTIONS_SCENE_DURATION = 7.5 * FPS;
export const CONTRIBUTIONS_SCENE_EXIT_TRANSITION = 30;
export const CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION = 3;

export const contributionSceneAssets = (): string[] => [];

const COUNT = 364;

const ROWS = 7;
const COLUMNS = 364 / ROWS;

const SIZE = 18;

const GRID_WIDTH = COLUMNS * SIZE;
const GRID_HEIGHT = ROWS * SIZE;

// const MAX_CONTRIBUTIONS = 16;

const TRANSITION_GLOW = 45;
const START_SPREAD = TRANSITION_GLOW + 10;

const FADE_OUT_START = 80;
const FADE_OUT_DURATION = 20;

const mapRowToMove: any = {
  0: SIZE * 3,
  1: SIZE * 2,
  2: Number(SIZE),
  3: 0,
  4: SIZE * -1,
  5: SIZE * -2,
  6: SIZE * -3,
};

const Dot: React.FC<{
  i: number;
  data: number;
  targetColumn: number;
  frame: number;
  maxContributions: number;
}> = ({ i, data, targetColumn, maxContributions, frame }) => {
  const col = Math.floor(i / 7);
  const row: number = i % 7;

  let top = 0;
  let fadeOutOpacity = 1;
  let left = 0;
  let glow = 1;
  let opacity = data >= maxContributions ? 1 : data / maxContributions;
  let borderRadius = 4;
  let glowOpacity = 0;

  let size = SIZE;

  let color = `rgba(0, 166, 255, 1)`;

  opacity = opacity < 0.1 ? 0.1 : opacity;

  if (frame < TRANSITION_GLOW) {
    let f = (targetColumn - col) / (COLUMNS / 3);

    f = Math.min(...[Math.abs(f), 1]);

    top = col >= targetColumn ? mapRowToMove[row] : (1 - f) * mapRowToMove[row];
    opacity = col >= targetColumn ? 0 : opacity;
  } else if (frame < START_SPREAD) {
    borderRadius = interpolate(
      frame,
      [TRANSITION_GLOW, START_SPREAD],
      [4, SIZE / 2],
    );

    size = interpolate(
      frame,
      [TRANSITION_GLOW, START_SPREAD],
      [SIZE, SIZE * 0.95],
    );

    color = interpolateColors(
      frame,
      [TRANSITION_GLOW, START_SPREAD],
      [
        `rgba(0, 166, 255, 1)`,
        `rgba(255, 255, 255, ${opacity < 0.8 ? 0.8 : 1})`,
      ],
    );
  } else {
    size = SIZE * 0.95;
    color = `rgba(255, 255, 255, ${opacity < 0.8 ? 0.8 : 1})`;
    borderRadius = SIZE / 2;

    const noise = appearDelays[i];

    glowOpacity = interpolate(
      frame,
      [START_SPREAD, START_SPREAD + 15],
      [0, 1],
      {
        extrapolateRight: "clamp",
      },
    );

    const moveProgress = interpolate(
      frame,
      [START_SPREAD, noise.delay + 100],
      [0, 1],
      {
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.8, -0.02, 0.32, 1),
      },
    );

    const noiseAngle = Math.atan2(noise.noiseY, noise.noiseX);

    const maxGlow = interpolate(data, [0, maxContributions], [0, 6], {
      extrapolateRight: "clamp",
    });

    glow =
      interpolate(moveProgress, [0, 1], [6, maxGlow]) + (2 * moveProgress) ** 3;

    const d = interpolate(
      frame,
      [START_SPREAD + 50, START_SPREAD + 120],
      [400, 1200],
      {},
    );

    const towardsCenter = moveProgress * d;

    const pushFromCenter = Math.sin(noiseAngle + frame / 90) * towardsCenter;
    const pushFromTop = Math.cos(noiseAngle + frame / 100) * towardsCenter;

    const xDelta = noise.noiseX * 300;
    const yDelta = noise.noiseY * 10;

    left = moveProgress * xDelta + pushFromCenter;
    top = moveProgress * yDelta + pushFromTop;

    fadeOutOpacity = interpolate(
      frame,
      [START_SPREAD + 70, START_SPREAD + 80],
      [1, 0],
      {
        extrapolateRight: "clamp",
      },
    );

    // opacity =
    //   1 - interpolate(frame, [START_SPREAD + 50, START_SPREAD + 120], [1, 1]);
  }

  // if (data === 0 && frame > START_SPREAD + 5) {
  //   return null;
  // }

  return (
    <div
      style={{
        position: "absolute",
        width: SIZE,
        height: SIZE,
        left: col * SIZE,
        top: row * SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          ...(frame < TRANSITION_GLOW || frame >= START_SPREAD + 15
            ? {
                position: "absolute",
                top,
                left,
              }
            : {}),
          width: size,
          height: size,
          opacity,
          padding: 2,
          borderRadius,

          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {glow > 0 && (
          <AbsoluteFill
            style={{
              opacity: frame > START_SPREAD + 60 ? fadeOutOpacity : 1,
              transform: `scale(${glow})`,
              transformOrigin: "center",
              width: size,
              height: size,
              top: 1,
              left: 1,
            }}
          >
            <Img
              src={staticFile("blurred-dot-white.png")}
              style={{
                opacity: glowOpacity,
                width: "100%",
                height: "100%",
              }}
            />
          </AbsoluteFill>
        )}
        <div
          style={{
            opacity: 1 - glowOpacity,
            width: "100%",
            height: "100%",
            backgroundColor: color,
            borderRadius,
          }}
        />
      </div>
    </div>
  );
};

export const ContributionsScene: React.FC<{
  accentColor: AccentColor;
  contributionData: number[];
  total: number;
  rocket: Rocket;
  planet: Planet;
}> = ({ accentColor, contributionData, total, rocket, planet }) => {
  const f = useCurrentFrame();

  const frame = f / 1.5;

  const targetColumn = interpolate(frame / 0.5, [0, 120], [-33, COLUMNS + 20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, -0.02, 0.32, 1),
  });

  let number = interpolate(frame / 0.5, [25, 85], [0, total]);

  number = number > total ? total : number < 0 ? 0 : number;

  const maxContributions = useMemo(() => {
    return Math.max(...[Math.max(...contributionData), 1]);
  }, [contributionData]);

  const opacity = interpolate(frame, [120, 180], [1, 0], {
    extrapolateRight: "clamp",
  });

  const numberTop = interpolate(frame, [0, 10], [250, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity }}>
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>

      <AbsoluteFill>
        {frame > 80 && <PlanetEntrance planet={planet} frame={frame} />}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: GRID_WIDTH,
            height: GRID_HEIGHT,
          }}
        >
          {new Array(COUNT).fill(0).map((_, i) => (
            <Dot
              key={i}
              frame={frame}
              i={i}
              data={contributionData[i]}
              targetColumn={targetColumn}
              maxContributions={maxContributions}
            />
          ))}
        </div>

        <AbsoluteFill
          style={{
            marginTop: numberTop,
            opacity:
              frame >= FADE_OUT_START &&
              frame < FADE_OUT_START + FADE_OUT_DURATION
                ? (FADE_OUT_DURATION - (frame - FADE_OUT_START)) /
                  FADE_OUT_DURATION
                : frame < FADE_OUT_START
                  ? 1
                  : 0,
          }}
        >
          <IssueNumber
            align="center"
            label="Contributions"
            currentNumber={Math.floor(number)}
            max={total}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            left: targetColumn * SIZE + 120,
            top: 440,
            position: "absolute",
          }}
        >
          <Img
            src={FrontRocketSource.getFrontRocketSource(rocket)}
            style={{
              width: 732 / 8,
              height: 1574 / 8,
              transform: "rotate(90deg)",
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
