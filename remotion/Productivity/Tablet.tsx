import type { ComponentProps } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Productivity } from "./Productivity";
import { TabletSVG } from "./TabletSVG";

export const tableSchema = z.object({
  enterProgress: z.number().min(0).max(1).step(0.01),
});

export const Tablet: React.FC<
  ComponentProps<typeof Productivity> & z.infer<typeof tableSchema>
> = ({ graphData, enterProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toFullscreen = spring({
    fps,
    frame,
    config: {
      damping: 200,
      mass: 0.5,
    },
    delay: 30,
  });

  const SCREEN_ROTATION_Y = 15;
  const SCREEN_ROTATION_X = -10;
  const SKEW_X = 7;
  const SKEW_Y = -4;

  const rotateYChart = interpolate(
    toFullscreen,
    [0, 1],
    [SCREEN_ROTATION_Y, 0],
  );
  const rotateYParent = interpolate(
    toFullscreen,
    [0, 1],
    [0, -SCREEN_ROTATION_Y],
  );
  const rotateXChart = interpolate(
    toFullscreen,
    [0, 1],
    [SCREEN_ROTATION_X, 0],
  );
  const rotateXParent = interpolate(
    toFullscreen,
    [0, 1],
    [0, -SCREEN_ROTATION_X],
  );

  const skewXChart = interpolate(toFullscreen, [0, 1], [SKEW_X, 0]);
  const skewXParent = interpolate(toFullscreen, [0, 1], [0, -SKEW_X]);
  const skewYChart = interpolate(toFullscreen, [0, 1], [SKEW_Y, 0]);
  const skewYParent = interpolate(toFullscreen, [0, 1], [0, -SKEW_Y]);

  const scaleChart = interpolate(toFullscreen, [0, 1], [0.5 * 0.8, 1]);
  const scaleParent = interpolate(
    toFullscreen,
    [0, 1],
    [1, (1 / (1 - 0.8 * 0.5)) * 1.2],
  );

  const translateX = interpolate(toFullscreen, [0, 1], [0, -500]);
  const translateY = interpolate(toFullscreen, [0, 1], [0, 250]);

  const masterScale = interpolate(toFullscreen, [0, 1], [0.8, 1]);

  const left = interpolate(toFullscreen, [0, 1], [350, 0]);
  const top = interpolate(toFullscreen, [0, 1], [480, 0]);

  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${900 - enterProgress * 900}px)`,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          position: "absolute",
          transformOrigin: "left bottom",
          transform: `scale(${masterScale}) rotateY(${rotateYParent}deg) rotateX(${rotateXParent}deg) skewX(${skewXParent}deg) skewY(${skewYParent}deg) scale(${scaleParent}) translateX(${translateX}px) translateY(${translateY}px)`,
        }}
      >
        <TabletSVG
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transform: "translateY(100px)",
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          left,
          top,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          transform: `perspective(1200px) rotateY(${rotateYChart}deg) rotateX(${rotateXChart}deg) skewX(${skewXChart}deg) skewY(${skewYChart}deg) scale(${scaleChart})`,
        }}
      >
        <AbsoluteFill style={{ width: 1080, height: 1080 }}>
          <Productivity graphData={graphData} />
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
