import { RadialGradient } from "../RadialGradient";
import { Sky } from "./Sky";
import styles from "./styles.module.css";

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <RadialGradient />
      <Sky />
    </div>
  );
};
