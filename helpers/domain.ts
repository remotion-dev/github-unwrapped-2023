import { config } from "dotenv";
import { z } from "zod";

config();

export const credentials = z
  .object({
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    REDIRECT_URI: z.string(),
  })
  .parse(process.env);
