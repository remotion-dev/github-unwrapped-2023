import type { PlayerRef } from "@remotion/player";
import React, { useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import type { compositionSchema } from "../../../src/config";
import { FurtherActions } from "../Actions/FurtherActions";
import { SharingActions } from "../Actions/SharingActions";
import { RocketPicker } from "../RocketSelection/RocketPicker";
import type { RocketColor } from "../page";
import { DownloadButton } from "./DownloadButton";
import styles from "./styles.module.css";

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  startPolling: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rocket: RocketColor;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.RefObject<PlayerRef>;
}> = ({
  inputProps,
  startPolling,
  setIsModalOpen,
  rocket,
  setIsPlaying,
  playerRef,
}) => {
  const [url, setUrl] = useState<string>();

  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const pollProgress = useMemo(
    () => () => {
      fetch("/api/progress", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: inputProps.accentColor,
          username: window.__USER__.username,
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
    },
    [inputProps.accentColor],
  );

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
