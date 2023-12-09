import React from "react";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { Button } from "../../Button/Button";
import { HoverEffect } from "../../Button/HoverEffect";
import { useUserVideo } from "../../context";
import styles from "./styles.module.css";

export const DownloadButton: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { url, progress, error } = useUserVideo();

  if (error) {
    return (
      <Button
        className={styles.downloadButton}
        style={{ pointerEvents: "none", ...style }}
      >
        Download unavailable due to error
      </Button>
    );
  }

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
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
      className={styles.downloadButton}
      style={{ pointerEvents: "none", ...style }}
    >
      Generating... ({Math.floor(progress * 100)}%)
    </Button>
  );
};
