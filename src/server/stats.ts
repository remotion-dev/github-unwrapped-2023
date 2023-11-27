export type GitHubResponse = {
  openIssues: { totalCount: number };
  closedIssues: { totalCount: number };
  avatarUrl: string;
  login: string;
};
