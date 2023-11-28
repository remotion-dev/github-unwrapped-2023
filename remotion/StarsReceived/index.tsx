import { Pie } from "@remotion/shapes";
import {
  AbsoluteFill,
  Sequence,
  random,
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
import { HIT_RADIUS, Star } from "./Star";

export const MAX_STARS = 50;
export const TIME_INBETWEEN_STARS = 20;
export const STAR_DELAY = 20;

export const starsReceivedSchema = z.object({
  starsReceived: z.number().min(0),
  showBackground: z.boolean(),
  showHitWindow: z.boolean(),
  showCockpit: z.boolean(),
});

export const StarsReceived: React.FC<
  z.infer<typeof starsReceivedSchema> & { style?: React.CSSProperties }
> = ({ starsReceived, style, showBackground, showHitWindow, showCockpit }) => {
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
      {showHitWindow ? (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pie
            radius={HIT_RADIUS}
            progress={0.5}
            fill="white"
            rotation={-0.5 * Math.PI}
            style={{
              transform: `translateY(150px)`,
              opacity: 0.5,
            }}
          />
        </AbsoluteFill>
      ) : null}
      {new Array(starsReceived).fill("").map((_, index) => (
        <Sequence // eslint-disable-next-line react/no-array-index-key
          key={index}
          from={index * TIME_INBETWEEN_STARS + STAR_DELAY}
        >
          <Star
            angle={random(`${index}a`) * Math.PI - Math.PI / 2}
            id={`star-${index}`}
            duration={30}
            starsShown={Math.min(starsReceived, MAX_STARS)}
          />
        </Sequence>
      ))}
      {showCockpit ? <AnimatedCockpit /> : null}
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
