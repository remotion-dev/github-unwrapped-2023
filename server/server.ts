import react from "@vitejs/plugin-react-swc";
import bodyParser from "body-parser";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { loginEndPoint } from "./login";
import { progressEndPoint } from "./progress";
import { renderEndPoint } from "./render";

export const startServer = async () => {
  const app = express();

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

  app.use(bodyParser.json());

  app.options("/api/render", renderEndPoint);
  app.post("/api/render", renderEndPoint);

  app.options("/api/progress", progressEndPoint);
  app.post("/api/progress", progressEndPoint);

  app.options("/api/login", loginEndPoint);
  app.post("/api/login", loginEndPoint);

  app.use((req, res, next) => {
    server.middlewares.handle(req, res, next);
  });

  app.listen(8080);
  console.log("Listening on port 8080");
};
