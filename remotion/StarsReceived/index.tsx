import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Tablet } from "../Productivity/Tablet";
import { GRAPH_DATA } from "../Productivity/constants";
import CockpitSVG from "./CockpitSVG";
import { Description } from "./Description";
import { Star } from "./Star";

export const MAX_STARS = 50;
export const STARS_DELAY = 20;
export const STAR_DURATION = 40;

export const starsReceivedSchema = z.object({
  starsReceived: z.number().min(0),
});

export const StarsReceived: React.FC<
  z.infer<typeof starsReceivedSchema> & { style?: React.CSSProperties }
> = ({ starsReceived, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tabletTransition = spring({
    fps,
    frame,
    delay: 295,
    config: {
      mass: 4,
      damping: 200,
    },
  });
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
        ...style,
      }}
    >
      {new Array(starsReceived).fill("").map((_, index) => (
        <Star
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          initialFrame={index * STARS_DELAY}
          duration={30}
          starsShown={Math.min(starsReceived, MAX_STARS)}
        />
      ))}

      <AbsoluteFill>
        <CockpitSVG />
      </AbsoluteFill>
      <Description starsReceived={starsReceived} />

      <Tablet
        style={{
          position: "absolute",
          transformOrigin: "left bottom",
          transform: `translateY(${500 - tabletTransition * 500}px) scale(0.5)`,
        }}
        graphData={GRAPH_DATA}
      />
    </AbsoluteFill>
  );
};
