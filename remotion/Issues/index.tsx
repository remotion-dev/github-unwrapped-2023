import React, { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { rocketSchema } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { isMobileDevice } from "../Opening/devices";
import { Poof, POOF_DURATION } from "../Poof";
import {
  WIGGLE_EXIT_DURATION,
  WIGGLE_EXIT_SPRING_CONFIG,
} from "../TopLanguages/PlaneScaleWiggle";
import { getTotalShootDuration, TIME_BEFORE_SHOOTING } from "./constants";
import { getAudioHits, getIssueSounds } from "./get-audio-hits";
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
} from "./make-ufo-positions";
import {
  ROCKET_JUMP_IN_DELAY,
  ROCKET_JUMP_IN_DURATION,
  RocketComponent,
} from "./Rocket";
import { IssuesDetected } from "./Title";
import { Ufo } from "./Ufo";
import { UFO_ASSET } from "./UfoSvg";
import { ZERO_ISSUES_DURATION, ZeroIssues } from "./ZeroIssues";

export const issuesSchema = z.object({
  openIssues: z.number().min(0),
  closedIssues: z.number().min(0),
  rocket: rocketSchema,
});

export const ISSUES_EXIT_DURATION = 20;

export const getIssuesDuration = ({
  issuesClosed,
  issuesOpened,
}: {
  issuesClosed: number;
  issuesOpened: number;
}) => {
  const totalIssues = issuesClosed + issuesOpened;

  if (totalIssues === 0) {
    return ZERO_ISSUES_DURATION;
  }

  return 4 * VIDEO_FPS + 20 + getTotalShootDuration(issuesClosed);
};

export const calculateIssueDuration: CalculateMetadataFunction<
  z.infer<typeof issuesSchema>
> = ({ defaultProps: { closedIssues, openIssues } }) => {
  return {
    durationInFrames: getIssuesDuration({
      issuesClosed: closedIssues,
      issuesOpened: openIssues,
    }),
  };
};

export const getIssuesAssetsToPrefetch = () => {
  return [...getIssueSounds(), UFO_ASSET];
};

export const Issues: React.FC<z.infer<typeof issuesSchema>> = ({
  closedIssues,
  openIssues,
  rocket,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const totalIssues = openIssues + closedIssues;

  const {
    ufos,
    closedIndices,
    offsetDueToManyUfos,
    factor,
    totalHeight,
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
    config: WIGGLE_EXIT_SPRING_CONFIG,
    durationInFrames: WIGGLE_EXIT_DURATION,
    delay: UFO_ENTRANCE_DELAY,
  });

  const UFO_EXIT_START =
    TIME_BEFORE_SHOOTING + getTotalShootDuration(closedIssues) + 10;

  const exit =
    1 -
    spring({
      fps: FPS,
      frame,
      config: {
        damping: 200,
      },
      delay: UFO_EXIT_START,
      durationInFrames: ISSUES_EXIT_DURATION,
      reverse: true,
    });

  const entranceYOffset = interpolate(entrace, [0, 1], [-totalHeight, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shots = useMemo(() => {
    return getShotsToFire({ closedIndices, ufos });
  }, [closedIndices, ufos]);

  const withShootDurations = addShootDelays(shots);
  const explosions = getExplosions({ shots: withShootDurations, ufos });
  const audioHits = getAudioHits(withShootDurations);

  const yOffset = interpolate(
    frame,
    [
      TIME_BEFORE_SHOOTING,
      TIME_BEFORE_SHOOTING + getTotalShootDuration(UFO_EXIT_START),
    ],
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

  const jumpInRocket = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
    delay: ROCKET_JUMP_IN_DELAY,
    durationInFrames: ROCKET_JUMP_IN_DURATION,
  });

  const jumpInCounter = spring({
    fps: FPS,
    frame,
    config: {
      damping: 200,
    },
    delay: ROCKET_JUMP_IN_DELAY + 30,
    durationInFrames: ROCKET_JUMP_IN_DURATION,
  });

  const counterOffset = interpolate(jumpInCounter, [0, 1], [400, 0]);

  const currentNumber =
    spring({
      fps: FPS,
      frame,
      config: {
        damping: 200,
      },
    }) * totalIssues;

  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity }}>
        <Gradient gradient="greenRadial" />
        <AbsoluteFill style={{ opacity: 0.4 }}>
          <Noise translateX={3} translateY={10} />
        </AbsoluteFill>
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
        {totalIssues === 0 ? <ZeroIssues /> : false}
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
            <Sequence key={i} from={audioHit.delay}>
              {isMobileDevice() ? null : <Audio src={audioHit.source} />}
            </Sequence>
          );
        })}
        {totalIssues > 0 ? (
          <AbsoluteFill>
            <RocketComponent
              rocket={rocket}
              jumpIn={jumpInRocket}
              shots={withShootDurations}
            />
          </AbsoluteFill>
        ) : null}
      </AbsoluteFill>
      <IssuesDetected exit={jumpInCounter} issues={totalIssues} />
      {totalIssues > 0 ? (
        <AbsoluteFill
          style={{
            transform: `translateY(${counterOffset}px)`,
          }}
        >
          <AbsoluteFill style={{}}>
            <IssueGridLeft />
            <IssueNumber
              align="left"
              label="Opened issues"
              currentNumber={Math.round(currentNumber)}
              max={totalIssues}
            />
          </AbsoluteFill>
          <AbsoluteFill style={{}}>
            <IssueGridRight />
            <IssueNumber
              align="right"
              label="Closed issues"
              currentNumber={Math.min(
                closedIssues,
                Math.round(closedIssuesSoFar.length * (1 / factor)),
              )}
              max={closedIssues}
            />
          </AbsoluteFill>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
