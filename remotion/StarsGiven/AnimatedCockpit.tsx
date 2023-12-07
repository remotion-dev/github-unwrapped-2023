import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { AccentColor } from "../../src/config";
import { PullRequests } from "../Paths/PullRequests";
import { AmountOfStarsDisplay } from "./AmountOfStarsDisplay";
import CockpitSVG from "./CockpitSVG";
import { CockpitRightScreen } from "./CustomScreen";
import type { RepoText } from "./HeadsUpDisplay";
import { HeadsUpDisplay } from "./HeadsUpDisplay";
import { CockpitLeftScreen } from "./LeftScreenCockpit";
import { ShinyStarOutline } from "./ShinyStarOutline";

export const TRANSITION_TO_PULL_REQUESTS = 20;

export const AnimatedCockpit: React.FC<{
  xShake: number;
  yShake: number;
  rotationShake: number;
  accentColor: AccentColor;
  totalPullRequests: number;
  repoText: RepoText | null;
  starCount: number;
  totalStarCount: number;
  durationOfStars: number;
  timeUntilTabletIsHidden: number;
}> = ({
  xShake,
  yShake,
  rotationShake,
  accentColor,
  totalPullRequests,
  repoText,
  starCount,
  totalStarCount,
  durationOfStars,
  timeUntilTabletIsHidden,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const entryProgress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const distance = interpolate(entryProgress, [0, 1], [0.000000005, 1], {});
  const scaleDivided = 1 / distance;

  const shake: React.CSSProperties = useMemo(() => {
    return {
      scale: String(scaleDivided),
      transform: `rotate(${rotationShake}rad) scale(${
        // +0.05 so noise doesn't cut off
        scaleDivided + 0.05
      }) translate(${xShake}px, ${yShake}px)`,
    };
  }, [rotationShake, scaleDivided, xShake, yShake]);

  const durationOfStarsWithShake = durationOfStars + 30;

  return (
    <AbsoluteFill style={shake}>
      <Sequence from={timeUntilTabletIsHidden}>
        <PullRequests
          accentColor={accentColor}
          totalPullRequests={totalPullRequests}
        />
      </Sequence>
      <Sequence durationInFrames={durationOfStarsWithShake}>
        <HeadsUpDisplay textToDisplay={repoText} />
      </Sequence>
      <CockpitSVG />
      <CockpitLeftScreen>
        <AmountOfStarsDisplay
          starCount={starCount}
          totalStarCount={totalStarCount}
        />
      </CockpitLeftScreen>
      <CockpitRightScreen>
        <ShinyStarOutline />
      </CockpitRightScreen>
    </AbsoluteFill>
  );
};
