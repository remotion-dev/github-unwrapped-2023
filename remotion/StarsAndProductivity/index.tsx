import { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import { TABLET_SCENE_LENGTH, Tablet } from "../Productivity/Tablet";
import type { starsGivenSchema } from "../StarsGiven";
import { StarsGiven, getStarFlyDuration } from "../StarsGiven";

const TABLET_SCENE_HIDE_ANIMATION = 45;

export const getTimeUntilTabletIsHidden = ({
  starsGiven,
}: {
  starsGiven: number;
}) => {
  return (
    getStarFlyDuration({ starsGiven }) +
    TABLET_SCENE_LENGTH +
    TABLET_SCENE_HIDE_ANIMATION
  );
};

export const getStarsAndProductivityDuration = ({
  starsGiven,
}: {
  starsGiven: number;
}) => {
  return getTimeUntilTabletIsHidden({ starsGiven });
};

export const starsAndProductivityCalculateMetadata: CalculateMetadataFunction<
  z.infer<typeof starsGivenSchema>
> = ({ props }) => {
  return {
    durationInFrames: getStarsAndProductivityDuration({
      starsGiven: props.starsGiven,
    }),
  };
};

export const StarsAndProductivity: React.FC<
  z.infer<typeof starsGivenSchema>
> = ({
  starsGiven,
  showHitWindow,
  showBackground,
  showCockpit,
  showDots,
  topWeekday,
  topHour,
  graphData,
  accentColor,
  totalPullRequests,
  login,
  sampleStarredRepos,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const starFlyDuration = useMemo(() => {
    return getStarFlyDuration({ starsGiven });
  }, [starsGiven]);

  const timeUntilTabletIsHidden = useMemo(() => {
    return getTimeUntilTabletIsHidden({ starsGiven });
  }, [starsGiven]);

  const zoomTransition =
    spring({
      fps,
      frame,
      delay: starFlyDuration,
      config: {
        damping: 200,
      },
      durationInFrames: 45,
    }) -
    spring({
      fps,
      frame,
      delay: starFlyDuration + TABLET_SCENE_LENGTH,
      config: {
        damping: 200,
      },
      durationInFrames: TABLET_SCENE_HIDE_ANIMATION,
    });

  const translateX = zoomTransition * 270;
  const translateY = zoomTransition * -270;
  const scale = 1 + zoomTransition * 0.5;

  return (
    <AbsoluteFill>
      <StarsGiven
        showBackground={showBackground}
        showHitWindow={showHitWindow}
        starsGiven={starsGiven}
        showCockpit={showCockpit}
        showDots={showDots}
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          opacity: 1 - zoomTransition * 0.7,
        }}
        topWeekday={topWeekday}
        topHour={topHour}
        graphData={graphData}
        accentColor={accentColor}
        totalPullRequests={totalPullRequests}
        login={login}
        sampleStarredRepos={sampleStarredRepos}
        timeUntilTabletIsHidden={timeUntilTabletIsHidden}
      />
      <Sequence from={starFlyDuration}>
        <Tablet
          weekday={topWeekday}
          enterProgress={zoomTransition}
          graphData={graphData}
          hour={topHour}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
