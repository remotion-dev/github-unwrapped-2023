import {
  getProfileStatsFromCache,
  insertProfileStats,
  type ProfileStats,
} from "./db.js";
import { sendDiscordMessage } from "./discord.js";
import { baseQuery, BaseQueryResponse } from "./queries/base.query.js";
import {
  pullRequestQuery,
  PullRequestQueryResponse,
} from "./queries/pull-request.query.js";
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

  console.log(loggedInWithGitHub);

  const baseData = await fetchFromGitHub<BaseQueryResponse>({
    username,
    token,
  })(baseQuery);

  let pullRequestData: Array<{ title: string; createdAt: string }> = [];

  let done = false;
  let cursor = undefined;

  while (!done) {
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
  }

  const topLanguages = Object.entries(
    baseData.contributionsCollection.commitContributionsByRepository.reduce(
      (acc, i) => ({
        ...acc,
        ...i.repository.languages.edges
          .filter(
            (e) => !NOT_LANGUAGES.includes(e.node.name.toLocaleLowerCase()),
          )
          .reduce(
            (acc2, l) => ({
              ...acc2,
              [l.node.name]: {
                color: l.node.color,
                value: l.size + acc[l.node.name]?.value || 0,
              },
            }),
            {} as Record<string, { color: string; value: number }>,
          ),
      }),
      {} as Record<string, { color: string; value: number }>,
    ),
  )
    .sort((a, b) => b[1].value - a[1].value)
    .map((i) => ({
      name: i[0],
      color: i[1].color,
    }))
    .slice(0, 3);

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

  const stats = await getStatsFromGitHub({
    loggedInWithGitHub: false,
    token,
    username,
  });

  await insertProfileStats(stats);
  return stats;
};
