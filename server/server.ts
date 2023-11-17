import bodyParser from "body-parser";
import express from "express";
import { loginEndPoint } from "./login";
import { progressEndPoint } from "./progress";
import { renderEndPoint } from "./render";

export const startServer = () => {
  const app = express();

  app.use(bodyParser.json());

  app.options("/api/render", renderEndPoint);
  app.post("/api/render", renderEndPoint);

  app.options("/api/progress", progressEndPoint);
  app.post("/api/progress", progressEndPoint);

  app.options("/api/login", loginEndPoint);
  app.post("/api/login", loginEndPoint);

  app.listen(8080);
  console.log("Listening on port 8080");
};
