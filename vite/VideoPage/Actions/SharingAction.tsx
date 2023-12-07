import type { ReactNode } from "react";
import { HoverEffect } from "../../Button/HoverEffect";
import styles from "./styles.module.css";

export const SharingAction: React.FC<{
  icon: (params: { width: number; color: string }) => ReactNode;
  label: string;
  onClick?: () => void;
}> = (props) => {
  return (
    <div className={styles.wrapper} onClick={props.onClick}>
      <HoverEffect />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          fontWeight: 500,
        }}
      >
        <div className={styles.iconContainer}>
          {props.icon({ width: 16, color: "white" })}
        </div>
        {props.label}
      </div>
    </div>
  );
};
