import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
} from "remotion";

import React from "react";
import { Planet, Rocket, type AccentColor } from "../../src/config";
import { appearDelays } from "../Contributions/compute-positions";
import { Gradient } from "../Gradients/NativeGradient";
import { IssueNumber } from "../Issues/IssueNumber";
import { accentColorToGradient } from "../Opening/TitleImage";
import { getFrontRocketSource } from "../TopLanguages/svgs/FrontRocketSource";
import { PlanetEntrance } from "./PlanetEntrance";

const COUNT = 364;

const ROWS = 7;
const COLUMNS = 364 / ROWS;

const SIZE = 18;

const GRID_WIDTH = COLUMNS * SIZE;
const GRID_HEIGHT = ROWS * SIZE;

const START_SPREAD = 45;

const FADE_OUT_START = 80;
const FADE_OUT_DURATION = 20;

const mapRowToMove: any = {
  0: SIZE * 3,
  1: SIZE * 2,
  2: SIZE * 1,
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
  let opacity = data / 100;

  opacity = opacity < 0.1 ? 0.1 : opacity;

  if (frame < START_SPREAD) {
    let f = (targetColumn - col) / (COLUMNS / 3);

    f = f < 0 ? 0 : f > 1 ? 1 : f;
    f = Math.pow(f, 1);

    top = col >= targetColumn ? mapRowToMove[row] : (1 - f) * mapRowToMove[row];
    opacity = col >= targetColumn ? 0 : opacity;
  } else {
    const noise = appearDelays[i];

    const highestPoint = Math.max(maxContributions, 5);

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

    const maxGlow = interpolate(data, [0, highestPoint], [0, 1.6]);
    glow = interpolate(moveProgress, [0, 1], [1, maxGlow]);

    const d = interpolate(
      frame,
      [START_SPREAD + 50, START_SPREAD + 120],
      [400, 1500],
    );

    const towardsCenter = moveProgress * d;

    const pushFromCenter = Math.sin(noiseAngle + frame / 100) * towardsCenter;
    const pushFromTop = Math.cos(noiseAngle + frame / 100) * towardsCenter;

    const xDelta = noise.noiseX * 200;
    const yDelta = noise.noiseY * 800;

    left = moveProgress * xDelta + pushFromCenter;
    top = moveProgress * yDelta + pushFromTop;

    // opacity =
    //   1 - interpolate(frame, [START_SPREAD + 50, START_SPREAD + 120], [1, 1]);
  }

  if (data === 0 && frame > START_SPREAD + 5) {
    return <></>;
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
        {/* {glow > 1 ? (
          <AbsoluteFill>
            <Img src={GLOW_PNG} />
          </AbsoluteFill>
        ) : ( */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: `rgba(0, 166, 255, 1)`,
            borderRadius: "50%",
          }}
        ></div>
        {/* )} */}
      </div>
    </div>
  );
};

export const ContributionsScene2: React.FC<{
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

  return (
    <AbsoluteFill style={{}}>
      <AbsoluteFill style={{ backgroundColor: "black" }}>
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
              i={i}
              key={i}
              data={contributionData[i]}
              targetColumn={targetColumn}
              maxContributions={Math.max(...contributionData)}
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
            src={getFrontRocketSource(rocket)}
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
