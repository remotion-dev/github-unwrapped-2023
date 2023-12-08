import React from "react";
import type { CalculateMetadataFunction } from "remotion";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import type { z } from "zod";
import { type compositionSchema } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import {
  CONTRIBUTIONS_SCENE_DURATION,
  CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION,
  ContributionsScene,
} from "./Contributions";
import { EndScene } from "./EndScene";
import { ISSUES_EXIT_DURATION, Issues, getIssuesDuration } from "./Issues";
import {
  OPENING_SCENE_LENGTH,
  OPENING_SCENE_OUT_OVERLAP,
  OpeningScene,
} from "./Opening";
import {
  StarsAndProductivity,
  getStarsAndProductivityDuration,
} from "./StarsAndProductivity";
import { AllPlanets, getDurationOfAllPlanets } from "./TopLanguages/AllPlanets";
import { TOP_LANGUAGES_EXIT_DURATION } from "./TopLanguages/PlaneScaleWiggle";
import { injectFont } from "./font";

type Schema = z.infer<typeof compositionSchema>;

const CONTRIBUTIONS_SCENE = 7 * VIDEO_FPS;
const LANDING_SCENE = 7 * VIDEO_FPS;

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
    LANDING_SCENE +
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

const getSoundtrack = () => {
  // TODO: License
  return staticFile("smartsound-wired.mp3");
};

export const getMainAssetsToPrefetch = () => {
  return [getSoundtrack()];
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
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      <Audio src={getSoundtrack()} />
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
          durationInFrames={CONTRIBUTIONS_SCENE}
          offset={-CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION}
        >
          <ContributionsScene
            contributionData={contributionData}
            accentColor={accentColor}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={LANDING_SCENE}>
          <EndScene planet={planet} rocket={rocket} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
