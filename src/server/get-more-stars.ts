import { fetchFromGitHub } from "./fetch-stats.js";
import { getQuery } from "./queries/query.js";
import {
  getStarredReposQuery,
  type StarredReposQueryResponse,
} from "./queries/stars.query.js";

export const getMoreStars = async ({
  username,
  token,
}: {
  username: string | null;
  token: string;
}) => {
  let done = false;
  let cursor: string | null = null;
  let safety = 0;

  const pullRequestData: Array<{ name: string }> = [];

  while (!done && safety < 10) {
    const data = (await fetchFromGitHub({
      username,
      token,
      query: getQuery(username, getStarredReposQuery(cursor)),
    })) as StarredReposQueryResponse;

    const stars = data.starredRepositories.edges
      .filter((n) => n.starredAt.startsWith("2023"))
      .map((n) => ({ name: n.node.name }));

    if (
      stars.length === 0 ||
      stars.length !== data.starredRepositories.edges.length
    ) {
      done = true;
    }

    pullRequestData.push(...stars);
    cursor = data.starredRepositories.pageInfo.endCursor;
    safety++;
  }

  return pullRequestData;
};
