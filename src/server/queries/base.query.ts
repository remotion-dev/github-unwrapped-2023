import { YEAR_TO_REVIEW } from "../../helpers/year.js";

export const baseQuery = `
openIssues: issues(filterBy: {since: "${YEAR_TO_REVIEW}-01-01T00:00:00.000Z"}, states: OPEN) {
	totalCount
}
closedIssues: issues(filterBy: {since: "${YEAR_TO_REVIEW}-01-01T00:00:00.000Z"}, states: CLOSED) {
	totalCount
}
avatarUrl
login
contributionsCollection(
	from: "${YEAR_TO_REVIEW}-01-01T00:00:00.000Z"
	to: "${YEAR_TO_REVIEW + 1}-01-01T00:00:00.000Z"
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
		weeks {
			contributionDays {
			  contributionCount
			  date
			}
		}  
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
			languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
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
`;

export type BaseQueryResponse = {
  openIssues: { totalCount: number };
  closedIssues: { totalCount: number };
  avatarUrl: string;
  login: string;
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          contributionCount: number;
          date: string;
        }[];
      }[];
    };
    commitContributionsByRepository: Array<{
      repository: {
        languages: {
          edges: Array<{
            size: number;
            node: {
              color: string | null;
              name: string;
              id: string;
            };
          }>;
        };
      };
    }>;
  };
};
