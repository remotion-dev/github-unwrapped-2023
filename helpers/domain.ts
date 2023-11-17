import { config } from "dotenv";
import { z } from "zod";

const frontendSchema = z.object({
  VITE_CLIENT_ID: z.string(),
  VITE_HOST: z.string(),
});

export const frontendCredentials = () => frontendSchema.parse(import.meta.env);

export const backendCredentials = () => {
  config();

  return z
    .object({
      CLIENT_SECRET: z.string(),
      NODE_ENV: z.enum(["development", "production"]),
    })
    .merge(frontendSchema)
    .parse(process.env);
};

export const REDIRECT_URL_ENDPOINT = "/login";

export const makeRedirectUriFrontend = () => {
  return `${frontendCredentials().VITE_HOST}${REDIRECT_URL_ENDPOINT}`;
};

export const makeRedirectUriBackend = () => {
  return `${backendCredentials().VITE_HOST}${REDIRECT_URL_ENDPOINT}`;
};
