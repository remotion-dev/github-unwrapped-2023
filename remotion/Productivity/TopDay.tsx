import React from "react";
import { AbsoluteFill } from "remotion";
import { PANE_BACKGROUND } from "../TopLanguages/Pane";
import { Wheel } from "./Wheel";

const label: React.CSSProperties = {
  color: "white",
  fontWeight: "bold",
  fontSize: 45,
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
          paddingLeft: 50,
          borderRadius: 50,
          position: "relative",
        }}
      >
        <div style={label}>Most productive day</div>
        <div
          style={{
            position: "absolute",
            right: 300,
          }}
        >
          <Wheel />
        </div>
      </div>
    </AbsoluteFill>
  );
};
