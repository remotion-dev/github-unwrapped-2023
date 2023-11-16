import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LanguageEnumType, LanguagesEnum, PLANET_POSITIONS } from "./constants";
import { getActionFrames } from "./Rocket";

const mapLanguagesToTitleColor: Record<LanguageEnumType, string> = {
  [LanguagesEnum.enum.Java]: "rgb(201, 246, 253)",
  [LanguagesEnum.enum.JavaScript]: "rgb(253,241,190)",
  [LanguagesEnum.enum.Python]: "rgb(200,228,252)",
};

export const LangugageDescription: React.FC<{
  language: LanguageEnumType;
  position: number;
  frameOffset?: number;
}> = ({ language, position, frameOffset }) => {
  const allActionFrames = getActionFrames(PLANET_POSITIONS);
  const actionFrames = allActionFrames[position];
  const frame = useCurrentFrame();
  const frameWithOffset = frame + (frameOffset ?? 0);
  const { fps } = useVideoConfig();

  const slideIn = spring({
    fps,
    frame: frameWithOffset,
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
    frame: frameWithOffset,
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
        paddingBottom: 80,
        transform: `translateY(${(1 - slideIn + slideOut) * 250}px)`,
      }}
    >
      <div
        style={{
          fontSize: 110,
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
          fontSize: 48,
          color: "white",
          fontWeight: 300,
        }}
      >
        Your language no. {3 - position}
      </div>
    </AbsoluteFill>
  );
};
