import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { Request, Response } from "express";
import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from "../config.js";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";

export const renderEndPoint = async (request: Request, response: Response) => {
  const { body } = request;

  const account = getRandomAwsAccount();

  setEnvForKey(account);

  const functionName = speculateFunctionName({
    diskSizeInMb: DISK,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
  });

  const result = await renderMediaOnLambda({
    codec: "h264",
    functionName,
    region: REGION,
    serveUrl: SITE_NAME,
    composition: body.id,
    inputProps: body.inputProps,
    downloadBehavior: {
      type: "download",
      fileName: "video.mp4",
    },
  });

  return response.json(result);
};
