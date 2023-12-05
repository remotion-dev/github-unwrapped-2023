import type { RenderProgress } from "@remotion/lambda/client";
import {
  getRenderProgress,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { Request, Response } from "express";
import { DISK, ProgressRequest, RAM, TIMEOUT } from "../config.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import type { Finality, Render } from "./db.js";
import { findRender, saveRender } from "./db.js";

export const getFinality = (
  renderProgress: RenderProgress,
): Finality | null => {
  if (renderProgress.outputFile) {
    return {
      type: "success",
      url: renderProgress.outputFile,
      outputSize: renderProgress.outputSizeInBytes as number,
    };
  }

  if (renderProgress.fatalErrorEncountered) {
    return {
      type: "error",
      errors: renderProgress.errors[0].stack,
    };
  }

  return null;
};

export const getProgress = async (render: Render) => {
  try {
    if (!render.bucketName) {
      throw new Error("Bucket name is not set.");
    }

    if (!render.renderId) {
      throw new Error("Render ID is not set.");
    }

    setEnvForKey(render.account);
    const renderProgress = await getRenderProgress({
      bucketName: render.bucketName,
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: render.region,
      renderId: render.renderId,
    });

    const finality = getFinality(renderProgress);

    console.log(JSON.stringify(renderProgress));

    await saveRender({
      ...render,
      finality,
    });

    if (renderProgress.fatalErrorEncountered) {
      return {
        type: "error",
        message: renderProgress.errors[0].message,
      };
    }

    if (renderProgress.done) {
      return {
        type: "done",
        url: renderProgress.outputFile as string,
        size: renderProgress.outputSizeInBytes as number,
      };
    }

    return {
      type: "progress",
      progress: Math.max(0.03, renderProgress.overallProgress),
    };
  } catch (error) {
    return {
      type: "error",
      message: "Something went wrong.",
    };
  }
};

export const progressEndPoint = async (
  request: Request,
  response: Response,
) => {
  if (request.method === "OPTIONS") return response.end();

  const { username, theme } = ProgressRequest.parse(request.body);

  const render = await findRender({ username, theme });

  if (!render) {
    throw new Error("Render not found.");
  }

  return response.json(await getProgress(render));
};
