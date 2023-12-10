import type { PlayerRef } from "@remotion/player";
import React from "react";
import type { z } from "zod";
import type { Rocket, compositionSchema } from "../../../src/config";
import { FurtherActions } from "../Actions/FurtherActions";
import { SharingActions } from "../Actions/SharingActions";
import { RocketPicker } from "../RocketSelection/RocketPicker";
import type { RenderStatus } from "../useVideo";
import { DownloadButton } from "./DownloadButton";
import styles from "./styles.module.css";

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rocket: Rocket;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.RefObject<PlayerRef>;
  status: RenderStatus;
}> = ({
  inputProps,
  status,
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

        {status.type === "video-available" ? (
          <a href={status.url} target="_blank" rel="noreferrer">
            <DownloadButton />
          </a>
        ) : (
          <DownloadButton />
        )}
      </div>
      {status.type === "render-error" && (
        <div style={{ fontSize: 14 }}>
          We{"'"}ve been notified of the error and are looking into it. Please
          try again later.
        </div>
      )}
      {/* Sharing Actions */}
      <SharingActions accentColor={inputProps.accentColor} />

      {/* Further Action */}
      <FurtherActions />
    </div>
  );
};
