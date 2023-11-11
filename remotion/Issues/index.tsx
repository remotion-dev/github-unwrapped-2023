import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { JumpingNumber } from "../JumpingNumber/JumpingNumber";
import { Poof } from "../Poof";
import { Background } from "./Background";
import { getShotsToFire } from "./get-shots-to-fire";
import { GlowStick } from "./GlowStick";
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

  const { ufos: ufos, closedIndices } = makeUfoPositions({
    numberOfUfos: totalIssues,
    closedIssues,
    frame,
  });
  const shots = getShotsToFire({ closedIndices, ufos });

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
          <Sequence durationInFrames={p.shootDuration + p.shootDelay} key={i}>
            <GlowStick
              shootDelay={p.shootDelay}
              shootDuration={p.shootDuration}
              targetX={p.endX}
              targetY={p.endY}
            ></GlowStick>
          </Sequence>
        );
      })}
      {ufos.map((p, i) => {
        return (
          <Ufo
            key={i}
            explodeAfter={p.shootDelay}
            scale={p.scale}
            x={p.x}
            y={p.y}
          ></Ufo>
        );
      })}
      {ufos.map((p, i) => {
        if (!p.isClosed) {
          return null;
        }
        return (
          <Sequence key={i} from={p.shootDelay} layout="none">
            <Poof ufoScale={p.scale} x={p.x} y={p.y}></Poof>
          </Sequence>
        );
      })}
      <AbsoluteFill>
        <Rocket shots={shots}></Rocket>
      </AbsoluteFill>
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
