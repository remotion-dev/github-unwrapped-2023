export const pullRequestQuery = (cursor?: string) => `
  pullRequests(first: 100, orderBy: { field: CREATED_AT, direction: DESC } ${
    cursor ? `, after: "${cursor}"` : ""
  }) {
    totalCount
    nodes {
      title
      createdAt
    }
      pageInfo{
          startCursor
          endCursor
        }
  }
`;

export type PullRequestQueryResponse = {
  pullRequests: {
    pageInfo: {
      startCursor: string;
      endCursor: string;
    };
    nodes: Array<{
      title: string;
      createdAt: string;
    }>;
  };
};
