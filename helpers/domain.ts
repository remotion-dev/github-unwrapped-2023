import { config } from "dotenv";
import { z } from "zod";

const frontendSchema = z.object({
  VITE_CLIENT_ID: z.string(),
  VITE_REDIRECT_URI: z.string(),
  VITE_API_URL: z.string(),
});

export const frontendCredentials = () => frontendSchema.parse(import.meta.env);

export const backendCredentials = () => {
  config();

  return z
    .object({
      CLIENT_SECRET: z.string(),
      FRONTEND_HOST: z.string(),
    })
    .merge(frontendSchema)
    .parse(process.env);
};
