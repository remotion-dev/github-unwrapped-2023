export type Issues = {
  closed: number;
  open: number;
};

export type TopLanguage = {
  color: string | null;
  name: string;
};

export type PullRequest = {
  uniqueId: string;
  title: string;
  organization: string;
  repository: string;
};

export type GitHubResponse = {
  openIssues: { totalCount: number };
  closedIssues: { totalCount: number };
  avatarUrl: string;
  login: string;
};
