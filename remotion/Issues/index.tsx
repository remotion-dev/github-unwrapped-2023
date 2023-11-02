import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { z } from "zod";
import { Poof } from "../Poof";
import { GlowStick } from "./GlowStick";
import { makeUfoPositions } from "./make-ufo-positions";
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
        backgroundColor: "black",
      }}
    >
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
    </AbsoluteFill>
  );
};
