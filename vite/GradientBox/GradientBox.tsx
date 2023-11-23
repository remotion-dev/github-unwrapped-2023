import type { ReactNode } from "react";
import React from "react";
import styles from "./styles.module.css";

export const GradientBox: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}> = ({ style, className, children }) => {
  return (
    <div
      className={[styles.gradientBox, className].join(" ")}
      style={{
        borderRadius: 10,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
