import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import styles from "./styles.module.css";

export const NavigateBack: React.FC<{
  backLink?: ComponentProps<typeof Link>;
}> = ({ backLink }) => {
  return (
    <Link to={"/"} className={styles.navigateBack} {...backLink}>
      <img
        src="/arrow.svg"
        style={{ width: 32, height: 32, transform: "rotate(180deg)" }}
      />
    </Link>
  );
};
