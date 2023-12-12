import React from "react";
import { AbsoluteFill } from "remotion";

export type RepoText = {
  text: string;
  opacity: number;
};

export const HeadsUpDisplay: React.FC<{
  textToDisplay: RepoText | null;
}> = ({ textToDisplay }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 500,
          height: 100,
          marginTop: -500,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: textToDisplay ? "white" : "#AC8A4B",
          fontSize: 40,
        }}
      >
        <span
          style={{
            opacity: 0.6,
            marginTop: 5,
          }}
        >
          <span
            style={{
              opacity: textToDisplay ? textToDisplay.opacity : 1,
              fontFamily: "Seven Segment",
              fontWeight: "bold",
              maxWidth: 400,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {textToDisplay ? textToDisplay.text : "repos starred"}
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
