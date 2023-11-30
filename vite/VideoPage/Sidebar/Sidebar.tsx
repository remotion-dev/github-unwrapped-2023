import React from "react";
import type { z } from "zod";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import type { compositionSchema } from "../../../src/config";
import { Button } from "../../Button/Button";
import { FurtherActions } from "../Actions/FurtherActions";
import { SharingActions } from "../Actions/SharingActions";
import styles from "./styles.module.css";

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
}> = ({ inputProps }) => {
  return (
    <div className={styles.sidebarWrapper}>
      <div>
        <h2 className={styles.sidebarTitle}>@{inputProps.login}</h2>
        <Button className={styles.downloadButton}>
          Download Video <DownloadIcon width={20} color="white" />
        </Button>
      </div>
      {/* Sharing Actions */}
      <SharingActions />
      {/* Further Action */}
      <FurtherActions />
    </div>
  );
};
