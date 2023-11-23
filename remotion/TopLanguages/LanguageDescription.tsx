import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { mapLanguageToPlanet, type LanguageEnumType } from "./constants";

const Inner: React.FC<{
  language: LanguageEnumType;
  position: number;
}> = ({ language, position }) => {
  return (
    <div>
      <div
        style={{
          fontSize: 84,
          color: mapLanguageToPlanet[language].textColor,
          fontFamily: "Mona Sans",
          fontWeight: 800,
        }}
      >
        {language}
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          fontSize: 30,
          color: "white",
          fontWeight: 300,
        }}
      >
        Your language no. {position}
      </div>
    </div>
  );
};

export const LanguageDescription: React.FC<{
  language: LanguageEnumType;
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
      <Inner language={language} position={position} />
    </AbsoluteFill>
  );
};
