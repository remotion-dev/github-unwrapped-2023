import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { Poof, POOF_DURATION } from "../Poof";
import { Background } from "./Background";
import {
  addShootDelays,
  getExplosions,
  getShootDuration,
  getShotsToFire,
} from "./get-shots-to-fire";
import { GlowStick } from "./GlowStick";
import { IssueNumber } from "./IssueNumber";
import { makeUfoPositions } from "./make-ufo-positions";
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

  const { ufos, closedIndices } = makeUfoPositions({
    numberOfUfos: totalIssues,
    closedIssues,
    frame,
  });
  const shots = getShotsToFire({ closedIndices, ufos });
  const withShootDurations = addShootDelays(shots);
  const explosions = getExplosions({ shots: withShootDurations, ufos });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
      <AbsoluteFill>
        <Background></Background>
      </AbsoluteFill>
      {withShootDurations.map((p, i) => {
        return (
          <Sequence
            durationInFrames={getShootDuration(shots) + p.shootDelay}
            key={i}
          >
            <GlowStick
              shootDelay={p.shootDelay}
              targetX={p.endX}
              targetY={p.endY}
              duration={getShootDuration(shots)}
            ></GlowStick>
          </Sequence>
        );
      })}
      {ufos.map((p, i) => {
        const explosion = explosions.find((e) => e.index === i);
        return (
          <Sequence
            key={i}
            durationInFrames={
              explosion ? explosion.explodeAfterFrames + 3 : Infinity
            }
          >
            <Ufo
              explodeAfter={explosion ? explosion.explodeAfterFrames : Infinity}
              scale={p.scale}
              x={p.x}
              y={p.y}
            ></Ufo>
          </Sequence>
        );
      })}
      {explosions.map((explosion, i) => {
        return (
          <Sequence
            key={i}
            from={explosion.explodeAfterFrames}
            durationInFrames={POOF_DURATION}
            layout="none"
          >
            <Poof
              ufoScale={ufos[0].scale}
              x={explosion.x}
              y={explosion.y}
            ></Poof>
          </Sequence>
        );
      })}
      <AbsoluteFill>
        <Rocket shots={withShootDurations}></Rocket>
      </AbsoluteFill>
      <IssueNumber
        closedIssues={closedIssues}
        openIssues={openIssues}
      ></IssueNumber>
    </AbsoluteFill>
  );
};
