import React from "react";
import { AbsoluteFill } from "remotion";
import type { TopLanguage } from "../../src/config";
import { BarChart } from "./BarChart";
import { ContributionGraphic } from "./GraphData";
import { Issues } from "./Issues";
import { Planets } from "./Planets";
import { PullRequests } from "./PullRequests";
import { Stars } from "./Stars";
import { Title } from "./Title";

export const Overlay: React.FC<{
  issues: number;
  contributionData: number[];
  weekdays: number[];
  pullRequests: number;
  stars: number;
  login: string;
  topLanguage: TopLanguage;
}> = ({
  issues,
  contributionData,
  weekdays,
  pullRequests,
  stars,
  login,
  topLanguage,
}) => {
  return (
    <AbsoluteFill>
      <Title login={login} />
      <Stars stars={stars} />
      <PullRequests pullRequests={pullRequests} />
      <Planets topLanguage={topLanguage} />
      <BarChart graphData={weekdays} />
      <ContributionGraphic graphData={contributionData} />
      <Issues issues={issues} />
    </AbsoluteFill>
  );
};
