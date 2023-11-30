import type { Commit, commits } from "./commits.js";

type CommitsApiResponse = typeof commits;

export const mapApiResponseToCommits = (
  commitApiResponse: CommitsApiResponse,
): Commit[] => {
  return commitApiResponse.items
    .map((commit) => {
      if (!commit.author) {
        return null;
      }

      return {
        author: commit.author.login,
        date: new Date(commit.commit.author.date).getTime(),
        message: commit.commit.message,
        repo: commit.repository.owner.login + "/" + commit.repository.name,
      };
    })
    .filter(Boolean) as Commit[];
};
