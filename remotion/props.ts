import { z } from "zod";
import { LanguagesEnum } from "./TopLanguages/constants";
import { cornerType } from "./TopLanguages/corner";

export const CompositionProps = z.object({
  language1: LanguagesEnum,
  language2: LanguagesEnum.or(z.null()),
  language3: LanguagesEnum.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  corner: "bottom-left",
  language1: "JavaScript",
  language2: "TypeScript",
  language3: "Python",
  showHelperLine: false,
  login: "JonnyBurger",
};
