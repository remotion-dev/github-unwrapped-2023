import { Sequence } from "remotion";
import { z } from "zod";
import { Background } from "./Background";
import { LanguagesEnum } from "./constants";
import { Description } from "./Description";
import { Nebulas } from "./nebulas/Nebulas";
import { Planets } from "./Planets";
import { Rocket } from "./Rocket";
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
    <Background style={props.style}>
      <SkySVG style={{ transform: "scale(3)" }} />
      <Nebulas />
      <Description />
      <Rocket />
      <Planets {...props} />
    </Background>
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
