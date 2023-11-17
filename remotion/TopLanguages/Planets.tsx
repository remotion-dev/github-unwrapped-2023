import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { topLanguagesSchema } from ".";
import { PLANET_POSITIONS } from "./constants";
import { Planet } from "./Planet";

export const Planets: React.FC<z.infer<typeof topLanguagesSchema>> = ({
  first,
  second,
  third,
}) => {
  return (
    <AbsoluteFill>
      <Planet
        actionIndex={2}
        planetPositionRates={PLANET_POSITIONS}
        language={third}
        isMain={true}
      />
      <Planet
        actionIndex={1}
        planetPositionRates={PLANET_POSITIONS}
        language={second}
        isMain={false}
      />
      <Planet
        actionIndex={0}
        planetPositionRates={PLANET_POSITIONS}
        language={first}
        isMain={false}
      />
    </AbsoluteFill>
  );
};
