import React from "react";
import type { CalculateMetadataFunction } from "remotion";
import { AbsoluteFill, Series } from "remotion";
import type { z } from "zod";
import type { compositionSchema } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import { ContributionsScene } from "./Contributions";
import { ISSUES_EXIT_DURATION, Issues } from "./Issues";
import { LandingScene } from "./Landing";
import { PullRequests } from "./Paths/Paths";
import { StarsAndProductivity } from "./StarsAndProductivity";
import { AllPlanets, getDurationOfAllPlanets } from "./TopLanguages/AllPlanets";

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
    topLanguagesScene +
    ISSUES_SCENE -
    ISSUES_EXIT_DURATION +
    PULL_REQUESTS_SCENE +
    CONTRIBUTIONS_SCENE +
    LANDING_SCENE +
    STARS_AND_PRODUCTIVITY
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
  starsReceived,
  issuesClosed,
  issuesOpened,
}) => {
  const introScene = getDurationOfAllPlanets({
    language2,
    fps: VIDEO_FPS,
    language3,
  });

  return (
    <AbsoluteFill>
      <Series>
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
        <Series.Sequence durationInFrames={ISSUES_SCENE}>
          <Issues openIssues={issuesOpened} closedIssues={issuesClosed} />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={STARS_AND_PRODUCTIVITY}
          offset={-ISSUES_EXIT_DURATION}
        >
          <StarsAndProductivity
            starsReceived={starsReceived}
            showBackground={false}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={PULL_REQUESTS_SCENE}>
          <PullRequests />
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
