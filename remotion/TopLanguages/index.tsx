import { Sequence } from "remotion";
import { z } from "zod";
import { Background } from "./Background";
import { Description } from "./Description";
import { Nebulas } from "./nebulas/Nebulas";
import { Planets } from "./Planets";
import { Rocket } from "./Rocket";
import { Intro } from "./sequences/Intro";
import { ShowDescription } from "./sequences/ShowDescription";
import SkySVG from "./svgs/SkySVG";

export const topLanguagesSchema = z.object({
  first: z.string(),
  second: z.string(),
  third: z.string(),
});

export const ZoomedOutTopLanguages: React.FC<
  z.infer<typeof topLanguagesSchema> & {
    style?: React.CSSProperties;
    frameOffset?: number;
  }
> = (props) => {
  return (
    <Background style={props.style}>
      <SkySVG style={{ transform: "scale(3)" }} />
      <Nebulas />
      <Description />
      <Rocket frameOffset={props.frameOffset ?? 0} />
      <Planets frameOffset={props.frameOffset ?? 0} />
    </Background>
  );
};

export const TopLanguages: React.FC<
  z.infer<typeof topLanguagesSchema> & { style?: React.CSSProperties }
> = (props) => {
  return (
    <>
      <Sequence durationInFrames={90}>
        <Intro />
      </Sequence>
      <Sequence from={90}>
        <ShowDescription />
      </Sequence>
    </>
  );
};
