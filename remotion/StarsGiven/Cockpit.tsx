import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AmountOfStarsDisplay } from "./AmountOfStarsDisplay";
import { Cockpit as CockpitImage } from "./CockpitSVG";
import { CockpitRightScreen } from "./CustomScreen";
import type { RepoText } from "./HeadsUpDisplay";
import { HeadsUpDisplay } from "./HeadsUpDisplay";
import { CockpitLeftScreen } from "./LeftScreenCockpit";
import { ShinyStarOutline } from "./ShinyStarOutline";

export const Cockpit: React.FC<{
  starCount: number;
  totalStarCount: number;
  repoText: RepoText | null;
  durationOfStarsWithShake: number;
}> = ({ durationOfStarsWithShake, repoText, starCount, totalStarCount }) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={durationOfStarsWithShake}>
        <HeadsUpDisplay textToDisplay={repoText} />
      </Sequence>
      <CockpitImage />
      <CockpitLeftScreen>
        <AmountOfStarsDisplay
          starCount={starCount}
          totalStarCount={totalStarCount}
        />
      </CockpitLeftScreen>
      <CockpitRightScreen>
        <ShinyStarOutline />
      </CockpitRightScreen>
    </AbsoluteFill>
  );
};
