import React from "react";
import type { z } from "zod";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import type { compositionSchema } from "../../../src/config";
import { Button } from "../../Button/Button";
import { Actions } from "../Actions/Actions";
import styles from "./styles.module.css";

const downloadContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const title: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
}> = ({ inputProps }) => {
  return (
    <div className={styles.sidebarWrapper}>
      <div style={title}>
        <h2 style={{ margin: 0 }}>@{inputProps.login}</h2>
      </div>
      <div style={downloadContent}>
        <Button className={styles.downloadButton}>
          Download Video <DownloadIcon width={20} color="white" />
        </Button>
      </div>
      <div style={{ flex: 1 }} />
      <Actions />
    </div>
  );
};
