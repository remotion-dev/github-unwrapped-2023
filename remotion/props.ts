import type { z } from "zod";
import type { compositionSchema } from "../src/config";

export const defaultMyCompProps: z.infer<typeof compositionSchema> = {
  corner: "bottom-left",
  language1: "JavaScript",
  language2: "TypeScript",
  language3: "Python",
  showHelperLine: false,
  login: "JonnyBurger",
  planet: "Ice" as const,
  starsReceived: 10,
  issuesClosed: 10,
  issuesOpened: 10,
};
