import { prefetch } from "remotion";
import type { Planet, Rocket } from "../src/config";
import { getIssuesSoundsToPrefetch } from "./Issues";
import { getLandingAssetsToPrefetch } from "./Landing";
import { getMainAssetsToPrefetch } from "./Main";
import { getOpeningAssetsToPrefetch } from "./Opening";
import { getProductivityAssetToPrefetch } from "./Productivity/Productivity";
import { getSideRocketSource } from "./Spaceship";
import { starsAssetsToPreload } from "./StarsGiven/Star";
import { getFrontRocketSource } from "./TopLanguages/svgs/FrontRocketSource";

export const collectAllAssetsToPrefetch = ({
  rocket,
  planetType,
}: {
  rocket: Rocket;
  planetType: Planet;
}): string[] => {
  const sideRocket = getSideRocketSource(rocket);
  const frontRocket = getFrontRocketSource(rocket);

  return [
    sideRocket,
    frontRocket,
    ...getMainAssetsToPrefetch(),
    ...getOpeningAssetsToPrefetch(rocket),
    ...getIssuesSoundsToPrefetch(),
    ...starsAssetsToPreload(),
    ...getProductivityAssetToPrefetch(),
    ...getLandingAssetsToPrefetch({ planetType }),
  ];
};

export const prefetchAllAssets = ({
  rocket,
  onProgress,
  onError,
  planetType,
}: {
  rocket: Rocket;
  planetType: Planet;
  onProgress: (percentage: number) => void;
  onError: (error: Error) => void;
}) => {
  const assets = collectAllAssetsToPrefetch({ rocket, planetType });

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
