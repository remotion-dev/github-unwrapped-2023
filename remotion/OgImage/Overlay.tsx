import React from "react";
import { AbsoluteFill } from "remotion";
import { BarChart } from "./BarChart";
import { GraphData } from "./GraphData";
import { Planets } from "./Planets";
import { PullRequests } from "./PullRequests";
import { Stars } from "./Stars";
import { Title } from "./Title";

export const Overlay: React.FC = () => {
  return (
    <AbsoluteFill>
      <Title />
      <Stars />
      <PullRequests />
      <Planets />
      <BarChart />
      <GraphData />
    </AbsoluteFill>
  );
};
