import react from "@vitejs/plugin-react-swc";
import bodyParser from "body-parser";
import type { Express } from "express";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import serveStatic from "serve-static";
import { createServer } from "vite";
import { backendCredentials, REDIRECT_URL_ENDPOINT } from "../helpers/domain";
import { loginEndPoint } from "./login";
import { progressEndPoint } from "./progress";
import { renderEndPoint } from "./render";

const startViteDevelopmentServer = async (app: Express) => {
  const __dirname = fileURLToPath(new URL(".", import.meta.url));

  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: path.join(__dirname, ".."),
    server: {
      middlewareMode: true,
    },
    plugins: [react()],
  });

  app.use((req, res, next) => {
    server.middlewares.handle(req, res, next);
  });
};

export const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.post("/api/render", renderEndPoint);

  app.post("/api/progress", progressEndPoint);

  app.get(REDIRECT_URL_ENDPOINT, loginEndPoint);

  if (backendCredentials().NODE_ENV === "development") {
    await startViteDevelopmentServer(app);
  } else {
    app.use(serveStatic("dist"));
  }

  const port = process.env.PORT || 8080;

  app.listen(port);
  console.log(`Listening on http://localhost:${port}`);
};
