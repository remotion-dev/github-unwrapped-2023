import { AbsoluteFill } from "remotion";
import { Planet } from "./Planet";
import { PLANET_POSITIONS } from "./constants";

export const PlanetScaleOut: React.FC = () => {
  return (
    <AbsoluteFill>
      <Planet
        actionIndex={0}
        delay={0}
        isMain
        language="Java"
        planetPositionRate={PLANET_POSITIONS[0]}
      />
    </AbsoluteFill>
  );
};
