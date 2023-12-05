import { AwsRegion, getRegions } from "@remotion/lambda";
import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { TIMEOUT } from "dns";
import type { Request, Response } from "express";
import { DISK, RAM, RenderRequest, SITE_NAME } from "../config.js";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import { Render, findRender, saveRender } from "./db.js";
import { getProgress } from "./progress.js";

const getRandomRegion = (): AwsRegion => {
  return getRegions()[Math.floor(Math.random() * getRegions().length)];
};

export const renderEndPoint = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") return response.end();

  const { username, inputProps } = RenderRequest.parse(request.body);

  const existingRender = await findRender({
    username,
    theme: inputProps.accentColor,
  });

  if (existingRender) {
    return getProgress(existingRender).then((progress) => {
      response.json(progress);
    });
  }

  const account = getRandomAwsAccount();

  setEnvForKey(account);

  const region = getRandomRegion();

  const functionName = speculateFunctionName({
    diskSizeInMb: DISK,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
  });

  const theme = inputProps.accentColor;

  const { renderId, bucketName } = await renderMediaOnLambda({
    codec: "h264",
    functionName,
    region,
    serveUrl: SITE_NAME,
    composition: "Main",
    inputProps: inputProps,
    downloadBehavior: {
      type: "download",
      fileName: "video.mp4",
    },
  });

  const newRender: Render = {
    region,
    bucketName,
    renderId,
    username,
    functionName,
    theme,
    account,
    finality: null,
  };

  await saveRender(newRender);

  return getProgress(newRender).then((progress) => {
    response.json(progress);
  });
};
