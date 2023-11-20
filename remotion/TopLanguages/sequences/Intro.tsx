import { AbsoluteFill } from "remotion";
import type { z } from "zod";
import type { topLanguagesSchema } from "..";
import { TopLanguagesCanvas } from "..";

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
