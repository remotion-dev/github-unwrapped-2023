import { AbsoluteFill } from "remotion";
import { z } from "zod";
import CockpitSVG from "./CockpitSVG";
import { Star } from "./Star";

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
        <Star key={index} initialFrame={index * 30} />
      ))}

      <AbsoluteFill>
        <CockpitSVG />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
