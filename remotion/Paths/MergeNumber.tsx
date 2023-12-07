import React from "react";

export const MergeNumber: React.FC<{
  num: number;
}> = ({ num }) => {
  return (
    <div
      style={{
        fontSize: 80,
        fontFamily: "Mona Sans",
        fontWeight: "800",
        marginLeft: 10,
        color: "#fff",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {num}
    </div>
  );
};
