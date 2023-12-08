import type { PlayerRef } from "@remotion/player";
import type { SetStateAction } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const [url, setUrl] = useState<string | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const pollProgress = useCallback(() => {
    fetch("/api/progress", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        theme: inputProps.accentColor,
        username: inputProps.login,
      }),
    })
      .then((v) => {
        return v.json();
      })
      .then((v) => {
        if (v.type === "done") {
          setUrl(v.url);
          return;
        }

        if (v.type === "error") {
          setError(true);
          console.error(v.message);
          return;
        }

        if (v.type === "progress") {
          setProgress(v.progress);
        }
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [inputProps.accentColor, inputProps.login]);

  useEffect(() => {
    if (startPolling) {
      pollProgress();
    }
  }, [pollProgress, startPolling]);

  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined;

    if (!url && !error && startPolling) {
      intervalId = setInterval(() => {
        pollProgress();
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [error, url, startPolling, pollProgress]);

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
