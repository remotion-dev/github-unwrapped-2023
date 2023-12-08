import type { PlayerRef } from "@remotion/player";
import type { SetStateAction } from "react";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import type { z } from "zod";
import type { Rocket, compositionSchema } from "../../src/config";
import { Box } from "../Box/Box";
import { MobileActionsContainer } from "./MobileActionsContainer";
import { PlayerContainer } from "./Player/Player";
import { RocketPickerModal } from "./RocketSelection/RocketPickerModal";
import { Sidebar } from "./Sidebar/Sidebar";
import { VideoBoxTop } from "./VideoBoxTop";
import styles from "./styles.module.css";
import { useVideo } from "./useVideo";

export const VideoBox: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  startPolling: boolean;
  rocket: Rocket;
  setRocket: React.Dispatch<SetStateAction<Rocket>>;
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

  const { url, progress, error } = useVideo({
    accentColor: inputProps.accentColor,
    username: inputProps.login,
    startPolling,
  });

  const modalElement = document.getElementById("rocketModal");
  if (!modalElement) {
    return null;
  }

  return (
    <Box style={{ overflow: "hidden", zIndex: 1 }}>
      {ReactDOM.createPortal(
        isModalOpen ? (
          <RocketPickerModal
            rocket={rocket}
            setRocket={setRocket}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            playerRef={playerRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ) : null,
        modalElement,
      )}

      <VideoBoxTop
        inputProps={inputProps}
        rocket={rocket}
        setIsModalOpen={setIsModalOpen}
        setIsPlaying={setIsPlaying}
        playerRef={playerRef}
      />
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
          url={url}
          progress={progress}
          error={error}
        />
        <MobileActionsContainer url={url} />
      </div>
    </Box>
  );
};
