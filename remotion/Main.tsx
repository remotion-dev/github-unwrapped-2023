import React, { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import type { Rocket } from "../src/config";
import { type compositionSchema } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import {
  CONTRIBUTIONS_SCENE_DURATION,
  CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION,
  CONTRIBUTIONS_SCENE_EXIT_TRANSITION,
  ContributionsScene,
} from "./Contributions";
import { END_SCENE_DURATION, EndScene } from "./EndScene";
import { ISSUES_EXIT_DURATION, Issues, getIssuesDuration } from "./Issues";
import {
  OPENING_SCENE_LENGTH,
  OPENING_SCENE_OUT_OVERLAP,
  OpeningScene,
} from "./Opening";
import { isMobileDevice } from "./Opening/devices";
import {
  StarsAndProductivity,
  getStarsAndProductivityDuration,
} from "./StarsAndProductivity";
import { AllPlanets, getDurationOfAllPlanets } from "./TopLanguages/AllPlanets";
import { TOP_LANGUAGES_EXIT_DURATION } from "./TopLanguages/PlaneScaleWiggle";
import { injectFont } from "./font";

type Schema = z.infer<typeof compositionSchema>;

injectFont();

export const calculateDuration = ({
  topLanguages,
  issuesClosed,
  issuesOpened,
  starsGiven,
}: z.infer<typeof compositionSchema>) => {
  const topLanguagesScene = topLanguages
    ? getDurationOfAllPlanets({
        topLanguages,
        fps: VIDEO_FPS,
      }) - TOP_LANGUAGES_EXIT_DURATION
    : 0;

  return (
    topLanguagesScene +
    getIssuesDuration({ issuesClosed, issuesOpened }) -
    ISSUES_EXIT_DURATION +
    CONTRIBUTIONS_SCENE_DURATION -
    CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION +
    END_SCENE_DURATION -
    CONTRIBUTIONS_SCENE_EXIT_TRANSITION +
    getStarsAndProductivityDuration({ starsGiven }) +
    OPENING_SCENE_LENGTH -
    OPENING_SCENE_OUT_OVERLAP
  );
};

export const mainCalculateMetadataScene: CalculateMetadataFunction<
  z.infer<typeof compositionSchema>
> = ({ props }) => {
  return {
    durationInFrames: calculateDuration(props),
    props,
  };
};

const getMusicDuration = (durationInSeconds: number) => {
  let sec = 24;
  if (durationInSeconds < 24) return 24;

  while (sec < 57) {
    if (Math.abs(sec - durationInSeconds) <= 1) {
      return sec;
    }

    sec += 2;
  }

  return 56;
};

const getSoundtrack = (durationInFrames: number, rocket: Rocket) => {
  const FPS = 30;
  const blueThemeUrlPrefix = "/blue_theme_music/blue_theme_music_";
  const orangeThemeUrlPrefix = "/red_theme_music/red_theme_music_";
  const yellowThemeUrlPrefix = "/gold_theme_music/gold_theme_music_";
  const postfix = ".mp3";

  const prefix = {
    blue: blueThemeUrlPrefix,
    orange: orangeThemeUrlPrefix,
    yellow: yellowThemeUrlPrefix,
  };

  const durationInSecond = durationInFrames / FPS;

  const adjustedDuration = getMusicDuration(durationInSecond);
  const url = prefix[rocket] + adjustedDuration + postfix;

  return staticFile(url);
};

export const getMainAssetsToPrefetch = (
  durationInFrames: number,
  rocket: Rocket,
) => {
  return [getSoundtrack(durationInFrames, rocket)];
};

export const Main: React.FC<Schema> = ({
  corner,
  topLanguages,
  showHelperLine,
  login,
  planet,
  starsGiven,
  issuesClosed,
  issuesOpened,
  topWeekday,
  totalPullRequests,
  topHour,
  graphData,
  openingSceneStartAngle,
  accentColor,
  rocket,
  contributionData,
  sampleStarredRepos,
}) => {
  const { durationInFrames } = useVideoConfig();

  const soundTrack = useMemo(() => {
    return getSoundtrack(durationInFrames, rocket);
  }, [durationInFrames, rocket]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      <Audio src={soundTrack} />
      <Series>
        <Series.Sequence durationInFrames={OPENING_SCENE_LENGTH}>
          <OpeningScene
            accentColor={accentColor}
            startAngle={openingSceneStartAngle}
            login={login}
            rocket={rocket}
          />
        </Series.Sequence>
        {topLanguages ? (
          <Series.Sequence
            durationInFrames={getDurationOfAllPlanets({
              topLanguages,
              fps: VIDEO_FPS,
            })}
            offset={-OPENING_SCENE_OUT_OVERLAP}
          >
            <AllPlanets
              corner={corner}
              topLanguages={topLanguages}
              showHelperLine={showHelperLine}
              login={login}
              accentColor={accentColor}
              rocket={rocket}
            />
          </Series.Sequence>
        ) : null}
        <Series.Sequence
          durationInFrames={getIssuesDuration({ issuesClosed, issuesOpened })}
          offset={
            topLanguages
              ? -TOP_LANGUAGES_EXIT_DURATION
              : -OPENING_SCENE_OUT_OVERLAP
          }
        >
          <Issues
            rocket={rocket}
            openIssues={issuesOpened}
            closedIssues={issuesClosed}
          />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={getStarsAndProductivityDuration({ starsGiven })}
          offset={-ISSUES_EXIT_DURATION}
        >
          <StarsAndProductivity
            starsGiven={starsGiven}
            showBackground={false}
            showCockpit
            topWeekday={topWeekday}
            topHour={topHour}
            graphData={graphData}
            accentColor={accentColor}
            totalPullRequests={totalPullRequests}
            login={login}
            sampleStarredRepos={sampleStarredRepos}
          />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={CONTRIBUTIONS_SCENE_DURATION}
          offset={-CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION}
        >
          <ContributionsScene
            contributionData={contributionData}
            accentColor={accentColor}
          />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={END_SCENE_DURATION}
          offset={-CONTRIBUTIONS_SCENE_EXIT_TRANSITION}
        >
          <EndScene planet={planet} rocket={rocket} />
        </Series.Sequence>
      </Series>
      {isMobileDevice() ? null : (
        <Sequence from={durationInFrames - 230}>
          <Audio startFrom={170} src={staticFile("landing.mp3")} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
