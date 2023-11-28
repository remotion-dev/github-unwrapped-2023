import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import { Poof, POOF_DURATION } from "../Poof";
import { Background } from "./Background";
import { TIME_BEFORE_SHOOTING, TOTAL_SHOOT_DURATION } from "./constants";
import { getAudioHits } from "./get-audio-hits";
import {
  addShootDelays,
  getExplosions,
  getShootDuration,
  getShotsToFire,
} from "./get-shots-to-fire";
import { GlowStick } from "./GlowStick";
import { IssueGridLeft } from "./IssueGridLeft";
import { IssueGridRight } from "./IssueGridRight";
import { IssueNumber } from "./IssueNumber";
import {
  FPS,
  makeUfoPositions,
  UFO_ENTRANCE_DELAY,
  UFO_ENTRANCE_DURATION,
  UFO_EXIT_START,
} from "./make-ufo-positions";
import {
  Rocket,
  ROCKET_JUMP_IN_DELAY,
  ROCKET_JUMP_IN_DURATION,
} from "./Rocket";
import { Ufo } from "./Ufo";

export const issuesSchema = z.object({
  openIssues: z.number().min(0),
  closedIssues: z.number().min(0),
});

export const ISSUES_EXIT_DURATION = 20;

export const Issues: React.FC<z.infer<typeof issuesSchema>> = ({
  closedIssues,
  openIssues,
}) => {
  const frame = useCurrentFrame();
  const totalIssues = openIssues + closedIssues;

  const {
    ufos,
    closedIndices,
    offsetDueToManyUfos,
    factor,
    rowHeight,
    rows,
    columns,
  } = useMemo(() => {
    return makeUfoPositions({
      totalUfos: totalIssues,
      closedIssues,
    });
  }, [closedIssues, totalIssues]);

  const entrace = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: UFO_ENTRANCE_DURATION,
    delay: UFO_ENTRANCE_DELAY,
  });

  const exit = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
    delay: UFO_EXIT_START,
    durationInFrames: ISSUES_EXIT_DURATION,
  });

  const entranceYOffset = interpolate(entrace, [0, 1], [-rows * rowHeight, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shots = useMemo(() => {
    return getShotsToFire({ closedIndices, ufos });
  }, [closedIndices, ufos]);

  const withShootDurations = addShootDelays(shots);
  const audioHits = getAudioHits(withShootDurations);
  const explosions = getExplosions({ shots: withShootDurations, ufos });

  const yOffset = interpolate(
    frame,
    [TIME_BEFORE_SHOOTING, TIME_BEFORE_SHOOTING + TOTAL_SHOOT_DURATION],
    [0, -offsetDueToManyUfos],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.ease),
    },
  );

  const closedIssuesSoFar = ufos.filter((u, i) => {
    const explosion = explosions.find((e) => e.index === i);
    if (explosion) {
      return frame > explosion.explodeAfterFrames;
    }

    return false;
  });

  const jumpIn = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
    delay: ROCKET_JUMP_IN_DELAY,
    durationInFrames: ROCKET_JUMP_IN_DURATION,
  });

  const rocketOffset = interpolate(jumpIn, [0, 1], [400, 0]);

  const currentNumber =
    spring({
      fps: FPS,
      frame,
      config: {
        damping: 200,
      },
    }) * totalIssues;

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Gradient gradient="blueRadial" />
      </AbsoluteFill>
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateY(${yOffset}px)` }}>
        {withShootDurations.map((p, i) => {
          return (
            <Sequence
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              showInTimeline={false}
              durationInFrames={getShootDuration(shots) + p.shootDelay}
            >
              <GlowStick
                shootDelay={p.shootDelay}
                targetX={p.endX}
                targetY={p.endY}
                duration={getShootDuration(shots)}
              />
            </Sequence>
          );
        })}
        {ufos.map((p, i) => {
          const explosion = explosions.find((e) => e.index === i);
          return (
            <Sequence
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              showInTimeline={false}
              durationInFrames={
                explosion ? explosion.explodeAfterFrames + 3 : Infinity
              }
            >
              <Ufo
                exit={exit}
                explodeAfter={
                  explosion ? explosion.explodeAfterFrames : Infinity
                }
                scale={p.scale}
                x={p.x}
                y={p.y}
                column={p.column}
                columns={columns}
                yOffset={entranceYOffset}
              />
            </Sequence>
          );
        })}
        {explosions.map((explosion, i) => {
          return (
            <Sequence
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              showInTimeline={false}
              from={explosion.explodeAfterFrames}
              durationInFrames={POOF_DURATION}
              layout="none"
            >
              <Poof ufoScale={ufos[0].scale} x={explosion.x} y={explosion.y} />
            </Sequence>
          );
        })}
        {audioHits.map((audioHit, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Sequence key={i} from={audioHit}>
              <Audio src={staticFile("laser-shoot.mp3")} />)
            </Sequence>
          );
        })}
        <AbsoluteFill>
          <Rocket jumpIn={jumpIn} shots={withShootDurations} />
        </AbsoluteFill>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateY(${rocketOffset}px)`,
        }}
      >
        <AbsoluteFill
          style={{
            transform: `translateX(${interpolate(exit, [0, 1], [0, -500])}px)`,
          }}
        >
          <IssueGridLeft />
          <IssueNumber
            align="left"
            label="Opened"
            currentNumber={Math.round(currentNumber)}
            max={totalIssues}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            transform: `translateX(${interpolate(exit, [0, 1], [0, 500])}px)`,
          }}
        >
          <IssueGridRight />
          <IssueNumber
            align="right"
            label="Closed"
            currentNumber={Math.min(
              closedIssues,
              closedIssuesSoFar.length * (1 / factor),
            )}
            max={closedIssues}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
