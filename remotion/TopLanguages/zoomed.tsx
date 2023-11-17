import { getPointAtLength } from "@remotion/paths";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";
import { TopLanguagesCanvas } from ".";
import { complexCurvePathLength, newPath, PLANET_POSITIONS } from "./constants";
import { getRate } from "./Rocket";

export const topLanguagesSchema = z.object({
  first: z.string(),
  second: z.string(),
  third: z.string(),
});

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
