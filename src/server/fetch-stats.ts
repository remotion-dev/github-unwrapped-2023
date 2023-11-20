import type { ProfileStats } from "./db.js";
import { sendDiscordMessage } from "./discord.js";
import { getQuery } from "./query.js";

export const getAll = async (
  username: string,
  token: string
): Promise<ProfileStats> => {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: "post",
    body: JSON.stringify({ query: getQuery(username) }),
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const rateLimit = res.headers.get("x-ratelimit-remaining");
  if (Math.random() < 0.1) {
    sendDiscordMessage(`Rate limit remaining: ${rateLimit}`);
  }

  return res.json();
};
