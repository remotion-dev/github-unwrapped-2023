// organize-imports-ignore
import React from "react";
import { renderToString } from "react-dom/server";
import { getStatsFromGitHub } from "./fetch-stats.js";
import { getRandomGithubToken } from "./github-token.js";

const makeAppHead = async (username: string | null) => {
  if (username === null) {
    const title = `#GitHubUnwrapped 2023`;
    return renderToString(<title>{title}</title>);
  }

  const stats = await getStatsFromGitHub({
    username,
    token: getRandomGithubToken(),
    // TODO: Use GitHub login token if possible
    loggedInWithGitHub: false,
  });

  const usernameTitle = `${stats.username}'s #GitHubUnwrapped`;
  const head = renderToString(
    <>
      <title>{usernameTitle}</title>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.__USER__ = ${JSON.stringify(stats)}`,
        }}
      />
    </>
  );
  return head;
};

export const replaceAppHead = async (username: string | null, html: string) => {
  return html.replace("<!--app-head-->", await makeAppHead(username));
};
