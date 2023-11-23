import React from "react";
import type { LanguageEnumType } from "./constants";
import { mapLanguageToPlanet } from "./constants";

const label: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

export const InnerLanguageDescription: React.FC<{
  language: LanguageEnumType;
  position: number;
}> = ({ language, position }) => {
  return (
    <div style={label}>
      <div
        style={{
          fontFamily: "Mona Sans",
          fontSize: 30,
          color: "white",
          fontWeight: 300,
        }}
      >
        {position}
      </div>
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
    </div>
  );
};
