import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { JumpingNumber } from "../JumpingNumber/JumpingNumber";
import { Poof } from "../Poof";
import { Background } from "./Background";
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

  const positions = makeUfoPositions(totalIssues, closedIssues, frame);

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
      {positions.map((p, i) => {
        if (!p.isClosed) {
          return null;
        }

        return (
          <Sequence durationInFrames={p.shootDuration + p.shootDelay} key={i}>
            <GlowStick
              shootDelay={p.shootDelay}
              shootDuration={p.shootDuration}
              targetX={p.x}
              targetY={p.y}
            ></GlowStick>
          </Sequence>
        );
      })}
      {positions.map((p, i) => {
        return (
          <Sequence
            key={i}
            durationInFrames={
              p.isClosed ? p.shootDelay + p.shootDuration + 2 : Infinity
            }
          >
            <Ufo
              explodeAfter={p.shootDelay + p.shootDuration}
              scale={p.scale}
              x={p.x}
              y={p.y}
            ></Ufo>
          </Sequence>
        );
      })}
      {positions.map((p, i) => {
        if (!p.isClosed) {
          return null;
        }
        return (
          <Sequence key={i} from={p.shootDelay + p.shootDuration} layout="none">
            <Poof ufoScale={p.scale} x={p.x} y={p.y}></Poof>
          </Sequence>
        );
      })}
      <AbsoluteFill>
        <Rocket positions={positions}></Rocket>
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
