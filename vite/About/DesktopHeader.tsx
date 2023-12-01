import {
  default as commonStyles,
  default as gradientStyles,
} from "../styles.module.css";
import { NavigateBack } from "./components";
import styles from "./styles.module.css";

export const DesktopHeader = () => {
  return (
    <div className={styles.desktopHeaderWrapper}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <NavigateBack />
        <h2 className={gradientStyles.gradientText2}>#GitHubUnwrapped</h2>
        <h1
          className={commonStyles.aboutTitle}
          style={{ margin: "16px 0 24px 0" }}
        >
          About
        </h1>
        <p className={commonStyles.aboutDescription} style={{ maxWidth: 400 }}>
          With this page we hope to answer all your questions for the GitHub
          unwrapped 2023.
        </p>
      </div>
      <div
        style={{
          width: 200,
          height: 200,
          aspectRatio: 1,
          background: "rgba(255,255,255,0.1)",
          alignSelf: "flex-end",
        }}
      >
        <img src="/preview.png" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};
