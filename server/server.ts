import express from "express";
import { loginEndPoint } from "./login";

export const startServer = () => {
  const app = express();

  app.post("/api/login", loginEndPoint);

  app.listen(8080);
  console.log("Listening on port 8080");
};
