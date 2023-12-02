import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import commonStyles from "../styles.module.css";
import { BurgerMenu } from "./BurgerMenu";
import styles from "./navbar.module.css";

export const Navbar: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.navbarWrapper}>
      <div style={{ flex: 1, alignItems: "center" }}>{children}</div>
      <Link to={"/"}>
        <h2 className={commonStyles.gradientText2} style={{ fontSize: 18 }}>
          #GitHubUnwrapped
        </h2>
      </Link>

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
