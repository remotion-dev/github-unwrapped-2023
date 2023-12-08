import type { PlayerRef } from "@remotion/player";
import React from "react";
import type { z } from "zod";
import type { Rocket, compositionSchema } from "../../../src/config";
import { FurtherActions } from "../Actions/FurtherActions";
import { SharingActions } from "../Actions/SharingActions";
import { RocketPicker } from "../RocketSelection/RocketPicker";
import { DownloadButton } from "./DownloadButton";
import styles from "./styles.module.css";

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  startPolling: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rocket: Rocket;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.RefObject<PlayerRef>;
  progress: number;
  error: boolean;
  url: string | null;
}> = ({
  inputProps,
  progress,
  error,
  url,
  setIsModalOpen,
  rocket,
  setIsPlaying,
  playerRef,
}) => {
  return (
    <div className={styles.sidebarWrapper}>
      <div>
        <div className={styles.sidebarTitleContainer}>
          <RocketPicker
            rocket={rocket}
            setIsModalOpen={setIsModalOpen}
            setIsPlaying={setIsPlaying}
            playerRef={playerRef}
          />
          <div style={{ width: 16 }} />
          <h2>{inputProps.login}</h2>
        </div>

        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            <DownloadButton error={error} progress={progress} url={url} />
          </a>
        ) : (
          <DownloadButton error={error} progress={progress} url={url} />
        )}
      </div>
      {error && (
        <p style={{ marginTop: -12, fontSize: 14 }}>
          We{"'"}ve been notified of the error and are looking into it. Please
          try again later.
        </p>
      )}
      {/* Sharing Actions */}
      <SharingActions />

      {/* Further Action */}
      <FurtherActions />
    </div>
  );
};
