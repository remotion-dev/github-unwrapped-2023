import { useCallback, useEffect, useState } from "react";
import type { z } from "zod";
import type {
  RenderRequest,
  RenderResponse,
  compositionSchema,
} from "../../src/config";

const renderVideo = async (
  renderRequest: z.infer<typeof RenderRequest>,
): Promise<RenderResponse> => {
  const res = await fetch("/api/render", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(renderRequest),
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
  inputProps,
}: {
  inputProps: z.infer<typeof compositionSchema>;
  username: string;
}) => {
  const [status, setStatus] = useState<RenderStatus>({ type: "querying" });

  const queryState = useCallback(async () => {
    // TODO: Abort mechanism
    try {
      const res = await renderVideo({
        inputProps,
        username,
      });
      setStatus(res);
      if (res.type === "render-running") {
        setTimeout(queryState, 1000);
      }
    } catch (err) {
      setStatus({ type: "error-querying", err: err as Error });
    }
  }, [inputProps, username]);

  useEffect(() => {
    setStatus({ type: "querying" });
    queryState();
  }, [inputProps, queryState, username]);

  return status;
};
