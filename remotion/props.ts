import type { z } from "zod";
import type { compositionSchema } from "../src/config";

export const defaultMyCompProps: z.infer<typeof compositionSchema> = {
  corner: "bottom-left",
  language1: { type: "designed", name: "JavaScript" },
  language2: { type: "designed", name: "TypeScript" },
  language3: { type: "designed", name: "Python" },
  showHelperLine: false,
  login: "JonnyBurger",
  planet: "Ice" as const,
  starsGiven: 10,
  issuesClosed: 10,
  issuesOpened: 10,
  totalPullRequests: 10,
  topWeekday: "2",
};
