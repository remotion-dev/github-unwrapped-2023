import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { StarsReceived } from "../StarsReceived";

export const StarsAndProductivity: React.FC<
  React.ComponentProps<typeof StarsReceived>
> = ({ starsReceived }) => {
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
        showBackground={false}
        showHitWindow={false}
        starsReceived={starsReceived}
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};
