import { noise2D } from "@remotion/noise";
import { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
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
import { isMobileDevice } from "../Opening/devices";
import { TABLET_SCENE_ENTER_ANIMATION } from "../Productivity/Tablet";
import { STAR_EXPLODE_DURATION } from "../StarSprite";
import { AnimatedCockpit } from "./AnimatedCockpit";
import { Shines } from "./Shines";
import { ANIMATION_DURATION_PER_STAR, getStarBurstFirstFrame } from "./Star";
import {
  STAR_ANIMATION_DELAY,
  StarsFlying,
  TIME_INBETWEEN_STARS,
  getActualStars,
  getHitIndexes,
} from "./StarsFlying";

export const starsGivenSchema = z.object({
  starsGiven: z.number().min(0),
  showCockpit: z.boolean(),
  topWeekday: topWeekdaySchema,
  topHour: topHourSchema,
  graphData: z.array(productivityPerHourSchema),
  accentColor: accentColorSchema,
  totalPullRequests: z.number(),
  login: z.string(),
  sampleStarredRepos: z.array(z.string()),
});

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
    timeUntilTabletHides: z.number(),
  }),
);

type Props = z.infer<typeof starsSceneSchema> & {
  style?: React.CSSProperties;
  totalPullRequests: number;
  timeUntilTabletHasEntered: number;
};

export const starsGivenCalculateMetadata: CalculateMetadataFunction<Props> = ({
  props,
}) => {
  return {
    durationInFrames: getStarFlyDuration({ starsGiven: props.starsGiven }),
  };
};

export const StarsGiven: React.FC<Props> = ({
  starsGiven,
  style,
  showCockpit,
  accentColor,
  totalPullRequests,
  sampleStarredRepos,
  timeUntilTabletHides,
  timeUntilTabletHasEntered,
}) => {
  const frame = useCurrentFrame();
  const shakeFactor = interpolate(
    frame,
    [
      timeUntilTabletHasEntered - 40,
      timeUntilTabletHasEntered - TABLET_SCENE_ENTER_ANIMATION - 15,
    ],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const xShake =
    shakeFactor === 0 ? 0 : noise2D("xshake", frame / 10, 0) * 10 * shakeFactor;
  const yShake =
    shakeFactor === 0 ? 0 : noise2D("yshake", frame / 10, 0) * 10 * shakeFactor;
  const rotationShake =
    shakeFactor === 0
      ? 0
      : noise2D("rotateshake", frame / 10, 0) * 0.02 * shakeFactor;

  const starsDisplayed = useMemo(() => {
    return getActualStars(starsGiven);
  }, [starsGiven]);

  const hitIndices = useMemo(() => {
    return getHitIndexes({
      starsDisplayed,
      seed: "starsGiven",
      starsGiven,
    });
  }, [starsDisplayed, starsGiven]);

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
      const opacity = interpolate(distanceToHit, [0, 2], [0, 1]);

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

  const gradientOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={style}>
      <Sequence durationInFrames={timeUntilTabletHasEntered}>
        <AbsoluteFill style={{ opacity: gradientOpacity }}>
          <Gradient gradient={accentColorToGradient(accentColor)} />
          <Noise translateX={0} translateY={0} />
        </AbsoluteFill>
        {isMobileDevice() ? null : (
          <Shines
            rotationShake={rotationShake}
            xShake={xShake}
            yShake={yShake}
          />
        )}
        <StarsFlying hitIndices={hitIndices} starsGiven={starCount} />
      </Sequence>
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
          timeUntilTabletHides={timeUntilTabletHides}
        />
      ) : null}
    </AbsoluteFill>
  );
};
