import { Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import type { z } from "zod";
import type { CompositionProps } from "../../types/constants";
import { userRoute } from "../routing";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";

const UserPage = () => {
  const params = useParams({ from: userRoute });
  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: params.username,
    };
  }, [params.username]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileTitle}>
        <h2 className={styles.gradientText} style={{ margin: 0 }}>
          <Link to={"/"}>#GitHubUnwrapped 2023</Link>
        </h2>
        <h2 style={{ margin: 0 }}>@{inputProps.title}</h2>
      </div>
      <VideoBox inputProps={inputProps} />
    </div>
  );
};

export default UserPage;
