import { AbsoluteFill } from "remotion";
import { Language, PLANET_POSITIONS } from "./constants";
import { Planet } from "./Planet";

export const Planets: React.FC = () => {
  return (
    <AbsoluteFill>
      <Planet
        actionIndex={0}
        actionPositions={PLANET_POSITIONS}
        language={Language.Java}
        // style={{ bottom: 800, left: 450 }}
      />
      <Planet
        actionIndex={1}
        actionPositions={PLANET_POSITIONS}
        language={Language.Python}
        // style={{ bottom: 130, left: 200 }}
      />
      <Planet
        actionIndex={2}
        actionPositions={PLANET_POSITIONS}
        language={Language.Python}
        // style={{ bottom: 130, left: 200 }}
      />
    </AbsoluteFill>
  );
};
