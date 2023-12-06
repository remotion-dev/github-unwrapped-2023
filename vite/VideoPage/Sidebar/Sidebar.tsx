import React, { useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import type { compositionSchema } from "../../../src/config";
import { Button } from "../../Button/Button";
import { FurtherActions } from "../Actions/FurtherActions";
import { SharingActions } from "../Actions/SharingActions";
import styles from "./styles.module.css";

export const Sidebar: React.FC<{
  inputProps: z.infer<typeof compositionSchema>;
  startPolling: boolean;
}> = ({ inputProps, startPolling }) => {
  const [url, setUrl] = useState<string>();

  const [progress, setProgress] = useState<number>();
  const [error, setError] = useState<string>();

  const pollProgress = useMemo(
    () => async () => {
      fetch("/api/progress", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: inputProps.accentColor,
          username: window.__USER__.username,
        }),
      }).then((v) => {
        v.json().then((v) => {
          if (v.type === "done") {
            setUrl(v.url);
            return;
          }

          if (v.type === "error") {
            setError(v.message);
            console.error(v.message);
            return;
          }

          if (v.type === "progress") {
            setProgress(v.progress);
            return;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (startPolling) {
      pollProgress();
    }
  }, [startPolling]);

  useEffect(() => {
    let intervalId: any | undefined = undefined;
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
  }, [error, url, startPolling]);

  const renderDownloadButton = () => (
    <Button
      className={styles.downloadButton}
      style={
        error
          ? { pointerEvents: "none" }
          : url
            ? {}
            : {
                opacity: 0.5,
                pointerEvents: "none",
              }
      }
    >
      {url ? (
        <>
          Download Video <DownloadIcon width={20} color="white" />
        </>
      ) : error ? (
        "An error has occured"
      ) : progress !== undefined ? (
        `Generating video... (${Math.floor(progress * 100)}%)`
      ) : (
        "Generating video..."
      )}
    </Button>
  );

  return (
    <div className={styles.sidebarWrapper}>
      <div>
        <h2 className={styles.sidebarTitle}>@{inputProps.login}</h2>

        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            {renderDownloadButton()}
          </a>
        ) : (
          renderDownloadButton()
        )}
      </div>
      {error && (
        <p style={{ marginTop: -12, fontSize: 14 }}>
          We've been notified of the error and are looking into it. Please try
          again later.
        </p>
      )}
      {/* Sharing Actions */}
      <SharingActions />
      {/* Further Action */}
      <FurtherActions />
    </div>
  );
};
