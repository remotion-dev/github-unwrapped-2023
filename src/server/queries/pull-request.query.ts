export const pullRequestQuery = (cursor: string | null) => `
  pullRequests(first: 100, orderBy: { field: CREATED_AT, direction: DESC } ${
    cursor ? `, after: "${cursor}"` : ""
  }) {
    nodes {
      createdAt
    }
    pageInfo {
        startCursor
        endCursor
    }
  }
`;

export type PullRequestQueryResponse = {
  pullRequests: {
    pageInfo: {
      endCursor: string;
    };
    nodes: Array<{
      createdAt: string;
    }>;
  };
};
