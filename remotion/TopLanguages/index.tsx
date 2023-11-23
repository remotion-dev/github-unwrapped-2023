import { AbsoluteFill, Sequence } from "remotion";
import { z } from "zod";
import { Description } from "./Description";
import { Planets } from "./Planets";
import { Rocket } from "./Rocket";
import { LanguagesEnum } from "./constants";
import { Intro } from "./sequences/Intro";
import { ShowDescription } from "./sequences/ShowDescription";
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
      <Description />
      <Rocket />
      <Planets {...props} />
    </AbsoluteFill>
  );
};

export const TopLanguagesCamera: React.FC<
  z.infer<typeof topLanguagesSchema> & { style?: React.CSSProperties }
> = (props) => {
  return (
    <>
      <Sequence durationInFrames={50}>
        <Intro {...props} />
      </Sequence>
      <Sequence from={50}>
        <Sequence from={-45}>
          <ShowDescription {...props} />
        </Sequence>
      </Sequence>
    </>
  );
};
