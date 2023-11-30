import React from "react";
import { AbsoluteFill } from "remotion";
import { PANE_BACKGROUND } from "../TopLanguages/Pane";

const label: React.CSSProperties = {
  color: "white",
  fontWeight: "bold",
  fontSize: 60,
  fontFamily: "Mona Sans",
};

export const TopDay: React.FC = () => {
  return (
    <AbsoluteFill style={{}}>
      <div
        style={{
          margin: 20,
          display: "flex",
          backgroundColor: PANE_BACKGROUND,
          height: 200,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={label}>Most productive day</div>
      </div>
    </AbsoluteFill>
  );
};
