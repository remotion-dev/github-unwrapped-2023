import React, { useState } from "react";
import { Box } from "../Box/Box";
import { HomeBoxBottom } from "./HomeBoxBottom";
import { HomeBoxTop } from "./HomeBoxTop";
import styles from "./styles.module.css";

export const HomeBox: React.FC<{
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Box className={styles.homeBoxWrapper} style={{ maxWidth: 800 }}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <HomeBoxTop />
          <HomeBoxBottom {...props} setLoading={setLoading} />
        </>
      )}
    </Box>
  );
};
