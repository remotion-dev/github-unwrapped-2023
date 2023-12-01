import React from "react";
import type { CalculateMetadataFunction } from "remotion";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import type { z } from "zod";
import type { compositionSchema } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import { ContributionsScene } from "./Contributions";
import { ISSUES_EXIT_DURATION, Issues } from "./Issues";
import { LandingScene } from "./Landing";
import { OPENING_SCENE_LENGTH, OpeningScene } from "./Opening";
import { PullRequests } from "./Paths/Paths";
import { StarsAndProductivity } from "./StarsAndProductivity";
import { AllPlanets, getDurationOfAllPlanets } from "./TopLanguages/AllPlanets";
import { ALL_PLANETS_EXIT_DURATION } from "./TopLanguages/PlaneScaleWiggle";

type Schema = z.infer<typeof compositionSchema>;

const ISSUES_SCENE = 6 * VIDEO_FPS;
const PULL_REQUESTS_SCENE = 8 * VIDEO_FPS;
const CONTRIBUTIONS_SCENE = 7 * VIDEO_FPS;
const LANDING_SCENE = 7 * VIDEO_FPS;
const STARS_AND_PRODUCTIVITY = 400;

export const calculateDuration = ({
  language2,
  language3,
}: z.infer<typeof compositionSchema>) => {
  const topLanguagesScene = getDurationOfAllPlanets({
    language2,
    fps: VIDEO_FPS,
    language3,
  });

  return (
    topLanguagesScene -
    ALL_PLANETS_EXIT_DURATION +
    ISSUES_SCENE -
    ISSUES_EXIT_DURATION +
    PULL_REQUESTS_SCENE +
    CONTRIBUTIONS_SCENE +
    LANDING_SCENE +
    STARS_AND_PRODUCTIVITY +
    OPENING_SCENE_LENGTH
  );
};

export const mainCalculateMetadataScene: CalculateMetadataFunction<
  z.infer<typeof compositionSchema>
> = ({ props }) => {
  return {
    durationInFrames: calculateDuration(props),
  };
};

export const Main: React.FC<Schema> = ({
  corner,
  language1,
  language2,
  language3,
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
}) => {
  const introScene = getDurationOfAllPlanets({
    language2,
    fps: VIDEO_FPS,
    language3,
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartsound-wired.mp3")} />
      <Series>
        <Series.Sequence durationInFrames={OPENING_SCENE_LENGTH}>
          <OpeningScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={introScene}>
          <AllPlanets
            corner={corner}
            language1={language1}
            language2={language2}
            language3={language3}
            showHelperLine={showHelperLine}
            login={login}
          />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={ISSUES_SCENE}
          offset={-ALL_PLANETS_EXIT_DURATION}
        >
          <Issues openIssues={issuesOpened} closedIssues={issuesClosed} />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={STARS_AND_PRODUCTIVITY}
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
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={PULL_REQUESTS_SCENE}>
          <PullRequests totalPullRequests={totalPullRequests} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={CONTRIBUTIONS_SCENE}>
          <ContributionsScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={LANDING_SCENE}>
          <LandingScene planetType={planet} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
