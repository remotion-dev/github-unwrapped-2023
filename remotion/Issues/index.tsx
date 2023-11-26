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
import { IssueNumber } from "./IssueNumber";
import {
  FPS,
  makeUfoPositions,
  UFO_ENTRANCE_DELAY,
  UFO_ENTRANCE_DURATION,
} from "./make-ufo-positions";
import { Rocket } from "./Rocket";
import { Ufo } from "./Ufo";

export const issuesSchema = z.object({
  openIssues: z.number().min(0),
  closedIssues: z.number().min(0),
});

export const Issues: React.FC<z.infer<typeof issuesSchema>> = ({
  closedIssues,
  openIssues,
}) => {
  const frame = useCurrentFrame();
  const totalIssues = openIssues + closedIssues;

  const { ufos, closedIndices, offsetDueToManyUfos, rowHeight, rows } =
    useMemo(() => {
      return makeUfoPositions({
        numberOfUfos: totalIssues,
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
    [0, -offsetDueToManyUfos + 400],
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

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
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
                explodeAfter={
                  explosion ? explosion.explodeAfterFrames : Infinity
                }
                scale={p.scale}
                x={p.x}
                y={p.y}
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
          <Rocket shots={withShootDurations} />
        </AbsoluteFill>
      </AbsoluteFill>
      <IssueNumber
        align="left"
        label="Issues opened"
        totalIssues={closedIssues + openIssues}
      />
      <IssueNumber
        align="right"
        label="Issues closed"
        totalIssues={closedIssuesSoFar.length}
      />
    </AbsoluteFill>
  );
};
