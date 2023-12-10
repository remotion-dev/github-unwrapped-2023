// organize-imports-ignore
import React from "react";
import * as Sentry from "@sentry/node";
import { renderToString } from "react-dom/server";
import { getRandomGithubToken } from "./github-token.js";
import { backendCredentials } from "../helpers/domain.js";
import { getStatsFromGitHubOrCache } from "./get-stats-from-github-or-cache.js";
import { sendDiscordMessage } from "./discord.js";

type AppHead = {
  status: number;
  head: string;
};

const makeAppHead = async (
  username: string | null,
  params: { handleUsername?: boolean; disableStats?: boolean } = {},
): Promise<AppHead> => {
  if (username === null) {
    const title = `#GitHubUnwrapped 2023 - Your coding year in review`;

    const socialPreview = `${backendCredentials().VITE_HOST}/og_image.jpg`;
    const canonical = `${backendCredentials().VITE_HOST}`;
    const description =
      "Get your personalized video of your GitHub activity in 2023.";

    return {
      status: 200,
      head: renderToString(
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
          <meta name="twitter:creator" content="@remotion" />
          <meta name="twitter:site" content="@remotion" />
        </>,
      ),
    };
  }

  if (params.disableStats) {
    const newHead = renderToString(
      <title>{`${username}'s #GitHubUnwrapped`}</title>,
    );
    return { head: newHead, status: 200 };
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
  return { head, status: stats ? 200 : 404 };
};

type AppHtml = {
  html: string;
  status: number;
};

export const replaceAppHead = async (
  username: string | null,
  html: string,
  params: { handleUsername?: boolean; disableStats?: boolean } = {},
): Promise<AppHtml> => {
  try {
    const { head, status } = await makeAppHead(username, params);
    return { html: html.replace("<!--app-head-->", head), status };
  } catch (err) {
    console.log(err);
    sendDiscordMessage(`Error rendering HTML: ${(err as Error).stack}`);
    Sentry.captureException(err);

    return {
      html: html.replace(
        "<!--app-head-->",
        renderToString(
          <>
            <title>Lost in space...</title>
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                window.__USER__ = ${null};
                window.__INTERNAL_ERROR__ = ${JSON.stringify(
                  (err as Error).stack,
                )};
                `,
              }}
            />
          </>,
        ),
      ),
      status: 500,
    };
  }
};
