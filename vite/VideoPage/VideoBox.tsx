import type { PlayerRef } from "@remotion/player";
import type { SetStateAction } from "react";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import type { z } from "zod";
import type { Rocket, compositionSchema } from "../../src/config";
import { Box } from "../Box/Box";
import { useUserVideo } from "../context";
import { MobileActionsContainer } from "./MobileActionsContainer";
import { PlayerContainer } from "./Player/Player";
import { RocketPickerModal } from "./RocketSelection/RocketPickerModal";
import { Sidebar } from "./Sidebar/Sidebar";
import { VideoBoxTop } from "./VideoBoxTop";
import styles from "./styles.module.css";

export const VideoBox: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  rocket: Rocket;
  setRocket: React.Dispatch<SetStateAction<Rocket | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}> = ({ inputProps, rocket, setRocket, isModalOpen, setIsModalOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<PlayerRef>(null);

  const { status } = useUserVideo();

  const modalElement = document.getElementById("rocketModal");
  if (!modalElement) {
    return null;
  }

  return (
    <>
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
      <Box style={{ overflow: "hidden" }}>
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
            setIsModalOpen={setIsModalOpen}
            rocket={rocket}
            setIsPlaying={setIsPlaying}
            playerRef={playerRef}
            status={status}
          />
          <MobileActionsContainer />
        </div>
      </Box>
    </>
  );
};
