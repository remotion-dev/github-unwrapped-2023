// organize-imports-ignore
import React from "react";
import { renderToString } from "react-dom/server";

const makeAppHead = (username: string | null) => {
  if (username === null) {
    const title = `#GitHubUnwrapped 2023`;
    return renderToString(<title>{title}</title>);
  }

  const usernameTitle = `${username}'s #GitHubUnwrapped`;
  const head = renderToString(<title>{usernameTitle}</title>);
  return head;
};

export const replaceAppHead = (username: string | null, html: string) => {
  return html.replace("<!--app-head-->", makeAppHead(username));
};
