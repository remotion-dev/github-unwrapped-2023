import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import type { z } from "zod";
import type { ogImageSchema } from "../../src/config";
import { Overlay } from "./Overlay";

export const OgImage: React.FC<z.infer<typeof ogImageSchema>> = ({
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
        <Img src={staticFile("og-image-background.png")} />
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            height: 630,
            width: 1500,
            transform: `matrix3d(0.690392, 0.015822, 0, 0.00019, 
              0, 0.609524, 0, 0, 
              0, 0, 1, 0, 
              101, 88, 0, 1)`,
            transformOrigin: "0px 0px 0px",
          }}
        >
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
