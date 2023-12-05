import { noise2D } from "@remotion/noise";
import { Pie } from "@remotion/shapes";
import type { CalculateMetadataFunction } from "remotion";
import { AbsoluteFill, Sequence, random, useCurrentFrame } from "remotion";
import { z } from "zod";
import {
  accentColorSchema,
  productivityPerHourSchema,
  topHourSchema,
  topWeekdaySchema,
} from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { accentColorToGradient } from "../Opening/TitleImage";
import { STAR_EXPLODE_DURATION } from "../StarSprite";
import { AnimatedCockpit } from "./AnimatedCockpit";
import { Shines } from "./Shines";
import { ANIMATION_DURATION_PER_STAR, HIT_RADIUS, Star } from "./Star";

export const MAX_STARS = 50;
export const TIME_INBETWEEN_STARS = 10;
export const STAR_ANIMATION_DELAY = 20;

export const starsGivenSchema = z.object({
  starsGiven: z.number().min(0),
  showBackground: z.boolean(),
  showHitWindow: z.boolean(),
  showCockpit: z.boolean(),
  showDots: z.boolean(),
  topWeekday: topWeekdaySchema,
  topHour: topHourSchema,
  graphData: z.array(productivityPerHourSchema),
  accentColor: accentColorSchema,
  totalPullRequests: z.number(),
  login: z.string(),
});

export const getActualStars = (starsGiven: number) => {
  return Math.max(5, Math.min(starsGiven * 2, MAX_STARS));
};

export const getHitIndexes = ({
  starsDisplayed,
  seed,
  starsGiven,
}: {
  starsDisplayed: number;
  starsGiven: number;
  seed: string;
}): number[] => {
  const maxHits = Math.min(starsGiven, MAX_STARS);
  // Select hit indices randomly
  const hitIndexes = new Set<number>();

  let i = 0;
  while (hitIndexes.size < maxHits) {
    i++;
    hitIndexes.add(Math.floor(random(`${seed}${i}`) * starsDisplayed));
  }

  return Array.from(hitIndexes);
};

export const starFlyDuration = ({ starsGiven }: { starsGiven: number }) => {
  const actualStars = getActualStars(starsGiven);

  return (
    (actualStars - 1) * TIME_INBETWEEN_STARS +
    ANIMATION_DURATION_PER_STAR +
    STAR_ANIMATION_DELAY +
    STAR_EXPLODE_DURATION
  );
};

export const starsGivenCalculateMetadata: CalculateMetadataFunction<
  z.infer<typeof starsGivenSchema>
> = ({ props }) => {
  return {
    durationInFrames: starFlyDuration({ starsGiven: props.starsGiven }),
  };
};

export const StarsGiven: React.FC<
  z.infer<typeof starsGivenSchema> & {
    style?: React.CSSProperties;
    totalPullRequests: number;
  }
> = ({
  starsGiven,
  style,
  showBackground,
  showHitWindow,
  showCockpit,
  showDots,
  accentColor,
  totalPullRequests,
}) => {
  const frame = useCurrentFrame();

  const xShake = noise2D("xshake", frame / 10, 0) * 10;
  const yShake = noise2D("yshake", frame / 10, 0) * 10;
  const rotationShake = noise2D("rotateshake", frame / 10, 0) * 0.05;

  const starsDisplayed = getActualStars(starsGiven);

  const hitIndices = getHitIndexes({
    starsDisplayed,
    seed: "starsGiven",
    starsGiven,
  });

  return (
    <AbsoluteFill style={style}>
      {showBackground ? (
        <AbsoluteFill>
          <Gradient gradient={accentColorToGradient(accentColor)} />
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
      {new Array(getActualStars(starsGiven)).fill(true).map((_, index) => (
        <Sequence // eslint-disable-next-line react/no-array-index-key
          key={index}
          from={index * TIME_INBETWEEN_STARS + STAR_ANIMATION_DELAY}
        >
          <Star
            angle={random(`${index}a`) * Math.PI - Math.PI / 2}
            duration={ANIMATION_DURATION_PER_STAR}
            showDots={showDots}
            hitSpaceship={
              hitIndices.includes(index)
                ? { index: hitIndices.indexOf(index) }
                : null
            }
          />
        </Sequence>
      ))}
      {showCockpit ? (
        <AnimatedCockpit
          rotationShake={rotationShake}
          xShake={xShake}
          yShake={yShake}
          accentColor={accentColor}
          totalPullRequests={totalPullRequests}
        />
      ) : null}
    </AbsoluteFill>
  );
};
