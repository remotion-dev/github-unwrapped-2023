import type { Request, Response } from "express";
import path from "path";
import { publicDir } from "./index-html.js";

export const faviconEndPoint = (request: Request, response: Response) => {
  response.sendFile(path.join(publicDir, "favicon.png"));
};
