import {
  renderStillOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { TIMEOUT } from "dns";
import type { z } from "zod";
import type { ProfileStats, ogImageSchema } from "../config.js";
import { DISK, RAM, SITE_NAME, parseTopLanguage } from "../config.js";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import { saveOgImage } from "./db.js";
import { getRandomRegion } from "./render.js";

export const makeOgImage = async (profileStats: ProfileStats) => {
  const functionName = speculateFunctionName({
    diskSizeInMb: DISK,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
  });

  const schema: z.infer<typeof ogImageSchema> = {
    pullRequests: profileStats.totalPullRequests,
    contributionData: profileStats.graphData.map((d) => d.productivity),
    issues: profileStats.closedIssues,
    login: profileStats.username,
    stars: profileStats.totalStars,
    topLanguage: profileStats.topLanguages[0]
      ? parseTopLanguage(profileStats.topLanguages[0])
      : null,
    weekdays: profileStats.allWeekdays,
  };

  const account = getRandomAwsAccount();
  const region = getRandomRegion();

  setEnvForKey(account);

  const { url } = await renderStillOnLambda({
    composition: "OgImage",
    functionName,
    imageFormat: "jpeg",
    serveUrl: SITE_NAME,
    inputProps: schema,
    privacy: "public",
    region,
  });
  await saveOgImage({ url, username: profileStats.username });
  console.log("Created og:image for " + profileStats.username);

  return url;
};
