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
  cache: boolean;
};

const makeAppHead = async (
  username: string | null,
  params: { handleUsername: boolean; stats: boolean },
): Promise<AppHead> => {
  if (username === null) {
    const title = `#GitHubUnwrapped 2023 - Your coding year in review`;

    const mainSocialPreview = `${backendCredentials().VITE_HOST}/og_image.jpg`;
    const mainCanonical = `${backendCredentials().VITE_HOST}`;
    const mainDescription =
      "Get your personalized video of your GitHub activity in 2023.";

    return {
      status: 200,
      cache: true,
      head: renderToString(
        <>
          <title>{title}</title>
          <meta property="og:url" content={mainCanonical} />
          <meta property="og:image" content={mainSocialPreview} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={mainDescription} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={mainSocialPreview} />
          <meta name="description" content={mainDescription} />
          <link rel="canonical" href={mainCanonical} />
          <meta name="twitter:creator" content="@remotion" />
          <meta name="twitter:site" content="@remotion" />
        </>,
      ),
    };
  }

  if (!params.stats) {
    const newHead = renderToString(
      <title>{`${username}'s #GitHubUnwrapped`}</title>,
    );
    return { head: newHead, status: 200, cache: true };
  }

  const stats = await getStatsFromGitHubOrCache({
    username,
    token: getRandomGithubToken(),
  });

  if (stats === "not-found") {
    const fourOhFourHead = renderToString(
      <>
        <title>404</title>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.__USER__ = ${JSON.stringify(stats)}`,
          }}
        />{" "}
      </>,
    );
    return { head: fourOhFourHead, status: 404, cache: false };
  }

  if (stats === null) {
    throw new Error(
      `Stats should not be null (${username}, ${
        backendCredentials().VITE_HOST
      })`,
    );
  }

  const usernameTitle = `${stats.username}'s #GitHubUnwrapped`;
  const canonical = `${backendCredentials().VITE_HOST}/${username}`;
  const socialPreview = `${backendCredentials().VITE_HOST}/${username}.jpg`;
  const description = `See ${username}'s year in review and get your own.`;

  const head = renderToString(
    <>
      <title>{usernameTitle}</title>
      <meta property="og:url" content={canonical} />
      <link rel="canonical" href={canonical} />
      <meta property="og:image" content={socialPreview} />
      <meta property="og:title" content={usernameTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={socialPreview} />
      <meta name="description" content={description} />
      <meta name="twitter:creator" content="@remotion" />
      <meta name="twitter:site" content="@remotion" />

      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.__USER__ = ${JSON.stringify(stats)}`,
        }}
      />
    </>,
  );
  return { head, status: 200, cache: false };
};

type AppHtml = {
  html: string;
  status: number;
  cache: boolean;
};

export const replaceAppHead = async (
  username: string | null,
  html: string,
  params: { handleUsername: boolean; stats: boolean },
): Promise<AppHtml> => {
  try {
    const { head, status, cache } = await makeAppHead(username, params);
    return { html: html.replace("<!--app-head-->", head), status, cache };
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
      cache: false,
      status: 500,
    };
  }
};
