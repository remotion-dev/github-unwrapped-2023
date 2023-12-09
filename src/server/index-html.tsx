import * as Sentry from "@sentry/node";
import type { Request, Response } from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "path";
import type { ViteDevServer } from "vite";
import { backendCredentials } from "../helpers/domain.js";
import { getProfileStatsFromCache } from "./db.js";
import { sendDiscordMessage } from "./discord.js";
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

export const handleIndexHtmlDev = (
  vite: ViteDevServer,
  handleUsername = false,
) => {
  const index = viteIndexHtml;

  return async (req: Request, response: Response) => {
    const template = readFileSync(index, "utf-8");
    try {
      const transformed = await vite.transformIndexHtml(req.url, template);

      if (handleUsername) {
        const username = req.params.username || null;

        if (username === null) {
          return response.redirect("/");
        }

        const cachedStats = await getProfileStatsFromCache(username);

        if (!cachedStats) {
          response.redirect(`/loading/${username}`);
          return;
        }
      }

      response.status(200);
      response.send(
        await replaceAppHead(req.params.username ?? null, transformed),
      );
    } catch (err) {
      vite.ssrFixStacktrace(err as Error);
      console.error(err);
      response.status(500).end((err as Error).message);
    }
  };
};

export const handleIndexHtmlProduction = () => {
  const template = readFileSync(viteIndexHtml, "utf-8");

  return async (req: Request, response: Response) => {
    try {
      response.status(200);
      const head = await replaceAppHead(req.params.username ?? null, template);
      response.send(head);
      response.end();
    } catch (err) {
      Sentry.captureException(err);
      sendDiscordMessage(`Error occurred:\n> ${(err as Error).stack}`);
      // TODO: Improve this
      response.status(500).end((err as Error).message);
    }
  };
};
