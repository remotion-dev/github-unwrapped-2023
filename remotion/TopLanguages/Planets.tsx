import { AbsoluteFill } from "remotion";
import { LanguagesEnum, PLANET_POSITIONS } from "./constants";
import { Planet } from "./Planet";

export const Planets: React.FC<{ frameOffset: number }> = ({ frameOffset }) => {
  return (
    <AbsoluteFill>
      <Planet
        actionIndex={0}
        actionPositions={PLANET_POSITIONS}
        language={LanguagesEnum.enum.Java}
        isMain={false}
        frameOffset={frameOffset}
      />
      <Planet
        actionIndex={1}
        actionPositions={PLANET_POSITIONS}
        language={LanguagesEnum.enum.JavaScript}
        isMain={false}
        frameOffset={frameOffset}
      />
      <Planet
        actionIndex={2}
        actionPositions={PLANET_POSITIONS}
        language={LanguagesEnum.enum.Python}
        isMain={true}
        frameOffset={frameOffset}
      />
    </AbsoluteFill>
  );
};
