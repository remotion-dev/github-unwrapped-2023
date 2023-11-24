import { AbsoluteFill } from "remotion";
import { z } from "zod";
import CockpitSVG from "./CockpitSVG";
import { Description } from "./Description";
import { Star } from "./Star";

export const MAX_STARS = 50;
export const STARS_DELAY = 20;
export const STAR_DURATION = 40;

export const starsReceivedSchema = z.object({
  starsReceived: z.number().min(0),
});

export const StarsReceived: React.FC<z.infer<typeof starsReceivedSchema>> = ({
  starsReceived,
}) => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(121.11% 121.11% at 47.08% 100%, #0F102E 0%, #000 100%)",
      }}
    >
      {new Array(starsReceived).fill("").map((_, index) => (
        <Star
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          initialFrame={index * STARS_DELAY}
          duration={30}
          starsShown={Math.min(starsReceived, MAX_STARS)}
        />
      ))}

      <AbsoluteFill>
        <CockpitSVG />
      </AbsoluteFill>
      <Description starsReceived={starsReceived} />
    </AbsoluteFill>
  );
};
