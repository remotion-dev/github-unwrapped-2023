import React from "react";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { Button } from "../../Button/Button";
import { HoverEffect } from "../../Button/HoverEffect";
import { useUserVideo } from "../../context";
import styles from "./styles.module.css";

export const DownloadButton: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { status } = useUserVideo();

  if (status.type === "querying") {
    return (
      <Button
        className={styles.downloadButton}
        style={{ pointerEvents: "none", ...style }}
      >
        Generating video
      </Button>
    );
  }

  if (status.type === "render-error") {
    return (
      <Button
        className={styles.downloadButton}
        style={{ pointerEvents: "none", ...style }}
      >
        Download unavailable due to error
      </Button>
    );
  }

  if (status.type === "video-available") {
    return (
      <a href={status.url} target="_blank" rel="noreferrer">
        <Button
          hoverEffect
          className={styles.downloadButton}
          style={{ pointerEvents: "none", ...style }}
        >
          <HoverEffect />
          Download Video <DownloadIcon width={20} color="white" />
        </Button>
      </a>
    );
  }

  return (
    <Button
      className={[styles.downloadButton, styles.loadingButton].join(" ")}
      style={{ pointerEvents: "none", ...style }}
    >
      <div
        className={styles.loadingButtonBar}
        style={{ width: `${status.progress * 100}%`, zIndex: -1 }}
      />
      <div>Generating... ({Math.floor(status.progress * 100)}%)</div>
    </Button>
  );
};
