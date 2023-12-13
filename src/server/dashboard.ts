import type { Request, Response } from "express";
import { getNumberOfRenders } from "./db.js";

export const dashboardEndpoint = async (
  request: Request,
  response: Response,
) => {
  if (request.method === "OPTIONS") {
    return response.end();
  }

  const nrOfRenders = await getNumberOfRenders();

  return response.json({ nrOfRenders });
};
