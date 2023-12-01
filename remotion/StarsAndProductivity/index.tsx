import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import { TABLET_SCENE_LENGTH, Tablet } from "../Productivity/Tablet";
import { GRAPH_DATA } from "../Productivity/constants";
import type { starsReceivedSchema } from "../StarsReceived";
import { StarsReceived } from "../StarsReceived";

const ZOOM_DELAY = 120;

export const StarsAndProductivity: React.FC<
  z.infer<typeof starsReceivedSchema>
> = ({
  starsGiven,
  showHitWindow,
  showBackground,
  showCockpit,
  showDots,
  topWeekday,
  topHour,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomTransition =
    spring({
      fps,
      frame,
      delay: ZOOM_DELAY,
      config: {
        damping: 200,
      },
      durationInFrames: 45,
    }) -
    spring({
      fps,
      frame,
      delay: ZOOM_DELAY + TABLET_SCENE_LENGTH,
      config: {
        damping: 200,
      },
      durationInFrames: 45,
    });
  const translateX = zoomTransition * 270;
  const translateY = zoomTransition * -270;
  const scale = 1 + zoomTransition * 0.5;

  return (
    <AbsoluteFill>
      <StarsReceived
        showBackground={showBackground}
        showHitWindow={showHitWindow}
        starsGiven={starsGiven}
        showCockpit={showCockpit}
        showDots={showDots}
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          opacity: 1 - zoomTransition * 0.7,
        }}
        topWeekday={topWeekday}
        topHour={topHour}
      />
      <Sequence from={ZOOM_DELAY}>
        <Tablet
          weekday={topWeekday}
          enterProgress={zoomTransition}
          graphData={GRAPH_DATA}
          hour={topHour}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
