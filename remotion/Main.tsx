import React from "react";
import { AbsoluteFill, Series } from "remotion";
import type { z } from "zod";
import { ContributionsScene } from "./Contributions";
import { Issues } from "./Issues";
import { PullRequests } from "./Paths/Paths";
import { StarsReceived } from "./StarsReceived";
import { AllPlanets, allPlanetsSchema } from "./TopLanguages/AllPlanets";

const mainSchema = allPlanetsSchema;

export const Main: React.FC<z.infer<typeof mainSchema>> = ({
  corner,
  language1,
  language2,
  language3,
  showHelperLine,
  startRotationInRadians,
}) => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={15 * 30}>
          <AllPlanets
            corner={corner}
            language1={language1}
            language2={language2}
            language3={language3}
            showHelperLine={showHelperLine}
            startRotationInRadians={startRotationInRadians}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={5 * 30}>
          <Issues openIssues={10} closedIssues={10} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={10 * 30}>
          <StarsReceived starsReceived={10} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={15 * 30}>
          <PullRequests />
        </Series.Sequence>
        <Series.Sequence durationInFrames={10 * 30}>
          <ContributionsScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
