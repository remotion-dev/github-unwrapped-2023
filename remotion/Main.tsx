import React from "react";
import { AbsoluteFill } from "remotion";
import { Issues } from "./Issues";

export const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      {/**
       * TODO: Hardcoded
       */}
      <Issues openIssues={10} closedIssues={10} />
    </AbsoluteFill>
  );
};
