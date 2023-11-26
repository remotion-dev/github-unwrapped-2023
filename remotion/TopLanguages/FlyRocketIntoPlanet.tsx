import { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { EnterDirection, ExitDirection } from "./corner";
import { NewRocketSVG } from "./svgs/NewRocketSVG";

export const FlyRocketIntoPlanet: React.FC<{
  exitDirection: ExitDirection;
  enterDirection: EnterDirection;
}> = ({ exitDirection, enterDirection }) => {
  const { height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

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
      return Math.PI;
    }

    if (enterDirection === "right-counter-clockwise") {
      return -Math.PI / 2;
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
        <NewRocketSVG />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
