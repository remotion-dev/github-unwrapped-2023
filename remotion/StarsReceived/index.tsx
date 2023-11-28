import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import { Tablet } from "../Productivity/Tablet";
import { GRAPH_DATA } from "../Productivity/constants";
import { AnimatedCockpit } from "./AnimatedCockpit";
import { Description } from "./Description";
import { Star } from "./Star";

export const MAX_STARS = 50;
export const TIME_INBETWEEN_STARS = 20;
export const STAR_DELAY = 20;

export const starsReceivedSchema = z.object({
  starsReceived: z.number().min(0),
  showBackground: z.boolean(),
  showHitWindow: z.boolean(),
});

export const StarsReceived: React.FC<
  z.infer<typeof starsReceivedSchema> & { style?: React.CSSProperties }
> = ({ starsReceived, style, showBackground, showHitWindow }) => {
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
    <AbsoluteFill style={style}>
      {showBackground ? (
        <AbsoluteFill>
          <Gradient gradient="blueRadial" />
        </AbsoluteFill>
      ) : null}
      {new Array(starsReceived).fill("").map((_, index) => (
        <Sequence // eslint-disable-next-line react/no-array-index-key
          key={index}
          from={index * TIME_INBETWEEN_STARS + STAR_DELAY}
        >
          <Star
            id={`star-${index}`}
            duration={30}
            starsShown={Math.min(starsReceived, MAX_STARS)}
            showHitWindow={showHitWindow}
          />
        </Sequence>
      ))}
      <AnimatedCockpit />
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
