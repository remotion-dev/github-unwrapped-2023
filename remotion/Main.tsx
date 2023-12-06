import React from "react";
import type { CalculateMetadataFunction } from "remotion";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import type { z } from "zod";
import { PlanetEnum, type compositionSchema } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import { ContributionsScene } from "./Contributions";
import { GoldenScene } from "./Golden";
import { ISSUES_EXIT_DURATION, Issues, getIssuesDuration } from "./Issues";
import { LandingScene } from "./Landing";
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

type Schema = z.infer<typeof compositionSchema>;

const CONTRIBUTIONS_SCENE = 7 * VIDEO_FPS;
const LANDING_SCENE = 7 * VIDEO_FPS;

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
    CONTRIBUTIONS_SCENE +
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

export const getSoundtrack = () => {
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
            showHitWindow={false}
            showCockpit
            showDots={false}
            topWeekday={topWeekday}
            topHour={topHour}
            graphData={graphData}
            accentColor={accentColor}
            totalPullRequests={totalPullRequests}
            login={login}
            sampleStarredRepos={sampleStarredRepos}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={CONTRIBUTIONS_SCENE}>
          <ContributionsScene
            contributionData={contributionData}
            accentColor={accentColor}
          />
        </Series.Sequence>
        {planet === PlanetEnum.Enum.Gold ? (
          <Series.Sequence durationInFrames={LANDING_SCENE}>
            <GoldenScene rocket={rocket} />
          </Series.Sequence>
        ) : (
          <Series.Sequence durationInFrames={LANDING_SCENE}>
            <LandingScene
              rocketType={rocket}
              accentColor={accentColor}
              planetType={planet}
            />
          </Series.Sequence>
        )}
      </Series>
    </AbsoluteFill>
  );
};
