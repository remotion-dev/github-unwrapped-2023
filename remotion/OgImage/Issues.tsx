import React from "react";

export const Issues: React.FC<{
  issues: number;
}> = ({ issues }) => {
  return (
    <div
      style={{
        position: "absolute",
        color: "white",
        fontFamily: "Mona Sans",
        left: 770,
        top: 140,
        width: 250,
        height: 60,
        fontSize: 40,
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
      }}
    >
      <div style={{ marginRight: 10, marginLeft: 10 }}>{issues}</div>
      <div style={{ fontSize: 20, fontWeight: "500" }}>Issues closed</div>
    </div>
  );
};
