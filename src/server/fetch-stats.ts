import { sendDiscordMessage } from "./discord.js";

export const executeGitHubGraphQlQuery = async ({
  username,
  token,
  query,
}: {
  username: string | null;
  token: string;
  query: string;
}) => {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: "post",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const rateLimit = res.headers.get("x-ratelimit-remaining");

  if (Math.random() < 0.1) {
    sendDiscordMessage(`Rate limit remaining: ${rateLimit}`);
  }

  const response = await res.json();
  if (response.errors) {
    throw new Error(JSON.stringify(response.errors[0].message));
  }

  if (username === null) {
    if (response.data) {
      return response.data.viewer;
    }

    throw new Error("Unexpected response from GitHub");
  }

  return response.data.user;
};
