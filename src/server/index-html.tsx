import type { Request, Response } from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "path";
import type { ViteDevServer } from "vite";
import { backendCredentials } from "../helpers/domain.js";
import { getProfileStatsFromCache } from "./db.js";
import { replaceAppHead } from "./seo.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
export const viteDir = path.join(rootDir, "vite");
export const publicDir = path.join(rootDir, "public");
export const viteDistDir = path.join(viteDir, "dist");

export const nodeEnv = backendCredentials().NODE_ENV;

const viteIndexHtml =
  nodeEnv === "development"
    ? path.join(viteDir, "index.html")
    : path.join(viteDistDir, "index.html");

export const indexHtmlDev = (
  vite: ViteDevServer,
  params: { handleUsername: boolean; stats: boolean },
) => {
  const index = viteIndexHtml;

  return async (req: Request, response: Response) => {
    const template = readFileSync(index, "utf-8");
    const transformed = await vite.transformIndexHtml(req.url, template);

    if (params.handleUsername) {
      const username = req.params.username || null;
      const reset = req.query.reset || null;

      if (username === null) {
        return response.redirect("/");
      }

      if (reset) {
        response.redirect(`/loading/${username}?reset=true`);
        return;
      }

      const cachedStats = await getProfileStatsFromCache(username);

      if (cachedStats === null) {
        response.redirect(`/loading/${username}`);
        return;
      }
    }

    const { html, status } = await replaceAppHead(
      req.params.username ?? null,
      transformed,
      params,
    );

    response.status(status);
    response.send(html);
    response.end();
  };
};

export const indexHtmlProduction = ({
  handleUsername,
  stats,
}: {
  handleUsername: boolean;
  stats: boolean;
}) => {
  const template = readFileSync(viteIndexHtml, "utf-8");

  return async (req: Request, response: Response) => {
    if (handleUsername) {
      const username = req.params.username || null;
      const reset = req.query.reset || null;

      if (username === null) {
        return response.redirect("/");
      }

      if (reset) {
        response.redirect(`/loading/${username}?reset=true`);
        return;
      }

      const cachedStats = await getProfileStatsFromCache(username);

      if (cachedStats === null) {
        response.redirect(`/loading/${username}`);
        return;
      }
    }

    const { html, status } = await replaceAppHead(
      req.params.username ?? null,
      template,
      { handleUsername, stats },
    );

    response.status(status);
    response.send(html);
    response.end();
  };
};
