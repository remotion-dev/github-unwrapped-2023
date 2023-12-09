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

  await insertProfileStats(stats);
  return stats;
};
