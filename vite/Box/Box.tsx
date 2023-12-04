import type { ReactNode } from "react";
import React from "react";
import styles from "./styles.module.css";

export const Box: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}> = ({ style, className, children }) => {
  return (
    <div className={[styles.box, className].join(" ")} style={style}>
      {children}
    </div>
  );
};
