export const getStarredReposQuery = (after: string | null) => {
  return `
starredRepositories(first:100,${
    after ? `after:"${after}",` : ""
  } orderBy: {field: STARRED_AT, direction: DESC}) {
    totalCount
    pageInfo {
        endCursor
    }
    edges {
        starredAt
        node {
            name
            owner {
                login
            }
        }
    }
}`;
};

export type StarredReposQueryResponse = {
  starredRepositories: {
    totalCount: number;
    pageInfo: {
      endCursor: string;
    };
    edges: Array<{
      starredAt: string;
      node: {
        name: string;
        owner: {
          login: string;
        };
      };
    }>;
  };
};
