import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import type { z } from "zod";
import type { ogImageSchema } from "../../src/config";
import { Overlay } from "./Overlay";

export const IgStoryContent: React.FC<z.infer<typeof ogImageSchema>> = ({
  issues,
  contributionData: graphData,
  stars,
  pullRequests,
  weekdays,
  login,
  topLanguage,
}) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img src={staticFile("ig-story.png")} />
      </AbsoluteFill>
      <AbsoluteFill>
        <div>
          <Overlay
            contributionData={graphData}
            issues={issues}
            login={login}
            weekdays={weekdays}
            pullRequests={pullRequests}
            stars={stars}
            topLanguage={topLanguage}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const IgStory: React.FC<z.infer<typeof ogImageSchema>> = ({}) => {
  return null;
};
