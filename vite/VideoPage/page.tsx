import { Link, useParams } from "@tanstack/react-router";
import React, { useMemo } from "react";
import type { z } from "zod";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import type { CompositionProps } from "../../types/constants";
import { Button } from "../Button/Button";
import { GradientBox } from "../GradientBox/GradientBox";
import { userRoute } from "../routing";
import { Actions } from "./Actions";
import { PlayerContainer } from "./Player";
import styles from "./styles.module.css";

const downloadContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

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
      <GradientBox style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.main}>
          <PlayerContainer inputProps={inputProps} />
          <div className={styles.information}>
            <div className={styles.title}>
              <Link to={"/"}>
                <h2 className={styles.gradientText} style={{ margin: 0 }}>
                  #GitHubUnwrapped 2023
                </h2>
              </Link>
              <h2 style={{ margin: 0 }}>@{inputProps.title}</h2>
            </div>
            <div style={downloadContent}>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  alignItems: "center",
                  fontWeight: 700,
                }}
              >
                Download Video <DownloadIcon width={20} color="white" />
              </Button>
            </div>
            <div style={{ flex: 1 }} />
            <Actions />
          </div>
        </div>
        <div className={styles.footer}>
          <RocketIcon />
          How we made Unwrapped
        </div>
      </GradientBox>
    </div>
  );
};

export default UserPage;
