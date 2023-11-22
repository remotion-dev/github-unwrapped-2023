import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { ContributionsScene } from "./Contributions";
import { Issues } from "./Issues";
import { PullRequests } from "./Paths/Paths";
import { StarsReceived } from "./StarsReceived";
import { TopLanguagesCamera } from "./TopLanguages";

export const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={15 * 30}>
          <TopLanguagesCamera first="Java" second="JavaScript" third="Python" />
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
