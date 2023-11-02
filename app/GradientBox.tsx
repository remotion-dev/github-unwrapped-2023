import React, { ReactNode } from "react";

const style: React.CSSProperties = {
  background:
    "linear-gradient(to right, rgba(171, 230, 195, 0.5), rgba(65, 90, 135, 0.5))",
  border: "2px solid rgba(171, 230, 195, 1)",
  borderRadius: 20,
  position: "relative",
  padding: "40px",
};

export const GradientBox: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <div style={{ ...style, ...props.style }}>
      <div>{props.children}</div>
    </div>
  );
};
