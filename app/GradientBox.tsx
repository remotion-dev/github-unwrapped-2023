import React, { ReactNode } from "react";

const style: React.CSSProperties = {
  width: 760,
  height: 360,
  background:
    "linear-gradient(to right, rgba(171, 230, 195, 0.5), rgba(65, 90, 135, 0.5))",
  border: "2px solid rgba(171, 230, 195, 1)",
  borderRadius: 20,
  position: "relative",
  padding: 40,
};

export const GradientBox: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/decoration.svg"
        alt="decoration around the gradient box"
        style={{ width: 852, position: "absolute", top: -60, left: -48 }}
      />
      {props.children}
    </div>
  );
};
