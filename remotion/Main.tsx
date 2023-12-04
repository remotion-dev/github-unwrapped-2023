import React from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Audio,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { z } from "zod";
import { PlanetEnum, type compositionSchema } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import { ContributionsScene } from "./Contributions";
import { GoldenScene } from "./Golden";
import { ISSUES_EXIT_DURATION, Issues } from "./Issues";
import { LandingScene } from "./Landing";
import {
  OPENING_SCENE_LENGTH,
  OPENING_SCENE_OUT_OVERLAP,
  OpeningScene,
} from "./Opening";
import { PullRequests } from "./Paths/PullRequests";
import { StarsAndProductivity } from "./StarsAndProductivity";
import { AllPlanets, getDurationOfAllPlanets } from "./TopLanguages/AllPlanets";
import { TOP_LANGUAGES_EXIT_DURATION } from "./TopLanguages/PlaneScaleWiggle";

type Schema = z.infer<typeof compositionSchema>;

const ISSUES_SCENE = 6 * VIDEO_FPS;
const PULL_REQUESTS_SCENE = 8 * VIDEO_FPS;
const CONTRIBUTIONS_SCENE = 7 * VIDEO_FPS;
const LANDING_SCENE = 7 * VIDEO_FPS;
const STARS_AND_PRODUCTIVITY = 400;

export const calculateDuration = ({
  topLanguages,
}: z.infer<typeof compositionSchema>) => {
  const topLanguagesScene = topLanguages
    ? getDurationOfAllPlanets({
        topLanguages,
        fps: VIDEO_FPS,
      }) - TOP_LANGUAGES_EXIT_DURATION
    : 0;

  return (
    topLanguagesScene +
    ISSUES_SCENE -
    ISSUES_EXIT_DURATION +
    PULL_REQUESTS_SCENE +
    CONTRIBUTIONS_SCENE +
    LANDING_SCENE +
    STARS_AND_PRODUCTIVITY +
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
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      {frame > 1460 && planet === "Gold" ? (
        <Audio src={staticFile("church_chior.mp3")} />
      ) : (
        <Audio src={staticFile("smartsound-wired.mp3")} />
      )}
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
            />
          </Series.Sequence>
        ) : null}
        <Series.Sequence
          durationInFrames={ISSUES_SCENE}
          offset={
            topLanguages
              ? -TOP_LANGUAGES_EXIT_DURATION
              : -OPENING_SCENE_OUT_OVERLAP
          }
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
            accentColor={accentColor}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={PULL_REQUESTS_SCENE}>
          <PullRequests
            accentColor={accentColor}
            totalPullRequests={totalPullRequests}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={CONTRIBUTIONS_SCENE}>
          <ContributionsScene accentColor={accentColor} />
        </Series.Sequence>
        {planet === PlanetEnum.Enum.Gold ? (
          <Series.Sequence durationInFrames={LANDING_SCENE}>
            <GoldenScene />
          </Series.Sequence>
        ) : (
          <Series.Sequence durationInFrames={LANDING_SCENE}>
            <LandingScene accentColor={accentColor} planetType={planet} />
          </Series.Sequence>
        )}
      </Series>
    </AbsoluteFill>
  );
};
