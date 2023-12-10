import { YEAR_TO_REVIEW } from "../../helpers/year.js";
import { sendDiscordMessage } from "../discord.js";
import type { Commit, commits } from "./commits.js";
import { mapApiResponseToCommits } from "./map-api-response-to-commits.js";

const RATE_LIMIT_TOKEN = "rate-limit-token";

const getGithubCommits = async (
  username: string,
  page: number,
  token: string,
) => {
  const response = await fetch(
    `https://api.github.com/search/commits?q=author:${username}%20merge:false&sort=author-date&order=desc&page=${page}&per_page=100`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    },
  );

  const rateLimit = parseInt(
    response.headers.get("x-ratelimit-remaining") as string,
    10,
  );

  if (rateLimit < 10) {
    sendDiscordMessage(`Rate limit remaining: ${rateLimit}`);
  }

  // https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api?apiVersion=2022-11-28#exceeding-the-rate-limit
  const rateLimitHit = response.status === 403 || response.status === 429;
  sendDiscordMessage("Rate limit hit");
  if (rateLimitHit) {
    throw new TypeError(RATE_LIMIT_TOKEN);
  }

  if (response.status !== 200) {
    throw new TypeError((await response.json()).message);
  }

  const json = (await response.json()) as typeof commits;
  const listOfCommits = mapApiResponseToCommits(json);
  const isDone =
    listOfCommits.length === 0 ||
    listOfCommits[listOfCommits.length - 1].date <
      new Date(`${YEAR_TO_REVIEW}-01-01`).getTime();
  return {
    commits: listOfCommits,
    isDone,
  };
};

export const getALotOfGithubCommits = async (
  username: string,
  token: string,
) => {
  const listOfCommits: Commit[] = [];

  const pages = [1, 2, 3, 4, 5];

  for (const page of pages) {
    const { commits, isDone } = await getGithubCommits(username, page, token);
    listOfCommits.push(...commits);
    if (isDone) {
      break;
    }
  }

  return listOfCommits;
};
