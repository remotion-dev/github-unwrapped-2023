import type { AwsRegion } from "@remotion/lambda";
import { getRegions } from "@remotion/lambda";
import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DISK, RAM, RenderRequest, SITE_NAME, TIMEOUT } from "../config.js";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import type { Render } from "./db.js";
import { findRender, saveRender } from "./db.js";
import { getProgress } from "./progress.js";

const getRandomRegion = (): AwsRegion => {
  return getRegions()[Math.floor(Math.random() * getRegions().length)];
};

export const renderEndPoint = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") {
    return response.end();
  }

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

  const _id = new ObjectId();

  const newRender: Render = {
    region,
    bucketName: null,
    renderId: null,
    username: username.toLowerCase(),
    functionName,
    theme,
    account,
    finality: null,
  };

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
    logLevel: "verbose",
  });

  const updatedRender: Render = {
    ...newRender,
    bucketName,
    renderId,
  };

  await saveRender(updatedRender, _id);

  return getProgress(updatedRender).then((progress) => {
    response.json(progress);
  });
};
