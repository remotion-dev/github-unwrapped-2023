import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { Rocket } from "./Rocket";
import { LanguagesEnum } from "./constants";
import { Intro } from "./sequences/Intro";
import SkySVG from "./svgs/SkySVG";

export const topLanguagesSchema = z.object({
  first: LanguagesEnum,
  second: LanguagesEnum,
  third: LanguagesEnum,
});

export const TopLanguagesCanvas: React.FC<
  z.infer<typeof topLanguagesSchema> & {
    style?: React.CSSProperties;
  }
> = (props) => {
  return (
    <AbsoluteFill style={props.style}>
      <SkySVG style={{ transform: "scale(6)", opacity: 0.3 }} />
      <Rocket />
    </AbsoluteFill>
  );
};

export const TopLanguagesCamera: React.FC<
  z.infer<typeof topLanguagesSchema> & { style?: React.CSSProperties }
> = (props) => {
  return (
    <Sequence durationInFrames={50}>
      <Intro {...props} />
    </Sequence>
  );
};
