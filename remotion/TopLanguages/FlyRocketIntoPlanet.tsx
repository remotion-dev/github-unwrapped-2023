import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Rocket } from "../../src/config";
import {
  mapEnterDirectionToExitDirection,
  type EnterDirection,
} from "./corner";
import { RocketFront } from "./svgs/FrontRocketSource";

export const FlyRocketIntoPlanet: React.FC<{
  enterDirection: EnterDirection;
  rocket: Rocket;
}> = ({ enterDirection, rocket }) => {
  const { height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const exitDirection = mapEnterDirectionToExitDirection(enterDirection);

  const flyIn = spring({
    fps,
    frame,
    config: {
      damping: 100,
    },
    reverse: true,
    from: 1,
    to: 0,
  });

  const rotation = useMemo(() => {
    if (exitDirection === "left") {
      return -Math.PI / 2;
    }

    if (exitDirection === "right") {
      return Math.PI / 2;
    }

    if (exitDirection === "bottom") {
      if (enterDirection === "right-counter-clockwise") {
        return Math.PI / 2;
      }

      return Math.PI;
    }

    return 0;
  }, [enterDirection, exitDirection]);

  const marginTop = interpolate(flyIn, [0, 1], [height / 2 + 400, 0]);

  return (
    <AbsoluteFill
      style={{
        transform: `rotate(${rotation + Math.PI / 4}rad)`,
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop,
        }}
      >
        <RocketFront rocket={rocket} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
