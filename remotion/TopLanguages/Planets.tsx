import { AbsoluteFill } from "remotion";
import {
  Language,
  PLANET_1_ACTION_FRAME,
  PLANET_2_ACTION_FRAME,
  PLANET_3_ACTION_FRAME,
} from "./constants";
import { Planet } from "./Planet";
import { getRates } from "./Rocket";

export const Planets: React.FC = () => {
  const rates = getRates([
    PLANET_1_ACTION_FRAME,
    PLANET_2_ACTION_FRAME,
    PLANET_3_ACTION_FRAME,
  ]);

  return (
    <AbsoluteFill>
      <Planet
        actionFrame={PLANET_1_ACTION_FRAME}
        rate={rates[0]}
        language={Language.Java}
        // style={{ bottom: 800, left: 450 }}
      />
      <Planet
        language={Language.Python}
        rate={rates[1]}
        actionFrame={PLANET_2_ACTION_FRAME}
        // style={{ bottom: 130, left: 200 }}
      />
      <Planet
        language={Language.JavaScript}
        actionFrame={PLANET_3_ACTION_FRAME}
        rate={rates[2]}

        // style={{ bottom: 260, left: 1500 }}
      />
    </AbsoluteFill>
  );
};
