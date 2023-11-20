export const getQuery = (username: string) => {
  return `{
		user(login: "${username}") {
			openIssues: issues(filterBy: {since: "2022-01-01T00:00:00.000Z"}, states: OPEN) {
				totalCount
			}
			closedIssues: issues(filterBy: {}, states: CLOSED) {
				totalCount
			}
			avatarUrl
			login
			mostRecentPullRequest: pullRequests(
				first: 1,
				orderBy: {field: CREATED_AT, direction: DESC}
			) {
				nodes {
					title
					repository {
						name
						owner {
							login
						}
					}
				}
			}
			contributionsCollection(
				from: "2022-01-01T00:00:00.000Z"
				to: "2023-01-01T00:00:00.000Z"
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
		}
	}
`.trim();
};
