import { YEAR_TO_REVIEW } from "../../helpers/year.js";
import type { Commit, commits } from "./commits.js";

type CommitsApiResponse = typeof commits;

export const mapApiResponseToCommits = (
  commitApiResponse: CommitsApiResponse,
): Commit[] => {
  return commitApiResponse.items
    .map((commit): Commit | null => {
      if (!commit.author) {
        return null;
      }

      const { date } = commit.commit.author;
      if (!date.startsWith(String(YEAR_TO_REVIEW))) {
        return null;
      }

      const hour = date.match(/T([0-9]+)/);
      if (!hour) {
        return null;
      }

      return {
        author: commit.author.login,
        date: new Date(commit.commit.author.date).getTime(),
        hour: Number(hour[1]),
        message: commit.commit.message,
        repo: commit.repository.owner.login + "/" + commit.repository.name,
        fork: commit.repository.fork,
      };
    })
    .filter(Boolean) as Commit[];
};
