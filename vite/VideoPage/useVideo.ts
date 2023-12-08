import { useCallback, useEffect, useState } from "react";

export const useVideo = ({
  accentColor,
  username,
  startPolling,
}: {
  accentColor: string;
  username: string;
  startPolling?: boolean;
}) => {
  startPolling = startPolling ?? true;
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
        theme: accentColor,
        username,
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
  }, [accentColor, username]);

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

  return { url, progress, error };
};
