import React, { useMemo } from "react";
import type { z } from "zod";
import type { languageSchema } from "../../src/config";
import { PANE_BACKGROUND, PANE_BORDER } from "./Pane";
import { computePlanetInfo, mapLanguageToPlanet } from "./constants";

const INNER_BORDER_RADIUS = 10;
const HORIZONTAL_PADDING = 20;

const label: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: PANE_BACKGROUND,
  border: PANE_BORDER,
  padding: `${HORIZONTAL_PADDING}px ${HORIZONTAL_PADDING}px`,
  borderRadius: INNER_BORDER_RADIUS + HORIZONTAL_PADDING,
  lineHeight: 1,
};

const num: React.CSSProperties = {
  fontSize: 60,
  color: "white",
  fontWeight: 800,
  width: 80,
  height: 80,
  background: "rgba(255, 255, 255, 0.1)",
  border: PANE_BORDER,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  borderRadius: INNER_BORDER_RADIUS,
  marginRight: HORIZONTAL_PADDING,
  fontFamily: "Mona Sans",
};

const languageBaseStyle: React.CSSProperties = {
  fontSize: 74,
  fontFamily: "Mona Sans",
  fontWeight: 800,
};

export const InnerLanguageDescription: React.FC<{
  language: z.infer<typeof languageSchema>;
  position: number;
}> = ({ language, position }) => {
  const languageStyle = useMemo(() => {
    return {
      ...languageBaseStyle,
      color: computePlanetInfo(language).textColor,
    };
  }, [language]);

  return (
    <div style={label}>
      <div style={num}>{position}</div>
      <div style={languageStyle}>
        {language.type === "other"
          ? language.name
          : mapLanguageToPlanet[language.name].name}
      </div>
    </div>
  );
};
