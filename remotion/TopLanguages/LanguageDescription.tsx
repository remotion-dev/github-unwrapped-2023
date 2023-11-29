import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { languageSchema } from "../../src/config";
import { InnerLanguageDescription } from "./InnerLanguageDescription";

export const LanguageDescription: React.FC<{
  language: z.infer<typeof languageSchema>;
  position: number;
  delay: number;
  duration: number;
}> = ({ language, position, delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    fps,
    frame,
    config: {
      mass: 1,
      stiffness: 50,
    },
    delay,
    durationInFrames: 20,
  });

  const slideOut = spring({
    fps,
    frame,
    config: {
      mass: 1,
      stiffness: 50,
    },
    durationInFrames: 20,
    delay: delay + duration,
  });

  const translationY = interpolate(slideIn - slideOut, [0, 1], [300, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 50,
        transform: `translateY(${translationY}px)`,
      }}
    >
      <InnerLanguageDescription language={language} position={position} />
    </AbsoluteFill>
  );
};
