import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { LanguageEnumType } from "./constants";
import { LanguagesEnum } from "./constants";

const mapLanguagesToTitleColor: Record<LanguageEnumType, string> = {
  [LanguagesEnum.enum.Java]: "rgb(201, 246, 253)",
  [LanguagesEnum.enum.JavaScript]: "rgb(253,241,190)",
  [LanguagesEnum.enum.Python]: "rgb(200,228,252)",
};

export const LangugageDescription: React.FC<{
  language: LanguageEnumType;
  position: number;
  actionFrames: [number, number];
}> = ({ language, position, actionFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    fps,
    frame,
    config: {
      mass: 1,
      stiffness: 50,
      overshootClamping: true,
    },
    delay: actionFrames[0],
    durationInFrames: (actionFrames[1] - actionFrames[0]) / 2,
  });

  const slideOut = spring({
    fps,
    frame,
    config: {
      mass: 1,
      stiffness: 50,
      overshootClamping: true,
    },
    delay: actionFrames[1],
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 240,
        transform: `translateY(${(1 - slideIn + slideOut) * 360}px)`,
      }}
    >
      <div
        style={{
          fontSize: 84,
          color: mapLanguagesToTitleColor[language],
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
        Your language no. {3 - position}
      </div>
    </AbsoluteFill>
  );
};
