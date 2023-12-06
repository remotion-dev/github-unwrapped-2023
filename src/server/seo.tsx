// organize-imports-ignore
import React from "react";
import { renderToString } from "react-dom/server";
import { getStatsFromGitHubOrCache } from "./fetch-stats.js";
import { getRandomGithubToken } from "./github-token.js";
import { backendCredentials } from "../helpers/domain.js";

const makeAppHead = async (username: string | null) => {
  if (username === null) {
    const title = `#GitHubUnwrapped 2023 - Your coding year in review`;

    const socialPreview = `${backendCredentials().VITE_HOST}/og_image.png`;
    const canonical = `${backendCredentials().VITE_HOST}`;
    const description =
      "Get your personalized video of your GitHub activity in 2023.";

    return renderToString(
      <>
        <title>{title}</title>
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={socialPreview} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialPreview} />
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </>,
    );
  }

  const stats = await getStatsFromGitHubOrCache({
    username,
    token: getRandomGithubToken(),
  });

  const usernameTitle = stats ? `${stats.username}'s #GitHubUnwrapped` : "404";
  const head = renderToString(
    <>
      <title>{usernameTitle}</title>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.__USER__ = ${JSON.stringify(stats)}`,
        }}
      />
    </>,
  );
  return head;
};

export const replaceAppHead = async (username: string | null, html: string) => {
  return html.replace("<!--app-head-->", await makeAppHead(username));
};
