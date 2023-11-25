import type { ComponentProps } from "react";
import { AbsoluteFill } from "remotion";
import { ProductivityGraph, type Productivity } from "./Productivity";
import { TabletSVG } from "./TabletSVG";

export const Tablet: React.FC<
  ComponentProps<typeof Productivity> & { style?: React.CSSProperties }
> = ({ graphData, style }) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        ...style,
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

      <div
        style={{
          left: 220,
          top: 160 + 100,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: 36,
          transform:
            "perspective(1200px) rotateY(15deg) rotateX(-10deg) rotateZ(0) skew(7deg,-4deg) scale(0.6)",
        }}
      >
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
