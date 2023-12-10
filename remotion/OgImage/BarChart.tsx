import React from "react";
import { z } from "zod";
import { PANE_BACKGROUND, PANE_BORDER } from "../TopLanguages/Pane";

const Bar: React.FC<{
  progress: number;
  letter: string;
  most: boolean;
}> = ({ progress, letter, most }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
      }}
    >
      <div
        style={{
          height: 130 * progress,
          width: 30,
          background: most ? "white" : PANE_BACKGROUND,
          border: PANE_BORDER,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <div
        style={{
          fontFamily: "Mona Sans",
          fontWeight: "bold",
          marginLeft: 3,
          color: "white",
        }}
      >
        {letter}
      </div>
    </div>
  );
};

const schema = z.array(z.number());

export const BarChart: React.FC<{
  graphData: z.infer<typeof schema>;
}> = ({ graphData }) => {
  const highest = Math.max(...graphData.map((g) => g));

  return (
    <div
      style={{
        width: 400,
        position: "absolute",
        height: 180,
        top: 410,
        left: 40,
        rotate: "1deg",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      {graphData.map((_, i) => {
        return (
          <Bar
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            progress={_ / highest}
            letter={["M", "T", "W", "T", "F", "S", "S"][i]}
            most={i === 0}
          />
        );
      })}
    </div>
  );
};
