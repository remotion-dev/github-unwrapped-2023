import react from "@vitejs/plugin-react-swc";
import bodyParser from "body-parser";
import type { Express } from "express";
import express from "express";
import serveStatic from "serve-static";
import { createServer } from "vite";
import { REDIRECT_URL_ENDPOINT } from "../helpers/redirect-url.js";
import {
  handleIndexHtmlDev,
  handleIndexHtmlProduction,
  nodeEnv,
  publicDir,
  viteDir,
  viteDistDir,
} from "./index-html.js";
import { loginEndPoint } from "./login.js";
import { progressEndPoint } from "./progress.js";
import { renderEndPoint } from "./render.js";

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

  app.post("/api/render", renderEndPoint);

  app.post("/api/progress", progressEndPoint);

  app.get(REDIRECT_URL_ENDPOINT, loginEndPoint);

  if (nodeEnv === "development") {
    const vite = await startViteDevelopmentServer(app);

    app.get("/:username", handleIndexHtmlDev(vite));
    app.get("*", handleIndexHtmlDev(vite));
  } else {
    app.use(serveStatic(viteDistDir));

    app.get("/:username", handleIndexHtmlProduction());
    app.get("*", handleIndexHtmlProduction());
  }

  const port = process.env.PORT || 8080;

  app.listen(port);
  console.log(`Listening on http://localhost:${port}`);
};
