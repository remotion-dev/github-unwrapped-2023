import { backendCredentials } from "../helpers/domain.js";
import { nodeEnv } from "./index-html.js";

export const sendDiscordMessage = async (message: string) => {
  const channel = backendCredentials().DISCORD_CHANNEL;
  const token = backendCredentials().DISCORD_TOKEN;
  if (nodeEnv === "development") {
    console.log(message);
  } else {
    console.log("sending discord message");
  }

  try {
    await fetch(`https://discord.com/api/channels/${channel}/messages`, {
      method: "post",
      body: JSON.stringify({
        content: `${backendCredentials().VITE_HOST} -${message}`,
        allowed_mentions: {},
        // eslint-disable-next-line no-bitwise
        flags: 1 << 2,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${token}`,
      },
    });
  } catch (err) {
    console.log("failed to send discord message");
    console.log(err);
  }
};
