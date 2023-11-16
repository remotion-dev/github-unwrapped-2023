import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { topLanguagesSchema, ZoomedOutTopLanguages } from "..";

export const Intro: React.FC<z.infer<typeof topLanguagesSchema>> = (props) => {
  return (
    <AbsoluteFill>
      <ZoomedOutTopLanguages
        {...props}
        style={{ transform: "scale(1.4)", marginTop: 300, marginLeft: 300 }}
      />
    </AbsoluteFill>
  );
};
