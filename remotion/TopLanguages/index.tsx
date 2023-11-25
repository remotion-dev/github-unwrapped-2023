import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { LanguagesEnum } from "../../src/config";
import { Rocket } from "./Rocket";

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
