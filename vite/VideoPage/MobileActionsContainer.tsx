import React from "react";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Button } from "../Button/Button";
import { FurtherActions } from "./Actions/FurtherActions";
import styles from "./styles.module.css";

export const MobileActionsContainer: React.FC = () => {
  return (
    <div className={styles.mobileActionsContainer}>
      <div style={{ display: "flex", gap: 16 }}>
        <Button
          style={{
            flex: 1,
            gap: 8,
            height: 48,
            backgroundColor: "rgba(80, 126, 255, 1)",
            border: "none",
          }}
        >
          <DownloadIcon width={20} color="white" />
          Download
        </Button>
        <Button style={{ flex: 1, gap: 8, height: 48 }}>
          <ShareIcon width={20} color="white" />
          Share
        </Button>
      </div>
      <FurtherActions />
    </div>
  );
};
