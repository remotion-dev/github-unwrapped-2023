import React from "react";
import { RocketIcon } from "../../icons/RocketIcon";

const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "white",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  padding: "12px 20px",
  justifyContent: "flex-end",
};

export const BottomRow = () => {
  return (
    <div style={style}>
      <RocketIcon />
      How we made Unwrapped
    </div>
  );
};
