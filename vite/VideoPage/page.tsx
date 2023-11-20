import React, { useMemo } from "react";
import type { z } from "zod";
import type { ProfileStats } from "../../src/server/db";
import type { CompositionProps } from "../../types/constants";
import { VideoPageBackground } from "./Background";
import { VideoBox } from "./VideoBox";
import styles from "./styles.module.css";

const outer: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  backgroundColor: "#000",
};

const background: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
};

const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  alignItems: "center",
  overflow: "auto",
};

declare global {
  interface Window {
    __USER__: ProfileStats;
  }
}

export const UserPage = () => {
  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: window.__USER__.username,
    };
  }, []);

  return (
    <div style={outer}>
      <div style={background} id="videobackground">
        <VideoPageBackground />
      </div>
      <div style={container} className={styles.videobox}>
        <VideoBox inputProps={inputProps} />
      </div>
    </div>
  );
};
