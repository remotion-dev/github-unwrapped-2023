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
        left: 20,
        top: 305,
        width: 355,
        height: 60,
        fontSize: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
      }}
    >
      <div style={{ marginRight: 10, marginLeft: 10 }}>{issues}</div>
      <div style={{ fontSize: 20, fontWeight: "500" }}>Issues closed</div>
    </div>
  );
};
