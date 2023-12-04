import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PANE_BACKGROUND, PANE_BORDER } from "../TopLanguages/Pane";

const title: React.CSSProperties = {
  fontSize: 80,
  fontWeight: "bold",
  backgroundClip: "text",
  backgroundImage: "linear-gradient(270.02deg, #bbb 20.63%, #fff 99.87%)",
  WebkitBackgroundClip: "text",
  backgroundColor: "text",
  WebkitTextFillColor: "transparent",
  lineHeight: 1,
};

const INNER_BORDER_RADIUS = 30;
const PADDING = 20;

export const OpeningTitle: React.FC = () => {
  const { fps, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const enter = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: 45,
    durationInFrames: 50,
  });

  const rotate = spring({
    fps,
    frame,
    config: {
      damping: 20,
      mass: 1.6,
      stiffness: 100,
    },
    delay: 35,
    durationInFrames: 65,
  });

  const rotation = interpolate(rotate, [0, 1], [Math.PI * 2, 0]);

  const y = interpolate(enter, [0, 1], [height, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Mona Sans",
        fontSize: 40,
        marginTop: -180 + y,
        perspective: 1000,
      }}
    >
      <div
        style={{
          background: PANE_BACKGROUND,
          border: PANE_BORDER,
          display: "inline-flex",
          flexDirection: "row",
          paddingRight: 70,
          paddingTop: PADDING,
          paddingBottom: PADDING,
          paddingLeft: PADDING,
          alignItems: "center",
          borderRadius: INNER_BORDER_RADIUS + PADDING,
          transform: `rotateX(${rotation}rad)`,
          backfaceVisibility: "hidden",
        }}
      >
        <Img
          src={`https://github.com/maria-paul.png`}
          style={{
            borderRadius: INNER_BORDER_RADIUS,
            height: 160,
            border: PANE_BORDER,
            marginRight: PADDING,
          }}
        />
        <div>
          <div>
            This is my <strong>#GitHubUnwrapped</strong>
          </div>
          <div style={title}>maria-paul</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
