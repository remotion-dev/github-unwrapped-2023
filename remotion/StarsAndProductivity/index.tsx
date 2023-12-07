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
import { PULL_REQUESTS_DURATION } from "../Paths/PullRequests";
import { TABLET_SCENE_LENGTH, Tablet } from "../Productivity/Tablet";
import type { starsGivenSchema } from "../StarsGiven";
import { StarsGiven, getStarFlyDuration } from "../StarsGiven";

const TABLET_SCENE_HIDE_ANIMATION = 45;
const TABLET_ENTER_DURATION = 45;

export const getTimeUntilTabletHides = ({
  starsGiven,
}: {
  starsGiven: number;
}) => {
  return getStarFlyDuration({ starsGiven }) + TABLET_SCENE_LENGTH;
};

export const getStarsAndProductivityDuration = ({
  starsGiven,
}: {
  starsGiven: number;
}) => {
  return getTimeUntilTabletHides({ starsGiven }) + PULL_REQUESTS_DURATION;
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
  showBackground,
  showCockpit,
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

  const timeUntilTabletHides = useMemo(() => {
    return getTimeUntilTabletHides({ starsGiven });
  }, [starsGiven]);

  const zoomTransition =
    spring({
      fps,
      frame,
      delay: starFlyDuration,
      config: {
        damping: 200,
      },
      durationInFrames: TABLET_ENTER_DURATION,
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

  const style: React.CSSProperties = useMemo(() => {
    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 1 - zoomTransition * 0.7,
    };
  }, [translateX, translateY, scale, zoomTransition]);

  const timeUntilTabletIsEntered = starFlyDuration + TABLET_SCENE_LENGTH;

  return (
    <AbsoluteFill>
      <StarsGiven
        showBackground={showBackground}
        starsGiven={starsGiven}
        showCockpit={showCockpit}
        style={style}
        topWeekday={topWeekday}
        topHour={topHour}
        graphData={graphData}
        accentColor={accentColor}
        totalPullRequests={totalPullRequests}
        login={login}
        sampleStarredRepos={sampleStarredRepos}
        timeUntilTabletHides={timeUntilTabletHides}
        timeUntilTabletEnters={timeUntilTabletIsEntered}
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
