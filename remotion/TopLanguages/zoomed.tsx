import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { z } from "zod";
import type { topLanguagesSchema } from ".";
import { TopLanguagesCanvas } from ".";
import { complexCurvePathLength, newPath, PLANET_POSITIONS } from "./constants";
import { getRate } from "./Rocket";

export const ZoomedTopLanguages: React.FC<
  z.infer<typeof topLanguagesSchema>
> = (props) => {
  const frame = useCurrentFrame();
  const rate = getRate({
    frame,
    actionLocations: PLANET_POSITIONS,
  });

  const point = getPointAtLength(newPath, complexCurvePathLength * rate);

  return (
    <AbsoluteFill>
      <TopLanguagesCanvas
        {...props}
        style={{ marginTop: -point.y + 520, marginLeft: -point.x + 520 }}
      />
    </AbsoluteFill>
  );
};
