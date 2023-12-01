import { noise2D } from "@remotion/noise";
import { Pie } from "@remotion/shapes";
import { AbsoluteFill, Sequence, random, useCurrentFrame } from "remotion";
import { z } from "zod";
import { topWeekdaySchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { AnimatedCockpit } from "./AnimatedCockpit";
import { Shines } from "./Shines";
import { HIT_RADIUS, STAR_ANIMATION_DURATION, Star } from "./Star";

export const MAX_STARS = 50;
export const TIME_INBETWEEN_STARS = 10;
export const STAR_DELAY = 20;

export const starsReceivedSchema = z.object({
  starsGiven: z.number().min(0),
  showBackground: z.boolean(),
  showHitWindow: z.boolean(),
  showCockpit: z.boolean(),
  showDots: z.boolean(),
  topWeekday: topWeekdaySchema,
});

export const StarsReceived: React.FC<
  z.infer<typeof starsReceivedSchema> & {
    style?: React.CSSProperties;
  }
> = ({
  starsGiven,
  style,
  showBackground,
  showHitWindow,
  showCockpit,
  showDots,
}) => {
  const frame = useCurrentFrame();

  const xShake = noise2D("xshake", frame / 10, 0) * 10;
  const yShake = noise2D("yshake", frame / 10, 0) * 10;
  const rotationShake = noise2D("rotateshake", frame / 10, 0) * 0.05;

  return (
    <AbsoluteFill style={style}>
      {showBackground ? (
        <AbsoluteFill>
          <Gradient gradient="blueRadial" />
        </AbsoluteFill>
      ) : null}
      <Noise translateX={0} translateY={0} />
      <Shines rotationShake={rotationShake} xShake={xShake} yShake={yShake} />
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
      {new Array(starsGiven).fill("").map((_, index) => (
        <Sequence // eslint-disable-next-line react/no-array-index-key
          key={index}
          from={index * TIME_INBETWEEN_STARS + STAR_DELAY}
        >
          <Star
            angle={random(`${index}a`) * Math.PI - Math.PI / 2}
            id={`star-${index}`}
            duration={STAR_ANIMATION_DURATION}
            starsShown={Math.min(starsGiven, MAX_STARS)}
            showDots={showDots}
          />
        </Sequence>
      ))}
      {showCockpit ? (
        <AnimatedCockpit
          rotationShake={rotationShake}
          xShake={xShake}
          yShake={yShake}
        />
      ) : null}
    </AbsoluteFill>
  );
};
