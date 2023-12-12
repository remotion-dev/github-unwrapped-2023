/* eslint-disable react/no-array-index-key */
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
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

export const CONTRIBUTIONS_SCENE_DURATION = 5 * FPS;
export const CONTRIBUTIONS_SCENE_EXIT_TRANSITION = 20;
export const CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION = 3;

export const contributionSceneAssets = (): string[] => [];

const COUNT = 364;

const ROWS = 7;
const COLUMNS = 364 / ROWS;

const SIZE = 18;

const GRID_WIDTH = COLUMNS * SIZE;
const GRID_HEIGHT = ROWS * SIZE;

const MAX_CONTRIBUTIONS = 16;

const START_SPREAD = 45;

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
  maxContributions: number;
}> = ({ i, data, targetColumn, maxContributions }) => {
  const col = i % COLUMNS;
  const row = Math.floor(i / COLUMNS);

  const frame = useCurrentFrame();

  let top = 0;
  let left = 0;
  let glow = 1;
  let opacity = data >= maxContributions ? 1 : data / maxContributions;

  opacity = opacity < 0.1 ? 0.1 : opacity;

  if (frame < START_SPREAD) {
    let f = (targetColumn - col) / (COLUMNS / 3);

    f = f < 0 ? 0 : f > 1 ? 1 : f;

    top = col >= targetColumn ? mapRowToMove[row] : (1 - f) * mapRowToMove[row];
    opacity = col >= targetColumn ? 0 : opacity;
  } else {
    const noise = appearDelays[i];

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

    const maxGlow = interpolate(data, [0, maxContributions], [0, 5], {
      extrapolateRight: "clamp",
    });

    glow = interpolate(moveProgress, [0, 1], [2, maxGlow]);

    const d = interpolate(
      frame,
      [START_SPREAD + 50, START_SPREAD + 120],
      [400, 1500],
    );

    const towardsCenter = moveProgress * d;

    const pushFromCenter = Math.sin(noiseAngle + frame / 90) * towardsCenter;
    const pushFromTop = Math.cos(noiseAngle + frame / 100) * towardsCenter;

    const xDelta = noise.noiseX * 300;
    const yDelta = noise.noiseY * 10;

    left = moveProgress * xDelta + pushFromCenter;
    top = moveProgress * yDelta + pushFromTop;

    // opacity =
    //   1 - interpolate(frame, [START_SPREAD + 50, START_SPREAD + 120], [1, 1]);
  }

  if (data === 0 && frame > START_SPREAD + 5) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        width: SIZE,
        height: SIZE,
        left: col * SIZE,
        top: row * SIZE,
      }}
    >
      <div
        style={{
          top,
          position: "absolute",
          left,
          width: "100%",
          height: "100%",
          transform: `scale(${glow})`,
          opacity,
          padding: 2,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {glow > 1 ? (
          <AbsoluteFill>
            <Img src={staticFile("blurred-dot-white.png")} />
          </AbsoluteFill>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: `rgba(0, 166, 255, 1)`,
              borderRadius: "50%",
            }}
          />
        )}
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
  const frame = useCurrentFrame();

  const targetColumn = interpolate(frame / 0.5, [0, 120], [-33, COLUMNS + 20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, -0.02, 0.32, 1),
  });

  let number = interpolate(frame / 0.5, [25, 85], [0, total]);

  number = number > total ? total : number < 0 ? 0 : number;

  const maxContributions = useMemo(() => {
    const m = Math.max(...contributionData);
    return m < MAX_CONTRIBUTIONS ? m : MAX_CONTRIBUTIONS;
  }, [contributionData]);

  const opacity = interpolate(frame, [120, 180], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity }}>
        <Gradient gradient={accentColorToGradient(accentColor)} />
      </AbsoluteFill>

      <AbsoluteFill>
        {frame > 80 && <PlanetEntrance planet={planet} />}
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
              i={i}
              data={contributionData[i]}
              targetColumn={targetColumn}
              maxContributions={maxContributions}
            />
          ))}
        </div>

        <AbsoluteFill
          style={{
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
            align="right"
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
