import { noise2D } from "@remotion/noise";
import { Pie } from "@remotion/shapes";
import { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";
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
import { isIosSafari } from "../Opening/TransparentVideo";
import { STAR_EXPLODE_DURATION } from "../StarSprite";
import { AnimatedCockpit } from "./AnimatedCockpit";
import { Shines } from "./Shines";
import {
  ANIMATION_DURATION_PER_STAR,
  HIT_RADIUS,
  Star,
  getStarBurstFirstFrame,
} from "./Star";

const MAX_STARS = 20;
const MAX_HITS = 8;
const TIME_INBETWEEN_STARS = 10;
const STAR_ANIMATION_DELAY = 20;

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
  sampleStarredRepos: z.array(z.string()),
});

const getActualStars = (starsGiven: number) => {
  return Math.max(5, Math.min(starsGiven * 2, MAX_STARS));
};

const getHitIndexes = ({
  starsDisplayed,
  seed,
  starsGiven,
}: {
  starsDisplayed: number;
  starsGiven: number;
  seed: string;
}): number[] => {
  const maxHits = Math.min(starsGiven, MAX_HITS);
  // Select hit indices randomly
  const hitIndexes = new Set<number>();

  let i = 0;
  while (hitIndexes.size < maxHits) {
    i++;
    hitIndexes.add(Math.floor(random(`${seed}${i}`) * starsDisplayed));
  }

  return Array.from(hitIndexes);
};

export const getStarFlyDuration = ({ starsGiven }: { starsGiven: number }) => {
  const actualStars = getActualStars(starsGiven);

  return (
    (actualStars - 1) * TIME_INBETWEEN_STARS +
    ANIMATION_DURATION_PER_STAR +
    STAR_ANIMATION_DELAY +
    STAR_EXPLODE_DURATION
  );
};

const starsSceneSchema = starsGivenSchema.merge(
  z.object({
    timeUntilTabletIsHidden: z.number(),
  }),
);

export const starsGivenCalculateMetadata: CalculateMetadataFunction<
  z.infer<typeof starsSceneSchema>
> = ({ props }) => {
  return {
    durationInFrames: getStarFlyDuration({ starsGiven: props.starsGiven }),
  };
};

if (!Array.prototype.findLastIndex) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.findLastIndex = function (callback, thisArg) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (callback.call(thisArg, this[i], i, this)) return i;
    }

    return -1;
  };
}

export const StarsGiven: React.FC<
  z.infer<typeof starsSceneSchema> & {
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
  sampleStarredRepos,
  timeUntilTabletIsHidden,
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

  const hits = useMemo(() => {
    return hitIndices
      .map((index) => {
        return (
          getStarBurstFirstFrame({
            duration: ANIMATION_DURATION_PER_STAR,
            hitSpaceship: true,
          }) +
          index * TIME_INBETWEEN_STARS +
          STAR_ANIMATION_DELAY
        );
      })
      .sort((a, b) => a - b);
  }, [hitIndices]);

  const text = useMemo(() => {
    const lastItemWithFrameVisible = hits.findLastIndex((i) => {
      return i < frame;
    });

    if (lastItemWithFrameVisible !== -1) {
      const distanceToPreviousHit = Math.abs(
        frame - hits[lastItemWithFrameVisible],
      );
      const distanceToNextHit = Math.abs(
        frame - hits[lastItemWithFrameVisible + 1],
      );

      if (hits[lastItemWithFrameVisible + 1] === undefined) {
        return {
          opacity: 1,
          text: sampleStarredRepos[lastItemWithFrameVisible],
        };
      }

      const distanceToHit = Math.min(distanceToPreviousHit, distanceToNextHit);
      const opacity = interpolate(distanceToHit, [0, 3], [0, 1]);

      return {
        opacity,
        text: sampleStarredRepos[lastItemWithFrameVisible],
      };
    }

    return null;
  }, [frame, hits, sampleStarredRepos]);

  const durationOfStars = getStarFlyDuration({ starsGiven });

  const starCount = useMemo(() => {
    if (hits.length === starsGiven) {
      const lastItemWithFrameVisible = hits.findLastIndex((i) => {
        return i < frame;
      });
      return lastItemWithFrameVisible + 1;
    }

    // If more stars than hits, we need to interpolate between the last hit and the next hit
    return Math.round(
      interpolate(
        frame,
        [0, getStarFlyDuration({ starsGiven }) - 10],
        [0, starsGiven],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      ),
    );
  }, [frame, hits, starsGiven]);

  return (
    <AbsoluteFill style={style}>
      {showBackground ? (
        <AbsoluteFill>
          <Gradient gradient={accentColorToGradient(accentColor)} />
        </AbsoluteFill>
      ) : null}
      <Noise translateX={0} translateY={0} />
      {isIosSafari() ? null : (
        <Shines rotationShake={rotationShake} xShake={xShake} yShake={yShake} />
      )}
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
          repoText={text}
          starCount={starCount}
          totalStarCount={starsGiven}
          durationOfStars={durationOfStars}
          timeUntilTabletIsHidden={timeUntilTabletIsHidden}
        />
      ) : null}
    </AbsoluteFill>
  );
};
