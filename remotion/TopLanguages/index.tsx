import { AbsoluteFill } from "remotion";
import { z } from "zod";
import type { Rocket } from "../../src/config";
import { LanguagesEnum } from "../../src/config";
import { TopLanguagesRocket } from "./Rocket";

export const topLanguagesSchema = z.object({
  first: LanguagesEnum,
  second: LanguagesEnum,
  third: LanguagesEnum,
});

export const TopLanguagesCanvas: React.FC<{
  style?: React.CSSProperties;
  rocket: Rocket;
}> = (props) => {
  return (
    <AbsoluteFill style={props.style}>
      <TopLanguagesRocket rocket={props.rocket} />
    </AbsoluteFill>
  );
};
