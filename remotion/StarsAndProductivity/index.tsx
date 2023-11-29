import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import type { starsReceivedSchema } from "../StarsReceived";
import { StarsReceived } from "../StarsReceived";

export const StarsAndProductivity: React.FC<
  z.infer<typeof starsReceivedSchema>
> = ({
  starsReceived,
  showHitWindow,
  showBackground,
  showCockpit,
  showDots,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoomTransition = spring({
    fps,
    frame,
    delay: 295,
    config: {
      mass: 4,
      damping: 200,
    },
  });
  const translateX = zoomTransition * 270;
  const translateY = zoomTransition * -270;
  const scale = 1 + zoomTransition * 0.5;

  return (
    <AbsoluteFill>
      <StarsReceived
        showBackground={showBackground}
        showHitWindow={showHitWindow}
        starsReceived={starsReceived}
        showCockpit={showCockpit}
        showDots={showDots}
        tabletTransition={zoomTransition}
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};
