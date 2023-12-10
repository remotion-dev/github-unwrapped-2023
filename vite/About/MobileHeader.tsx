import type { ComponentProps } from "react";
import { Navbar } from "../Home/Navbar";
import { NavigateBack } from "./components";
import styles from "./styles.module.css";

export const MobileHeader: React.FC<{
  title: string;
  description: string;
  backLink?: ComponentProps<typeof NavigateBack>["backLink"];
}> = ({ title, description, backLink }) => {
  return (
    <div className={styles.mobileHeaderWrapper}>
      <Navbar>
        <NavigateBack backLink={backLink} />
      </Navbar>
      <div className={styles.mobileHeaderContent}>
        <h1 className={styles.aboutTitle}>{title}</h1>
        <p className={styles.aboutDescription} style={{ maxWidth: 400 }}>
          {description}
        </p>
      </div>
    </div>
  );
};
