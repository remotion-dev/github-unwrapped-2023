import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NewRocketSVG } from "./svgs/NewRocketSVG";

export const FlyRocketIntoPlanet: React.FC<{}> = () => {
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

  const marginTop = interpolate(flyIn, [0, 1], [height / 2 + 200, 0]);

  return (
    <AbsoluteFill>
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
