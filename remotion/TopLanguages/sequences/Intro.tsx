import type { z } from "zod";
import type { topLanguagesSchema } from "..";
import { TopLanguagesCanvas } from "..";

export const Intro: React.FC<z.infer<typeof topLanguagesSchema>> = (props) => {
  return (
    <TopLanguagesCanvas
      {...props}
      style={{ marginTop: 200, marginLeft: 300 }}
    />
  );
};
