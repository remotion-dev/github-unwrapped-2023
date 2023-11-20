import React from "react";

const inputContainer: React.CSSProperties = {
  backgroundColor: "var(--background)",
  display: "flex",
  flexDirection: "column",
};

export const InputContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div style={inputContainer}>{children}</div>;
};
