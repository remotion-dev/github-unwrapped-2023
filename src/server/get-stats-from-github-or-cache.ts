import { getProfileStatsFromCache, insertProfileStats } from "./db.js";
import { getStatsFromGitHub } from "./get-stats-from-github.js";

export const getStatsFromGitHubOrCache = async ({
  username,
  token,
}: {
  username: string;
  token: string;
}) => {
  const fromCache = await getProfileStatsFromCache(username);
  if (fromCache !== null) {
    return fromCache;
  }

  const stats = await getStatsFromGitHub({
    loggedInWithGitHub: false,
    token,
    username,
  });

  if (stats) {
    await insertProfileStats({
      type: "found",
      profile: stats,
      lowercasedUsername: stats.username.toLowerCase(),
    });
  } else {
    await insertProfileStats({
      lowercasedUsername: username.toLowerCase(),
      type: "not-found",
    });
  }

  return stats;
};
