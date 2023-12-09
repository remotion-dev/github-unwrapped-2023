import { prefetch } from "remotion";
import type { Planet, Rocket, TopLanguage } from "../src/config";
import { prefetchLandingAssets } from "./EndScene";
import { getIssuesSoundsToPrefetch } from "./Issues";
import { getMainAssetsToPrefetch } from "./Main";
import { getOpeningAssetsToPrefetch } from "./Opening";
import { getProductivityAssetToPrefetch } from "./Productivity/Productivity";
import { getSevenSegmentAssetsToPrefetch } from "./SevenSegment/SevenSegmentNumber";
import { getSideRocketSource } from "./Spaceship";
import { starsAssetsToPreload } from "./StarsGiven/Star";
import { getTopLanguageAssetsToPrefetch } from "./TopLanguages/AllPlanets";
import { getFrontRocketSource } from "./TopLanguages/svgs/FrontRocketSource";

const collectAllAssetsToPrefetch = ({
  rocket,
  planetType,
  durationInFrames,
  language1,
  language2,
  language3,
}: {
  rocket: Rocket;
  planetType: Planet;
  durationInFrames: number;
  language1: TopLanguage | null;
  language2: TopLanguage | null;
  language3: TopLanguage | null;
}): string[] => {
  const sideRocket = getSideRocketSource(rocket);
  const frontRocket = getFrontRocketSource(rocket);

  return [
    sideRocket,
    frontRocket,
    ...getMainAssetsToPrefetch(durationInFrames, rocket),
    ...getTopLanguageAssetsToPrefetch({ language1, language2, language3 }),
    ...getOpeningAssetsToPrefetch(rocket),
    ...getIssuesSoundsToPrefetch(),
    ...starsAssetsToPreload(),
    ...getProductivityAssetToPrefetch(),
    ...getSevenSegmentAssetsToPrefetch(),
    ...prefetchLandingAssets(planetType),
  ];
};

export const prefetchAllAssets = ({
  rocket,
  onProgress,
  onError,
  planetType,
  durationInFrames,
  language1,
  language2,
  language3,
}: {
  rocket: Rocket;
  planetType: Planet;
  durationInFrames: number;
  onProgress: (percentage: number) => void;
  onError: (error: Error) => void;
  language1: TopLanguage | null;
  language2: TopLanguage | null;
  language3: TopLanguage | null;
}) => {
  const assets = collectAllAssetsToPrefetch({
    rocket,
    planetType,
    durationInFrames,
    language1,
    language2,
    language3,
  });

  let assetsLoaded = 0;

  const reportProgress = () => {
    const progress = assetsLoaded / assets.length;
    onProgress(progress);
  };

  assets.forEach((asset) => {
    prefetch(asset)
      .waitUntilDone()
      .then(() => {
        assetsLoaded++;
        reportProgress();
      })
      .catch((err) => onError(err));
  });
};
