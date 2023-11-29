import type { ComponentProps } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Productivity, ProductivityGraph } from "./Productivity";
import { TabletSVG } from "./TabletSVG";

export const Tablet: React.FC<
  ComponentProps<typeof Productivity> & {
    enter: number;
  }
> = ({ graphData, enter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toFullscreen = spring({
    fps,
    frame,
    config: {
      damping: 200,
      mass: 0.5,
    },
  });

  const rotateY = interpolate(toFullscreen, [0, 1], [15, 0]);
  const rotateX = interpolate(toFullscreen, [0, 1], [-10, 0]);
  const skewX = interpolate(toFullscreen, [0, 1], [7, 0]);
  const skewY = interpolate(toFullscreen, [0, 1], [-4, 0]);
  const scale = interpolate(toFullscreen, [0, 1], [0.5 * 0.8, 1]);

  const masterScale = interpolate(toFullscreen, [0, 1], [0.8, 1]);

  const left = interpolate(toFullscreen, [0, 1], [40, 0]);
  const top = interpolate(toFullscreen, [0, 1], [280, 0]);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          position: "absolute",
          transformOrigin: "left bottom",
          transform: `translateY(${900 - enter * 900}px) scale(${masterScale})`,
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
          transform: `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) skewX(${skewX}deg) skewY(${skewY}deg) scale(${scale})`,
        }}
      >
        <AbsoluteFill style={{ width: 1080, height: 1080 }}>
          <Productivity graphData={graphData} />
        </AbsoluteFill>
        <div
          style={{
            color: "white",
            fontFamily: "Mona Sans",
            fontWeight: 800,
            fontSize: 80,
          }}
        >
          Monday
        </div>
        <ProductivityGraph productivityPerHour={graphData} />
      </div>
    </AbsoluteFill>
  );
};
