import { RadialGradient } from "../RadialGradient";
import { Foreground } from "./Foreground";
import { Sky } from "./Sky";
import styles from "./styles.module.css";

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <RadialGradient />
      <Sky />
      <Foreground />
      <div className={styles.content}>
        <div className={styles.title}>404</div>
        <div className={styles.description}>
          The page you are looking for has vanished.
        </div>
      </div>
    </div>
  );
};
