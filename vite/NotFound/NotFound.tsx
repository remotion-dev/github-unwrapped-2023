import buttonStyles from "../Button/styles.module.css";
import { RadialGradient } from "../RadialGradient";
import { Foreground } from "./Foreground";
import { Sky } from "./Sky";
import styles from "./styles.module.css";

export const NotFound: React.FC<{
  code: "404" | "500";
}> = ({ code }) => {
  return (
    <div className={styles.wrapper}>
      <RadialGradient />
      <Sky />
      <Foreground />
      <div className={styles.content}>
        <div className={styles.title}>{code}</div>
        <div className={styles.description}>
          {code === "404" ? (
            <div>The page you are looking for has vanished.</div>
          ) : (
            <>
              <div>An internal server error occurred.</div>
              <div>We{"'"}ve been notified about this.</div>
            </>
          )}
        </div>
        <a
          href={"/"}
          className={buttonStyles.button}
          style={{ height: 48, padding: "8px 24px", marginTop: 32 }}
        >
          Go back Home
        </a>
      </div>
    </div>
  );
};
