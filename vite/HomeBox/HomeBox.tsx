import React, { useState } from "react";
import { Box } from "../Box/Box";
import { Octocat } from "../Octocat";
import { HomeBoxBottom } from "./HomeBoxBottom";
import { HomeBoxTop } from "./HomeBoxTop";
import styles from "./styles.module.css";

export const HomeBox: React.FC = () => {
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  return (
    <>
      <Box className={styles.homeBoxWrapper} style={{ maxWidth: 800 }}>
        <HomeBoxTop />
        <HomeBoxBottom
          setUserNotFound={setUserNotFound}
          userNotFound={userNotFound}
        />
      </Box>
      <Octocat userNotFound={userNotFound} />
    </>
  );
};
