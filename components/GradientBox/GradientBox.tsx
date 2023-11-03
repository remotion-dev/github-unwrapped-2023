import React, { ReactNode } from "react";
import styles from "./styles.module.css";

export const GradientBox: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <div className={styles.gradientBox} style={props.style}>
      {props.children}
    </div>
  );
};
