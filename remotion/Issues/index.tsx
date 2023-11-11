import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { JumpingNumber } from "../JumpingNumber/JumpingNumber";
import { Poof, POOF_DURATION } from "../Poof";
import { Background } from "./Background";
import { getExplosions, getShotsToFire } from "./get-shots-to-fire";
import { GlowStick } from "./GlowStick";
import { HelperPoint } from "./HelperPoint";
import {
  makeUfoPositions,
  ROCKET_ORIGIN_X,
  ROCKET_ORIGIN_Y,
  SHOOT_DURATION,
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

  const { ufos: ufos, closedIndices } = makeUfoPositions({
    numberOfUfos: totalIssues,
    closedIssues,
    frame,
  });
  const shots = getShotsToFire({ closedIndices, ufos });
  const explosions = getExplosions({ shots, ufos });
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
      {shots.map((p, i) => {
        return (
          <Sequence durationInFrames={SHOOT_DURATION + p.shootDelay} key={i}>
            <GlowStick
              shootDelay={p.shootDelay}
              targetX={p.endX}
              targetY={p.endY}
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
              explodeAfter={p.shootDelay}
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
        <Rocket shots={shots}></Rocket>
      </AbsoluteFill>
      <HelperPoint x={ROCKET_ORIGIN_X} y={ROCKET_ORIGIN_Y}></HelperPoint>
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
        <JumpingNumber
          duration={40}
          from={0}
          to={closedIssues + openIssues}
        ></JumpingNumber>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
