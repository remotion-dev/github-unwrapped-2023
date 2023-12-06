import React from "react";
import { Box } from "../Box/Box";
import { HomeBoxBottom } from "./HomeBoxBottom";
import { HomeBoxTop } from "./HomeBoxTop";
import styles from "./styles.module.css";

export const HomeBox: React.FC<{
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: (v: boolean) => void;
}> = (props) => {
  return (
    <Box className={styles.homeBoxWrapper} style={{ maxWidth: 800 }}>
      <HomeBoxTop />
      <HomeBoxBottom {...props} />
    </Box>
  );
};
