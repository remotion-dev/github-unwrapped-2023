import {
  renderStillOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { z } from "zod";
import type { ProfileStats, ogImageSchema } from "../config.js";
import { DISK, RAM, SITE_NAME, TIMEOUT, parseTopLanguage } from "../config.js";
import { getOgImage, saveOgImage } from "./db.js";
import { getRandomRegion } from "./render.js";

export const makeOrGetOgImage = async (profileStats: ProfileStats) => {
  const ogImage = await getOgImage(profileStats.username);
  if (ogImage) {
    return ogImage.url;
  }

  const functionName = speculateFunctionName({
    diskSizeInMb: DISK,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
  });

  const schema: z.infer<typeof ogImageSchema> = {
    pullRequests: profileStats.totalPullRequests,
    contributionData: profileStats.contributionData,
    issues: profileStats.closedIssues,
    login: profileStats.username,
    stars: profileStats.totalStars,
    topLanguage: profileStats.topLanguages[0]
      ? parseTopLanguage(profileStats.topLanguages[0])
      : null,
    weekdays: profileStats.allWeekdays,
  };

  const region = getRandomRegion();

  const { url } = await renderStillOnLambda({
    composition: "og-image",
    functionName,
    imageFormat: "jpeg",
    serveUrl: SITE_NAME,
    inputProps: schema,
    privacy: "public",
    region,
  });
  await saveOgImage({ url, username: profileStats.username });

  return url;
};
