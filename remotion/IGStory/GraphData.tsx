import React from "react";
import { interpolateColors } from "remotion";

const Dot: React.FC<{
  index: number;
  value: number;
  max: number;
}> = ({ index, max, value }) => {
  const row = index % 7;
  const column = Math.floor(index / 7);

  const activityColor = interpolateColors(
    value,
    [0, Math.max(1, max)],
    ["#202138", "#2486ff"],
  );

  return (
    <div
      style={{
        height: 4.5,
        width: 4.5,
        borderRadius: 1.5,
        backgroundColor: activityColor,
        position: "absolute",
        left: 125 + column * 6.2,
        top: 393 + row * 8,
      }}
    />
  );
};

export const ContributionGraphic: React.FC<{
  graphData: number[];
}> = ({ graphData }) => {
  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      {graphData.map((g, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Dot key={i} max={Math.max(...graphData)} value={g} index={i} />;
      })}
    </div>
  );
};
