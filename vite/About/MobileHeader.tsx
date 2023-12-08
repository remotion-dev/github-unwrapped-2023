import { Navbar } from "../Home/Navbar";
import { NavigateBack } from "./components";
import styles from "./styles.module.css";

export const MobileHeader: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className={styles.mobileHeaderWrapper}>
      <Navbar>
        <NavigateBack />
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
