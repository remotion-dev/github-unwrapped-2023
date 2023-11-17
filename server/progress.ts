import type { AwsRegion } from "@remotion/lambda/client";
import {
  getRenderProgress,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { Request, Response } from "express";
import { DISK, RAM, REGION, TIMEOUT } from "../config.mjs";
import { enableCors } from "./cors";

export const progressEndPoint = async (
  request: Request,
  response: Response
) => {
  enableCors(response);
  if (request.method === "OPTIONS") return response.end();

  const { body } = request;

  const renderProgress = await getRenderProgress({
    bucketName: body.bucketName,
    functionName: speculateFunctionName({
      diskSizeInMb: DISK,
      memorySizeInMb: RAM,
      timeoutInSeconds: TIMEOUT,
    }),
    region: REGION as AwsRegion,
    renderId: body.id,
  });

  if (renderProgress.fatalErrorEncountered) {
    return response.json({
      type: "error",
      message: renderProgress.errors[0].message,
    });
  }

  if (renderProgress.done) {
    return response.json({
      type: "done",
      url: renderProgress.outputFile as string,
      size: renderProgress.outputSizeInBytes as number,
    });
  }

  return response.json({
    type: "progress",
    progress: Math.max(0.03, renderProgress.overallProgress),
  });
};
