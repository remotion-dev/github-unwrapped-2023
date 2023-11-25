import type { AwsRegion } from "@remotion/lambda";
import { z } from "zod";

export const REGION: AwsRegion = "us-east-1";

export const COMP_NAME = "Main";
export const SITE_NAME = "unwrapped2023";
export const RAM = 2048;
export const DISK = 2048;
export const TIMEOUT = 240;

export const LanguagesEnum = z.enum([
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust1",
  "Rust2",
  "Rust3",
]);

export const cornerType = z.enum([
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
]);
export type Corner = z.infer<typeof cornerType>;

export const compositionSchema = z.object({
  language1: LanguagesEnum,
  language2: LanguagesEnum.or(z.null()),
  language3: LanguagesEnum.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
});

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: compositionSchema,
});
