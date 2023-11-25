import { useCallback, useMemo, useState } from "react";
import type { z } from "zod";
import type { compositionSchema } from "../src/config.js";
import { getProgress, renderVideo } from "./lambda.js";

export type State =
  | {
      status: "init";
    }
  | {
      status: "invoking";
    }
  | {
      renderId: string;
      bucketName: string;
      progress: number;
      status: "rendering";
    }
  | {
      renderId: string | null;
      status: "error";
      error: Error;
    }
  | {
      url: string;
      size: number;
      status: "done";
    };

const wait = async (milliSeconds: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliSeconds);
  });
};

export const useRendering = (
  id: string,
  inputProps: z.infer<typeof compositionSchema>,
) => {
  const [state, setState] = useState<State>({
    status: "init",
  });

  const renderMedia = useCallback(async () => {
    setState({
      status: "invoking",
    });
    try {
      const { renderId, bucketName } = await renderVideo({ id, inputProps });
      setState({
        status: "rendering",
        progress: 0,
        renderId,
        bucketName,
      });

      let pending = true;

      while (pending) {
        const result = await getProgress({
          id: renderId,
          bucketName,
        });
        switch (result.type) {
          case "error": {
            setState({
              status: "error",
              renderId,
              error: new Error(result.message),
            });
            pending = false;
            break;
          }

          case "done": {
            setState({
              size: result.size,
              url: result.url,
              status: "done",
            });
            pending = false;
            break;
          }

          case "progress": {
            setState({
              status: "rendering",
              bucketName,
              progress: result.progress,
              renderId,
            });
            await wait(1000);
            break;
          }

          default:
            throw new Error("Unknown type");
        }
      }
    } catch (err) {
      setState({
        status: "error",
        error: err as Error,
        renderId: null,
      });
    }
  }, [id, inputProps]);

  const undo = useCallback(() => {
    setState({ status: "init" });
  }, []);

  return useMemo(() => {
    return {
      renderMedia,
      state,
      undo,
    };
  }, [renderMedia, state, undo]);
};
