export const sendDiscordMessage = async (message: string) => {
  const channel = process.env.DISCORD_CHANNEL;
  const token = process.env.DISCORD_TOKEN;
  console.log(message);
  if (!channel) {
    console.warn("no DISCORD_CHANNEL env variable set.");
    return;
  }

  if (!token) {
    console.warn("no DISCORD_TOKEN env variable set.");
    return;
  }

  try {
    await fetch(`https://discord.com/api/channels/${channel}/messages`, {
      method: "post",
      body: JSON.stringify({
        content: message,
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
