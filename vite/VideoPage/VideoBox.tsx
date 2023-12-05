import type { SetStateAction } from "react";
import React from "react";
import type { z } from "zod";
import type { compositionSchema } from "../../src/config";
import { Box } from "../Box/Box";
import { RocketPickerModal } from "./Actions/RocketPickerModal";
import { MobileActionsContainer } from "./MobileActionsContainer";
import { PlayerContainer } from "./Player/Player";
import { Sidebar } from "./Sidebar/Sidebar";
import { VideoBoxTop } from "./VideoBoxTop";
import type { RocketColor } from "./page";
import styles from "./styles.module.css";

export const VideoBox: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  startPolling: boolean;
  rocket: RocketColor;
  setRocket: React.Dispatch<SetStateAction<RocketColor>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({
  inputProps,
  startPolling,
  rocket,
  setRocket,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Box style={{ overflow: "hidden", zIndex: 1 }}>
      {isModalOpen ? (
        <RocketPickerModal
          rocket={rocket}
          setRocket={setRocket}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
      <VideoBoxTop inputProps={inputProps} />
      <div className={styles.roworcolumn}>
        <PlayerContainer inputProps={inputProps} />
        <Sidebar
          inputProps={inputProps}
          startPolling={startPolling}
          setIsModalOpen={setIsModalOpen}
          rocket={rocket}
        />
        <MobileActionsContainer />
      </div>
    </Box>
  );
};
