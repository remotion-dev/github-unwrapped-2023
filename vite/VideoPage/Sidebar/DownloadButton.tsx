import React from "react";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { Button } from "../../Button/Button";
import styles from "./styles.module.css";

export const DownloadButton: React.FC<{
  url: string | null;
  error: boolean;
  progress: number;
  style?: React.CSSProperties;
}> = ({ url, error, progress, style }) => {
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

  if (progress === undefined) {
    return (
      <Button
        className={styles.downloadButton}
        style={{ pointerEvents: "none", ...style }}
      >
        Generating .mp4 file...
      </Button>
    );
  }

  if (url) {
    return (
      <Button
        className={styles.downloadButton}
        style={{ pointerEvents: "none", ...style }}
      >
        Download Video <DownloadIcon width={20} color="white" />
      </Button>
    );
  }

  return (
    <Button
      className={styles.downloadButton}
      style={{ pointerEvents: "none", ...style }}
    >
      Generating .mp4 file... ({Math.floor(progress * 100)}%)
    </Button>
  );
};
