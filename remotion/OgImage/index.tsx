import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Overlay } from "./Overlay";

export const OgImage: React.FC = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Img src={staticFile("og-image-background.png")} />
      </AbsoluteFill>
      <AbsoluteFill>
        <div
          style={{
            height: 630,
            width: 1500,
            transform: `matrix3d(0.690392, 0.015822, 0, 0.00019, 
              0, 0.609524, 0, 0, 
              0, 0, 1, 0, 
              101, 88, 0, 1)`,
            transformOrigin: "0px 0px 0px",
          }}
        >
          <Overlay />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
