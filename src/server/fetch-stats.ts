import type { ProfileStats } from "./db.js";
import { sendDiscordMessage } from "./discord.js";
import { getQuery } from "./query.js";
import type { GitHubResponse } from "./stats.js";

export const fetchFromGitHub = async ({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<GitHubResponse> => {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: "post",
    body: JSON.stringify({ query: getQuery(username) }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const rateLimit = res.headers.get("x-ratelimit-remaining");
  if (Math.random() < 0.1) {
    sendDiscordMessage(`Rate limit remaining: ${rateLimit}`);
  }

  const response = await res.json();
  return response.data.user as GitHubResponse;
};

export const getStatsFromGitHub = async ({
  username,
  token,
  loggedInWithGitHub,
}: {
  username: string;
  token: string;
  loggedInWithGitHub: boolean;
}): Promise<ProfileStats> => {
  const fetchedAt = Date.now();
  const data = await fetchFromGitHub({ username, token });
  return {
    closedIssues: data.closedIssues.totalCount,
    openIssues: data.openIssues.totalCount,
    fetchedAt,
    loggedInWithGitHub,
    username: data.login,
  };
};
