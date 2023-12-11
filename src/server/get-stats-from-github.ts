import type { Hour, ProfileStats } from "../config.js";
import { getMostProductive } from "./commits/commits.js";
import { getTimesOfDay } from "./commits/get-times-of-day.js";
import { getALotOfGithubCommits } from "./commits/github-commits.js";
import { executeGitHubGraphQlQuery } from "./fetch-stats.js";
import { getMorePullRequests } from "./get-more-pull-requests.js";
import { getMoreStars } from "./get-more-stars.js";
import type { BaseQueryResponse } from "./queries/base.query.js";
import { baseQuery } from "./queries/base.query.js";
import { getQuery } from "./queries/query.js";

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
}): Promise<ProfileStats | null> => {
  const fetchedAt = Date.now();

  const baseData = (await executeGitHubGraphQlQuery({
    username,
    token,
    query: getQuery(username, baseQuery),
  })) as BaseQueryResponse | null;
  if (baseData === null) {
    return baseData;
  }

  const [commits, morePullRequests, stars] = await Promise.all([
    username
      ? getALotOfGithubCommits(username, token)
      : getALotOfGithubCommits(baseData.login, token),
    getMorePullRequests({ username, token }),
    getMoreStars({ token, username }),
  ]);

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
    totalPullRequests: morePullRequests.length,
    topLanguages,
    totalStars: stars.length,
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
    sampleStarredRepos: stars.map((s) => s.name),
    allWeekdays: productivity.days,
  };
};
