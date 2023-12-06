import type { PlayerRef } from "@remotion/player";
import type { SetStateAction } from "react";
import React, { useRef, useState } from "react";
import type { z } from "zod";
import type { compositionSchema } from "../../src/config";
import { Box } from "../Box/Box";
import { MobileActionsContainer } from "./MobileActionsContainer";
import { PlayerContainer } from "./Player/Player";
import { RocketPickerModal } from "./RocketSelection/RocketPickerModal";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  return (
    <Box style={{ overflow: "hidden", zIndex: 1 }}>
      {isModalOpen ? (
        <RocketPickerModal
          rocket={rocket}
          setRocket={setRocket}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          playerRef={playerRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ) : null}
      <VideoBoxTop inputProps={inputProps} />
      <div className={styles.roworcolumn}>
        <PlayerContainer
          playerRef={playerRef}
          inputProps={inputProps}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <Sidebar
          inputProps={inputProps}
          startPolling={startPolling}
          setIsModalOpen={setIsModalOpen}
          rocket={rocket}
          setIsPlaying={setIsPlaying}
          playerRef={playerRef}
        />
        <MobileActionsContainer />
      </div>
    </Box>
  );
};
