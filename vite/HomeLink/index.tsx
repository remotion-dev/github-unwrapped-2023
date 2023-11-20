import type { ReactNode } from "react";
import React from "react";
import styles from "./styles.module.css";

export const HomeLink: React.FC<{
  label: string;
  icon: (params: { height: number; width: number; color: string }) => ReactNode;
  href: string;
}> = ({ label, icon, href }) => {
  return (
    <a className={styles.container} href={href}>
      {icon({ height: 16, width: 16, color: "white" })}
      {label}
    </a>
  );
};
