import { AbsoluteFill } from "remotion";
import type { z } from "zod";
import type { topLanguagesSchema } from ".";
import { Planet } from "./Planet";
import { PLANET_POSITIONS, actionPositions } from "./constants";

export const Planets: React.FC<z.infer<typeof topLanguagesSchema>> = ({
  first,
  second,
  third,
}) => {
  return (
    <AbsoluteFill>
      <Planet
        actionIndex={2}
        planetPositionRate={PLANET_POSITIONS[2]}
        language={third}
        isMain
        delay={actionPositions[2]}
      />
      <Planet
        actionIndex={1}
        planetPositionRate={PLANET_POSITIONS[1]}
        language={second}
        isMain={false}
        delay={actionPositions[1]}
      />
      <Planet
        actionIndex={0}
        planetPositionRate={PLANET_POSITIONS[0]}
        language={first}
        isMain={false}
        delay={actionPositions[0]}
      />
    </AbsoluteFill>
  );
};
