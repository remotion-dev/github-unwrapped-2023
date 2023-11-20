import { config } from "dotenv";
import { z } from "zod";
import { REDIRECT_URL_ENDPOINT } from "./redirect-url.js";

export const backendCredentials = () => {
  config();

  return z
    .object({
      VITE_CLIENT_ID: z.string(),
      VITE_HOST: z.string(),
      CLIENT_SECRET: z.string(),
      NODE_ENV: z.enum(["development", "production"]),
      MONGO_URL: z.string(),
      DISCORD_CHANNEL: z.string(),
      DISCORD_TOKEN: z.string(),
      // TODO: Make sure it is not expired
      GITHUB_TOKEN_1: z.string(),
      GITHUB_TOKEN_2: z.string(),
    })
    .parse(process.env);
};

export const makeRedirectUriBackend = () => {
  return `${backendCredentials().VITE_HOST}${REDIRECT_URL_ENDPOINT}`;
};
