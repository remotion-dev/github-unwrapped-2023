import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import StarSprite1SVG from "./sprites/Stars1SVG";
import StarSprite2SVG from "./sprites/Stars2SVG";
import StarSprite3SVG from "./sprites/Stars3SVG";
import StarSprite4SVG from "./sprites/Stars4SVG";
import StarSprite5SVG from "./sprites/Stars5SVG";
import StarSprite6SVG from "./sprites/Stars6SVG";
import StarSprite7SVG from "./sprites/Stars7SVG";
import StarSprite8SVG from "./sprites/Stars8SVG";

const BIGGEST_WIDTH = 256;
const BIGGEST_HEIGHT = 284;

export const STAR_DURATION = 8;

export const StarSprite: React.FC<{
  burstFrame?: number;
}> = ({ burstFrame }) => {
  const frame = useCurrentFrame();

  const actualFrame = Math.round(frame - (burstFrame ?? 0));

  const actualScale = 2;

  const renderSprite = () => {
    switch (actualFrame) {
      case 0: {
        return <StarSprite1SVG />;
      }

      case 1: {
        return <StarSprite2SVG />;
      }

      case 2: {
        return <StarSprite3SVG />;
      }

      case 3: {
        return <StarSprite4SVG />;
      }

      case 4: {
        return <StarSprite5SVG />;
      }

      case 5: {
        return <StarSprite6SVG />;
      }

      case 6: {
        return <StarSprite7SVG />;
      }

      case 7: {
        return <StarSprite8SVG />;
      }

      default: {
        return <StarSprite1SVG />;
      }
    }
  };

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
        {!burstFrame || frame < burstFrame ? (
          <StarSprite1SVG />
        ) : (
          renderSprite()
        )}
      </div>
    </AbsoluteFill>
  );
};
