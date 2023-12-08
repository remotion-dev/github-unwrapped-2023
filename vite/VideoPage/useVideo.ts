import { useCallback, useEffect, useState } from "react";
import type { z } from "zod";
import type {
  RenderRequest,
  accentColorValues,
  compositionSchema,
} from "../../src/config";

const renderVideo = (renderRequest: z.infer<typeof RenderRequest>) => {
  return fetch("/api/render", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(renderRequest),
  }).then((res) => res.json());
};

const getProgress = ({
  accentColor,
  username,
}: {
  accentColor: (typeof accentColorValues)[number];
  username: string;
}) => {
  return fetch("/api/progress", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theme: accentColor,
      username,
    }),
  }).then((v) => {
    return v.json();
  });
};

export const useVideo = ({
  accentColor,
  username,
  inputProps,
}: {
  inputProps: z.infer<typeof compositionSchema>;
  accentColor: (typeof accentColorValues)[number];
  username: string;
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (inputProps) {
      const renderRequest: z.infer<typeof RenderRequest> = {
        inputProps,
        username,
      };

      renderVideo(renderRequest).then((res) => {
        if (res.type === "done") {
          setUrl(res.url);
        } else if (res.type === "error") {
          setError(true);
        } else {
          setIsPolling(true);
        }
      });
    }
  }, [inputProps, username]);

  const pollProgress = useCallback(() => {
    getProgress({ username, accentColor })
      .then((res) => {
        if (res.type === "done") {
          setUrl(res.url);
        } else if (res.type === "error") {
          setError(true);
        } else if (res.type === "progress") {
          setProgress(res.progress);
        }
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [accentColor, username]);

  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined;

    if (!url && !error && isPolling) {
      intervalId = setInterval(() => {
        pollProgress();
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [error, url, pollProgress, isPolling]);

  return { url, progress, error };
};
