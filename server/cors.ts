import { Response } from "express";
import { backendCredentials } from "../helpers/domain";

export const enableCors = (response: Response) => {
  response.setHeader(
    "Access-Control-Allow-Origin",
    backendCredentials().FRONTEND_HOST
  );
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "*");
};
