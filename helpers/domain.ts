import { config } from "dotenv";
import { z } from "zod";

const frontendEnv = {
  NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  NEXT_PUBLIC_REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

const frontendSchema = z.object({
  NEXT_PUBLIC_CLIENT_ID: z.string(),
  NEXT_PUBLIC_REDIRECT_URI: z.string(),
  NEXT_PUBLIC_API_URL: z.string(),
});

export const frontendCredentials = () => frontendSchema.parse(frontendEnv);

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
