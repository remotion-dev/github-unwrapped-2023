import { config } from "dotenv";
import { z } from "zod";

export const backendCredentials = () => {
  config();

  return z
    .object({
      VITE_CLIENT_ID: z.string(),
      VITE_HOST: z.string(),
      CLIENT_SECRET: z.string(),
      NODE_ENV: z.enum(["development", "production"]),
    })
    .parse(process.env);
};

export const REDIRECT_URL_ENDPOINT = "/login";

export const makeRedirectUriBackend = () => {
  return `${backendCredentials().VITE_HOST}${REDIRECT_URL_ENDPOINT}`;
};
