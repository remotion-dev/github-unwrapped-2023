import commonStyles from "../styles.module.css";
import { BurgerMenu } from "./BurgerMenu";
import styles from "./navbar.module.css";

export const Navbar: React.FC = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div style={{ flex: 1 }} />
      <h2 className={commonStyles.gradientText2} style={{ fontSize: 18 }}>
        #GitHubUnwrapped
      </h2>
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <BurgerMenu />
      </div>
    </div>
  );
};
