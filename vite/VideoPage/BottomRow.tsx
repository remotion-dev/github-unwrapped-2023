import React from "react";
import { RocketIcon } from "../../icons/RocketIcon";
import { HomeLink } from "../HomeLink";

const style: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "white",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  padding: "8px 6px",
  justifyContent: "flex-end",
  background: "rgba(255, 255, 255, 0.03)",
};

export const BottomPageRow = () => {
  return (
    <div style={style}>
      {/**
      // TODO: Make this
       */}
      <HomeLink
        href="https://example.com"
        label="How we made Unwrapped"
        icon={(props) => <RocketIcon {...props} />}
      />
    </div>
  );
};
