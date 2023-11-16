import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { topLanguagesSchema } from ".";
import { PLANET_POSITIONS } from "./constants";
import { Planet } from "./Planet";

export const Planets: React.FC<
  z.infer<typeof topLanguagesSchema> & { frameOffset: number }
> = ({ frameOffset, first, second, third }) => {
  return (
    <AbsoluteFill>
      <Planet
        actionIndex={2}
        actionPositions={PLANET_POSITIONS}
        language={third}
        isMain={true}
        frameOffset={frameOffset}
      />
      <Planet
        actionIndex={1}
        actionPositions={PLANET_POSITIONS}
        language={second}
        isMain={false}
        frameOffset={frameOffset}
      />
      <Planet
        actionIndex={0}
        actionPositions={PLANET_POSITIONS}
        language={first}
        isMain={false}
        frameOffset={frameOffset}
      />
    </AbsoluteFill>
  );
};
