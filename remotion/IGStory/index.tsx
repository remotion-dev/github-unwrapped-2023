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

export const IgStory: React.FC<z.infer<typeof ogImageSchema>> = (props) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img src={staticFile("ig-story-background.png")} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `matrix3d(1.907027, 0.231449, 0, 0.000273, 
      -0.004041, 1.552152, 0, -0.000021, 
      0, 0, 1, 0, 
      127, 192, 0, 1)`,
          width: 466,
          height: 735,
          transformOrigin: "0 0 0",
        }}
      >
        <IgStoryContent {...props} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
