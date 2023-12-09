import type { ReactNode } from "react";
import { Button } from "../../Button/Button";
import { HoverEffect } from "../../Button/HoverEffect";
import styles from "./styles.module.css";

export const SharingActions: React.FC<{
  icon?: (params: { width: number; color: string }) => ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}> = (props) => {
  return (
    <div
      className={[styles.wrapper, props.className].join(" ")}
      onClick={props.onClick}
    >
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
        {props.icon && (
          <div className={styles.iconContainer}>
            {props.icon({ width: 16, color: "white" })}
          </div>
        )}
        {props.label}
      </div>
    </div>
  );
};

export const SharingAction: React.FC<{
  icon?: (params: { width: number; color: string }) => ReactNode;
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}> = (props) => {
  return (
    <Button style={props.style} className={props.className}>
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
        {props.icon && (
          <div className={styles.iconContainer}>
            {props.icon({ width: 16, color: "white" })}
          </div>
        )}
        {props.label}
      </div>
    </Button>
  );
};
