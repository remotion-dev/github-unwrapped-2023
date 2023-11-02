import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
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
  const totalIssues = openIssues + closedIssues;

  const positions = makeUfoPositions(totalIssues);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      {positions.map((p, i) => {
        return (
          <AbsoluteFill key={i}>
            <GlowStick
              shootDelay={p.shootDelay}
              shootDuration={20}
              targetX={p.x}
              targetY={p.y}
            ></GlowStick>
          </AbsoluteFill>
        );
      })}
      {positions.map((p, i) => {
        return <Ufo scale={p.scale} key={i} x={p.x} y={p.y}></Ufo>;
      })}
    </AbsoluteFill>
  );
};
