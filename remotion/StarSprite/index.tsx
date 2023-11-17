import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import StarSprite1ASVG from "./sprites/Stars1ASVG";
import StarSprite2SVG from "./sprites/Stars2SVG";
import StarSprite3SVG from "./sprites/Stars3SVG";
import StarSprite4SVG from "./sprites/Stars4SVG";
import StarSprite5SVG from "./sprites/Stars5SVG";
import StarSprite6SVG from "./sprites/Stars6SVG";
import StarSprite7SVG from "./sprites/Stars7SVG";

const BIGGEST_WIDTH = 256;
const BIGGEST_HEIGHT = 284;

export const POOF_DURATION = 6;

export const StarSprite: React.FC = () => {
  const frame = Math.round(useCurrentFrame() / 2);

  const actualScale = 1.5;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          width: BIGGEST_WIDTH,
          height: BIGGEST_HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${actualScale})`,
        }}
      >
        {frame === 0 ? <StarSprite1ASVG /> : null}
        {frame === 1 ? <StarSprite2SVG /> : null}
        {frame === 2 ? <StarSprite3SVG /> : null}
        {frame === 3 ? <StarSprite4SVG /> : null}
        {frame === 4 ? <StarSprite5SVG /> : null}
        {frame === 5 ? <StarSprite6SVG /> : null}
        {frame === 6 ? <StarSprite7SVG /> : null}
      </div>
    </AbsoluteFill>
  );
};
