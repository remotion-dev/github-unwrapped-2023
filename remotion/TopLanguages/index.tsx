import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { Rocket } from "./Rocket";
import { LanguagesEnum } from "./constants";

export const topLanguagesSchema = z.object({
  first: LanguagesEnum,
  second: LanguagesEnum,
  third: LanguagesEnum,
});

export const TopLanguagesCanvas: React.FC<{
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <AbsoluteFill style={props.style}>
      <Rocket />
    </AbsoluteFill>
  );
};
