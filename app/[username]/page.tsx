import type { Metadata, NextPage } from "next";
import React, { useMemo } from "react";
import { z } from "zod";
import { Button } from "../../components/Button/Button";
import { GradientBox } from "../../components/GradientBox/GradientBox";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import { CompositionProps } from "../../types/constants";
import { Actions } from "./Actions";
import { Player } from "./Player";
import styles from "./styles.module.css";

const downloadContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const videoSize: React.CSSProperties = {
  color: "rgba(211, 211, 211, 1)",
  fontSize: 14,
  fontWeight: 500,
};

type Props = { params: { username: string } };

const Home: NextPage<Props> = ({ params }) => {
  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: params.username,
    };
  }, [params.username]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileTitle}>
        <h2 className={styles.gradientText} style={{ margin: 0 }}>
          #GitHubUnwrapped 2023
        </h2>
        <h2 style={{ margin: 0 }}>@{params.username}</h2>
      </div>
      <GradientBox style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.main}>
          <Player inputProps={inputProps} />
          <div className={styles.information}>
            <div className={styles.title}>
              <h2 className={styles.gradientText} style={{ margin: 0 }}>
                #GitHubUnwrapped 2023
              </h2>
              <h2 style={{ margin: 0 }}>@{params.username}</h2>
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
              <div style={videoSize}>This MP4 has 11.4 MB.</div>
            </div>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username}'s #GitHubUnwrapped`,
  };
}

export default Home;
