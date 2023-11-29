export const baseQuery = `
openIssues: issues(filterBy: {since: "2023-01-01T00:00:00.000Z"}, states: OPEN) {
	totalCount
}
closedIssues: issues(filterBy: {since: "2023-01-01T00:00:00.000Z"}, states: CLOSED) {
	totalCount
}
avatarUrl
login
contributionsCollection(
	from: "2023-01-01T00:00:00.000Z"
	to: "2024-01-01T00:00:00.000Z"
) {
	totalCommitContributions
	restrictedContributionsCount
	totalIssueContributions
	totalCommitContributions
	totalRepositoryContributions
	totalPullRequestContributions
	totalPullRequestReviewContributions
	popularPullRequestContribution {
		pullRequest {
			id
			title
			repository {
				name
				owner {
					login
				}
			}
		}
	}
	contributionCalendar {
		totalContributions
	}
	commitContributionsByRepository {
		contributions {
			totalCount
		}
		repository {
			name
			owner {
				login
			}
			languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
				edges {
					size
					node {
						color
						name
						id
					}
				}
			}
		}
	}
}
starredRepositories(first:100, orderBy: {field: STARRED_AT, direction: DESC}) {
	edges {
		starredAt
		cursor
		node {
			name
			owner {
				login
			}
		}
	}
}
`;

export type BaseQueryResponse = {
  openIssues: { totalCount: number };
  closedIssues: { totalCount: number };
  avatarUrl: string;
  login: string;
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
    commitContributionsByRepository: Array<{
      repository: {
        languages: {
          edges: Array<{
            size: number;
            node: {
              color: string;
              name: string;
              id: string;
            };
          }>;
        };
      };
    }>;
  };

  starredRepositories: {
    edges: Array<{
      starredAt: string;
    }>;
  };
  sponsoring: {
    nodes: Array<unknown>;
  };
};
