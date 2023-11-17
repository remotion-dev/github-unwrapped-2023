import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { TopLanguagesCanvas, topLanguagesSchema } from "..";

export const Intro: React.FC<z.infer<typeof topLanguagesSchema>> = (props) => {
  return (
    <AbsoluteFill>
      <TopLanguagesCanvas
        {...props}
        style={{ transform: "scale(1.4)", marginTop: 300, marginLeft: 300 }}
      />
    </AbsoluteFill>
  );
};
