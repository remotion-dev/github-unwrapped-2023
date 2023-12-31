import * as Sentry from "@sentry/node";
import react from "@vitejs/plugin-react-swc";
import bodyParser from "body-parser";
import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import serveStatic from "serve-static";
import { createServer } from "vite";
import { REDIRECT_URL_ENDPOINT } from "../helpers/redirect-url.js";
import { dashboardEndpoint } from "./dashboard.js";
import { sendDiscordMessage } from "./discord.js";
import { emailEndpoint } from "./email.js";
import { faviconEndPoint } from "./favicon.js";
import { statsEndPoint } from "./fetch-stats.js";
import {
  indexHtmlDev,
  indexHtmlProduction,
  nodeEnv,
  publicDir,
  viteDir,
  viteDistDir,
} from "./index-html.js";
import { loginEndPoint } from "./login.js";
import { renderEndPoint } from "./render.js";
import { errorEndpoint } from "./sentry-test.js";
import { igStoryImageEndpoint, socialMediaPreview } from "./social-preview.js";

const apiEndpointWrapper = (
  endpoint: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void | Response<unknown, Record<string, unknown>>> | void,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await endpoint(req, res, next);
    } catch (error) {
      const err = error as Error;
      if (nodeEnv !== "development") {
        Sentry.captureException(err);
        sendDiscordMessage(`Error: ${err.stack}`);
      }

      console.log(err);

      res.status(500).end(err.message);
    }
  };
};

const startViteDevelopmentServer = async (app: Express) => {
  const server = await createServer({
    configFile: false,
    root: viteDir,
    server: {
      middlewareMode: true,
    },
    appType: "custom",
    plugins: [react()],
    publicDir,
  });

  app.use((req, res, next) => {
    server.middlewares.handle(req, res, next);
  });

  return server;
};

export const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.post("/api/render", apiEndpointWrapper(renderEndPoint));

  app.post("/api/stats", apiEndpointWrapper(statsEndPoint));

  app.post("/api/error", apiEndpointWrapper(errorEndpoint));
  app.get("/api/dashboard", apiEndpointWrapper(dashboardEndpoint));
  app.post("/api/email", apiEndpointWrapper(emailEndpoint));
  app.get("/og/:username.jpg", apiEndpointWrapper(socialMediaPreview));
  app.get("/og/:username.jpeg", apiEndpointWrapper(socialMediaPreview));
  app.get("/ig/:username.jpg", apiEndpointWrapper(igStoryImageEndpoint));
  app.get("/ig/:username.jpeg", apiEndpointWrapper(igStoryImageEndpoint));

  app.get("/favicon.ico", apiEndpointWrapper(faviconEndPoint));
  app.get(REDIRECT_URL_ENDPOINT, apiEndpointWrapper(loginEndPoint));

  if (nodeEnv === "development") {
    const vite = await startViteDevelopmentServer(app);

    app.get(
      "/about",
      indexHtmlDev(vite, { stats: true, handleUsername: false }),
    );
    app.get(
      "/loading/:username",
      indexHtmlDev(vite, { stats: false, handleUsername: false }),
    );

    app.get(
      "/dashboard",
      indexHtmlDev(vite, { stats: false, handleUsername: false }),
    );
    app.get(
      "/:username",
      indexHtmlDev(vite, { handleUsername: true, stats: true }),
    );
    app.get(
      "/:username/share",
      indexHtmlDev(vite, { stats: true, handleUsername: false }),
    );
    app.get("*", indexHtmlDev(vite, { stats: true, handleUsername: false }));
  } else {
    app.get("/", indexHtmlProduction({ stats: true, handleUsername: false }));
    app.use(serveStatic(viteDistDir));
    app.get(
      "/about",
      indexHtmlProduction({ stats: true, handleUsername: false }),
    );

    app.get(
      "/dashboard",
      indexHtmlProduction({ stats: false, handleUsername: false }),
    );
    app.get(
      "/loading/:username",
      indexHtmlProduction({ stats: false, handleUsername: false }),
    );
    app.get(
      "/:username",
      indexHtmlProduction({ handleUsername: true, stats: true }),
    );
    app.get(
      "/:username/share",
      indexHtmlProduction({ handleUsername: false, stats: true }),
    );
    app.get("*", indexHtmlProduction({ handleUsername: false, stats: true }));
  }

  const port = process.env.PORT || 8080;

  app.listen(port);
  console.log(`Listening on http://localhost:${port}`);
};
