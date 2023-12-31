import type { Request, Response } from "express";
import { getRandomAwsAccount } from "../helpers/get-random-aws-account.js";
import { setEnvForKey } from "../helpers/set-env-for-key.js";
import { getProfileStatsFromCache } from "./db.js";
import { makeOrGetIgStory, makeOrGetOgImage } from "./make-og-image.js";

const getOgImageUrl = async (username: string): Promise<string> => {
  const stats = await getProfileStatsFromCache(username);
  if (stats === "not-found" || stats === null) {
    throw new Error("No image for this user" + username);
  }

  const account = getRandomAwsAccount();
  setEnvForKey(account);
  return makeOrGetOgImage(stats);
};

const getIgStoryImageUrl = async (username: string): Promise<string> => {
  const stats = await getProfileStatsFromCache(username);
  if (stats === "not-found" || stats === null) {
    throw new Error("No image for this user" + username);
  }

  const account = getRandomAwsAccount();
  setEnvForKey(account);
  return makeOrGetIgStory(stats);
};

export const socialMediaPreview = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) {
    throw new Error("No username provided");
  }

  const imageUrl = await getOgImageUrl(username);
  const image = await fetch(imageUrl);
  const blob = await image.arrayBuffer();

  const cacheControl = `public, max-age=${60 * 60 * 24 * 7}`;
  res.set("Cache-Control", cacheControl);
  res.set("Content-Type", "image/jpeg");
  res.end(new Uint8Array(blob));
};

export const igStoryImageEndpoint = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) {
    throw new Error("No username provided");
  }

  const imageUrl = await getIgStoryImageUrl(username);
  const image = await fetch(imageUrl);
  const blob = await image.arrayBuffer();

  const cacheControl = `public, max-age=${60 * 60 * 24 * 7}`;
  res.set("Cache-Control", cacheControl);
  res.set("Content-Disposition", `attachment; filename="${username}.jpeg"`);
  res.set("Content-Type", "image/jpeg");
  res.end(new Uint8Array(blob));
};
