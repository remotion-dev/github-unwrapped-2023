import { z } from "zod";
import { REDIRECT_URL_ENDPOINT } from "../src/helpers/domain";

const frontendSchema = z.object({
  VITE_CLIENT_ID: z.string(),
  VITE_HOST: z.string(),
});

export const frontendCredentials = () => frontendSchema.parse(import.meta.env);

export const makeRedirectUriFrontend = () => {
  return `${frontendCredentials().VITE_HOST}${REDIRECT_URL_ENDPOINT}`;
};
