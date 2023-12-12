import { useCallback, useEffect, useState } from "react";
import type { z } from "zod";
import type { RenderRequest, RenderResponse, Rocket } from "../../src/config";

const renderVideo = async (
  renderRequest: z.infer<typeof RenderRequest>,
  signal: AbortSignal,
): Promise<RenderResponse> => {
  const res = await fetch("/api/render", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(renderRequest),
    signal,
  });
  const json = await res.json();
  return json;
};

export type RenderStatus =
  | {
      type: "querying";
    }
  | {
      type: "error-querying";
      err: Error;
    }
  | RenderResponse;

export const useVideo = ({
  username,
  theme,
}: {
  theme: Rocket;
  username: string;
}) => {
  const [status, setStatus] = useState<RenderStatus>({ type: "querying" });

  const queryState = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await renderVideo(
          {
            theme,
            username,
          },
          signal,
        );
        setStatus(res);
        if (res.type === "render-running" && !signal.aborted) {
          setTimeout(() => queryState(signal), 1000);
        }
      } catch (err) {
        if (!signal.aborted) {
          setStatus({ type: "error-querying", err: err as Error });
        }
      }
    },
    [theme, username],
  );

  useEffect(() => {
    setStatus({ type: "querying" });

    const controller = new AbortController();
    queryState(controller.signal);
    return () => {
      controller.abort();
    };
  }, [theme, queryState, username]);

  return status;
};
