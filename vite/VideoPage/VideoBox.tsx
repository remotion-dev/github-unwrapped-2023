import React from "react";
import type { z } from "zod";
import type { compositionSchema } from "../../src/config";
import { Box } from "../Box/Box";
import { MobileActionsContainer } from "./MobileActionsContainer";
import { PlayerContainer } from "./Player/Player";
import { Sidebar } from "./Sidebar/Sidebar";
import { VideoBoxTop } from "./VideoBoxTop";
import styles from "./styles.module.css";

export const VideoBox: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  startPolling: boolean;
}> = ({ inputProps, startPolling }) => {
  return (
    <Box style={{ overflow: "hidden", zIndex: 1 }}>
      <VideoBoxTop inputProps={inputProps} />
      <div className={styles.roworcolumn}>
        <PlayerContainer inputProps={inputProps} />
        <Sidebar inputProps={inputProps} startPolling={startPolling} />
        <MobileActionsContainer />
      </div>
    </Box>
  );
};
