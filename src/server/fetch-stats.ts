import type { Hour } from "../config.js";
import { getMostProductive } from "./commits/commits.js";
import { getTimesOfDay } from "./commits/get-times-of-day.js";
import { getALotOfGithubCommits } from "./commits/github-commits.js";
import {
  getProfileStatsFromCache,
  insertProfileStats,
  type ProfileStats,
} from "./db.js";
import { sendDiscordMessage } from "./discord.js";
import type { BaseQueryResponse } from "./queries/base.query.js";
import { baseQuery } from "./queries/base.query.js";
import type { PullRequestQueryResponse } from "./queries/pull-request.query.js";
import { pullRequestQuery } from "./queries/pull-request.query.js";
import { getQuery } from "./queries/query.js";

const fetchFromGitHub =
  <T extends {}>({
    username,
    token,
  }: {
    username: string | null;
    token: string;
  }) =>
  async (query: string): Promise<T> => {
    const res = await fetch(`https://api.github.com/graphql`, {
      method: "post",
      body: JSON.stringify({ query: getQuery(username)(query) }),
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
    if (response.errors) {
      throw new Error(JSON.stringify(response.errors[0].message));
    }

    if (username === null) {
      if (response.data) {
        return response.data.viewer as T;
      }

      throw new Error("Unexpected response from GitHub");
    }

    return response.data.user as T;
  };

const NOT_LANGUAGES = [
  "css",
  "html",
  "markdown",
  "dockerfile",
  "roff",
  "shell",
];

const NOT_LANGUAGES_OBJ = Object.fromEntries(
  NOT_LANGUAGES.map((l) => [l, true]),
);

export const getStatsFromGitHub = async ({
  username,
  token,
  loggedInWithGitHub,
}: {
  username: string | null;
  token: string;
  loggedInWithGitHub: boolean;
}): Promise<ProfileStats> => {
  const fetchedAt = Date.now();

  const baseData = await fetchFromGitHub<BaseQueryResponse>({
    username,
    token,
  })(baseQuery);

  const pullRequestData: Array<{ title: string; createdAt: string }> = [];

  let done = false;
  let cursor;
  let safety = 0;

  const commits = username
    ? await getALotOfGithubCommits(username, token)
    : await getALotOfGithubCommits(baseData.login, token);

  while (!done && safety < 10) {
    const data = await fetchFromGitHub<PullRequestQueryResponse>({
      username,
      token,
    })(pullRequestQuery(cursor));

    const prs = data.pullRequests.nodes
      .filter((n) => n.createdAt.startsWith("2023"))
      .map((n) => ({ title: n.title, createdAt: n.createdAt }));

    if (prs.length === 0 || prs.length !== data.pullRequests.nodes.length) {
      done = true;
    }

    pullRequestData.push(...prs);
    cursor = data.pullRequests.pageInfo.endCursor;
    safety++;
  }

  const acc: Record<string, { color: string; value: number }> = {};

  baseData.contributionsCollection.commitContributionsByRepository.forEach(
    (i) => {
      i.repository.languages.edges
        .filter((e) => !NOT_LANGUAGES_OBJ[e.node.name.toLocaleLowerCase()])
        .forEach((l) => {
          acc[l.node.name] = {
            color: l.node.color,
            value: l.size + (acc[l.node.name]?.value || 0),
          };
        });
    },
  );

  const topLanguages = Object.entries(acc)
    .sort((a, b) => b[1].value - a[1].value)
    .map((i) => ({
      languageName: i[0],
      color: i[1].color,
    }))
    .slice(0, 3);

  const productivity = getMostProductive(commits);

  const bestHours = getTimesOfDay(commits);
  const values = Object.entries(bestHours);
  const most = Math.max(...values.map((v) => v[1]));

  const mostHour = values.find(([, b]) => b === most);

  if (!mostHour) {
    throw new Error("No most hour");
  }

  const graphData = Object.entries(getTimesOfDay(commits)).map(
    ([key, entry]) => {
      return {
        productivity: entry,
        time: Number(key),
      };
    },
  );

  const allDays = baseData.contributionsCollection.contributionCalendar.weeks
    .map((w) => w.contributionDays)
    .flat(1)
    .filter((d) => d.date.startsWith("2023"));

  return {
    totalPullRequests: pullRequestData.length,
    topLanguages,
    totalStars: baseData.starredRepositories.edges.length,
    totalContributions:
      baseData.contributionsCollection.contributionCalendar.totalContributions,
    closedIssues: baseData.closedIssues.totalCount,
    openIssues: baseData.openIssues.totalCount,
    fetchedAt,
    loggedInWithGitHub,
    username: baseData.login,
    lowercasedUsername: baseData.login.toLowerCase(),
    bestHours: getTimesOfDay(commits),
    topWeekday: productivity.most,
    topHour: String(mostHour[0]) as Hour,
    graphData,
    contributionData: allDays.map((d) => d.contributionCount),
    sampleStarredRepos: baseData.starredRepositories.edges.map(
      (e) => `${e.node.name}`,
    ),
  };
};

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

  try {
    const stats = await getStatsFromGitHub({
      loggedInWithGitHub: false,
      token,
      username,
    });

    await insertProfileStats(stats);
    return stats;
  } catch (e) {
    return null;
  }
};
