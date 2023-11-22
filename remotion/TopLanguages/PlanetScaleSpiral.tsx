import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { LanguagesEnum } from "./constants";
import { NewRocketSVG } from "./svgs/NewRocketSVG";

export const spiralSchema = z.object({
  language: LanguagesEnum,
});

export const PlanetScaleSpiral: React.FC<z.infer<typeof spiralSchema>> = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NewRocketSVG />
    </AbsoluteFill>
  );
};
