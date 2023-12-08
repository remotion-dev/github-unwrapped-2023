import { prefetch } from "remotion";
import type { Planet, Rocket } from "../src/config";
import { getIssuesSoundsToPrefetch } from "./Issues";
import { getMainAssetsToPrefetch } from "./Main";
import { getOpeningAssetsToPrefetch } from "./Opening";
import { getProductivityAssetToPrefetch } from "./Productivity/Productivity";
import { getSevenSegmentAssetsToPrefetch } from "./SevenSegment/SevenSegmentNumber";
import { getSideRocketSource } from "./Spaceship";
import { starsAssetsToPreload } from "./StarsGiven/Star";
import { getFrontRocketSource } from "./TopLanguages/svgs/FrontRocketSource";

const collectAllAssetsToPrefetch = ({
  rocket,
  planetType,
  durationInFrames,
}: {
  rocket: Rocket;
  planetType: Planet;
  durationInFrames: number;
}): string[] => {
  const sideRocket = getSideRocketSource(rocket);
  const frontRocket = getFrontRocketSource(rocket);

  return [
    sideRocket,
    frontRocket,
    ...getMainAssetsToPrefetch(durationInFrames, rocket),
    ...getOpeningAssetsToPrefetch(rocket),
    ...getIssuesSoundsToPrefetch(),
    ...starsAssetsToPreload(),
    ...getProductivityAssetToPrefetch(),
    // TODO: Landing assets
    ...getSevenSegmentAssetsToPrefetch(),
  ];
};

export const prefetchAllAssets = ({
  rocket,
  onProgress,
  onError,
  planetType,
  durationInFrames,
}: {
  rocket: Rocket;
  planetType: Planet;
  durationInFrames: number;
  onProgress: (percentage: number) => void;
  onError: (error: Error) => void;
}) => {
  const assets = collectAllAssetsToPrefetch({
    rocket,
    planetType,
    durationInFrames,
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
