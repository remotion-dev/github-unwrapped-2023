import { Navbar } from "../Home/Navbar";
import { NavigateBack } from "./components";
import styles from "./styles.module.css";

export const MobileHeader: React.FC = () => {
  return (
    <div className={styles.mobileHeaderWrapper}>
      <Navbar>
        <NavigateBack />
      </Navbar>
      <div className={styles.mobileHeaderContent}>
        <h1 className={styles.aboutTitle}>About</h1>
        <p className={styles.aboutDescription} style={{ maxWidth: 400 }}>
          With this page we hope to answer all your questions for the GitHub
          unwrapped 2023.
        </p>
      </div>
    </div>
  );
};
