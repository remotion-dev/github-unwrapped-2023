import type { AwsRegion } from "@remotion/lambda";
import { z } from "zod";

export const REGION: AwsRegion = "us-east-1";

export const COMP_NAME = "Main";
export const SITE_NAME = "unwrapped2023";
export const RAM = 2048;
export const DISK = 2048;
export const TIMEOUT = 240;

const availablePlanets = ["Ice", "Silver", "Gold"] as const;
export type Planet = (typeof availablePlanets)[number];

export const PlanetEnum = z.enum(availablePlanets);

export const LanguagesEnum = z.enum([
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust1",
  "Rust2",
  "Rust3",
  "C++",
  "Ruby",
]);

export const cornerTypeValues = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export const cornerType = z.enum(cornerTypeValues);
export type Corner = z.infer<typeof cornerType>;

export const languageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("other"),
    name: z.string(),
    color: z.string(),
  }),
  z.object({
    type: z.literal("designed"),
    name: LanguagesEnum,
  }),
]);

export const compositionSchema = z.object({
  language1: languageSchema,
  language2: languageSchema.or(z.null()),
  language3: languageSchema.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
  planet: PlanetEnum,
  starsGiven: z.number(),
  issuesOpened: z.number(),
  issuesClosed: z.number(),
  totalPullRequests: z.number(),
});

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: compositionSchema,
});
