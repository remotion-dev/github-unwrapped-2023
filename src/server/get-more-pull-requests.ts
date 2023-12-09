import { executeGitHubGraphQlQuery } from "./fetch-stats.js";
import type { PullRequestQueryResponse } from "./queries/pull-request.query.js";
import { pullRequestQuery } from "./queries/pull-request.query.js";
import { getQuery } from "./queries/query.js";

export const getMorePullRequests = async ({
  username,
  token,
}: {
  username: string | null;
  token: string;
}) => {
  let done = false;
  let cursor: string | null = null;
  let safety = 0;

  const pullRequestData: Array<{ createdAt: string }> = [];

  while (!done && safety < 10) {
    const data = (await executeGitHubGraphQlQuery({
      username,
      token,
      query: getQuery(username, pullRequestQuery(cursor)),
    })) as PullRequestQueryResponse;

    const prs = data.pullRequests.nodes
      .filter((n) => n.createdAt.startsWith("2023"))
      .map((n) => ({ createdAt: n.createdAt }));

    if (prs.length === 0 || prs.length !== data.pullRequests.nodes.length) {
      done = true;
    }

    pullRequestData.push(...prs);
    cursor = data.pullRequests.pageInfo.endCursor;
    safety++;
  }

  return pullRequestData;
};
