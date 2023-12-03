import { Link } from "@tanstack/react-router";
import buttonStyles from "../Button/styles.module.css";
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
        <Link
          to={"/"}
          className={buttonStyles.button}
          style={{ height: 48, padding: "8px 24px", marginTop: 32 }}
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
};
