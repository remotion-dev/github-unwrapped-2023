import { z } from "zod";
import { Background } from "./Background";
import { Description } from "./Description";
import { Nebulas } from "./nebulas/Nebulas";
import { Planets } from "./Planets";
import { Rocket } from "./Rocket";
import SkySVG from "./svgs/SkySVG";

export const topLanguagesSchema = z.object({
  first: z.string(),
  second: z.string(),
  third: z.string(),
});

export const TopLanguages: React.FC<
  z.infer<typeof topLanguagesSchema>
> = () => {
  return (
    <Background>
      <SkySVG style={{ transform: "scale(3)" }} />
      <Nebulas />
      <Description />
      <Rocket />
      <Planets />
    </Background>
  );
};
