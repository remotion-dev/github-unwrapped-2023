import type { AwsRegion } from "@remotion/lambda";
import { getRegions } from "@remotion/lambda";
import {
  getRenderProgress,
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import type { RenderResponse } from "../config.js";
import { DISK, RAM, RenderRequest, SITE_NAME, TIMEOUT } from "../config.js";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import type { Render } from "./db.js";
import { findRender, saveRender, updateRender } from "./db.js";
import { getFinality } from "./progress.js";

const getRandomRegion = (): AwsRegion => {
  return getRegions()[Math.floor(Math.random() * getRegions().length)];
};

export const renderOrGetProgress = async (
  requestBody: unknown,
): Promise<RenderResponse> => {
  const { username, inputProps } = RenderRequest.parse(requestBody);

  const existingRender = await findRender({
    username,
    theme: inputProps.accentColor,
  });

  if (existingRender) {
    if (existingRender.finality) {
      if (existingRender.finality.type === "success") {
        return {
          type: "video-available",
          url: existingRender.finality.url,
        };
      }

      return {
        type: "render-error",
        error: existingRender.finality.errors[0],
      };
    }

    setEnvForKey(existingRender.account);
    const progress = await getRenderProgress({
      bucketName: existingRender.bucketName,
      functionName: existingRender.functionName,
      region: existingRender.region,
      renderId: existingRender.renderId,
    });

    if (progress.fatalErrorEncountered) {
      await updateRender({
        ...existingRender,
        finality: getFinality(progress),
      });

      return {
        type: "render-error",
        error: progress.errors[0].stack,
      };
    }

    if (progress.done && progress.outputFile) {
      await updateRender({
        ...existingRender,
        finality: getFinality(progress),
      });

      return {
        type: "video-available",
        url: progress.outputFile,
      };
    }

    return {
      type: "render-running",
      renderId: existingRender.renderId,
      progress: progress.overallProgress,
    };
  }

  const account = getRandomAwsAccount();
  const region = getRandomRegion();
  setEnvForKey(account);

  const functionName = speculateFunctionName({
    diskSizeInMb: DISK,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
  });

  const theme = inputProps.accentColor;
  const _id = new ObjectId();

  const { renderId, bucketName } = await renderMediaOnLambda({
    codec: "h264",
    functionName,
    region,
    serveUrl: SITE_NAME,
    composition: "Main",
    inputProps,
    downloadBehavior: {
      type: "download",
      fileName: `unwrapped-${username}.mp4`,
    },
  });

  const newRender: Render = {
    region,
    bucketName,
    renderId,
    username: username.toLowerCase(),
    functionName,
    theme,
    account,
    finality: null,
  };

  await saveRender(newRender, _id);

  return {
    type: "render-running",
    renderId,
    progress: 0,
  };
};

export const renderEndPoint = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") {
    return response.end();
  }

  const res = await renderOrGetProgress(request.body);

  return response.json(res);
};
