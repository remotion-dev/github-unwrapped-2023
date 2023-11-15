import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { makeRandomPath } from "./make-random-path";
import { Path1 } from "./Path1";

export const WholePaths: React.FC<{
  evolution: number | null;
  extraPaths: number;
}> = ({ evolution: _evolution, extraPaths }) => {
  return (
    <AbsoluteFill>
      {Array.from({ length: extraPaths }).map((_, i) => {
        return (
          <Sequence key={i}>
            <Path1
              key={i}
              d={makeRandomPath(`seed${i * 43234}`)}
              stroke="rgba(255, 255, 255, 0.2)"
            ></Path1>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
