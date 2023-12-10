import React from "react";

const Dot: React.FC<{
  index: number;
}> = ({ index }) => {
  const row = index % 7;
  const column = Math.floor(index / 7);

  return (
    <div
      style={{
        height: 6,
        width: 6,
        borderRadius: 2,
        backgroundColor: "white",
        position: "absolute",
        left: 331 + column * 9,
        top: 290 + row * 11,
      }}
    />
  );
};

export const GraphData: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "ActiveBorder",
        rotate: "0.5deg",
      }}
    >
      {new Array(364).fill(true).map((g, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Dot key={i} index={i} />;
      })}
    </div>
  );
};
