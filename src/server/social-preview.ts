import type { Request, Response } from "express";
import { getProfileStatsFromCache } from "./db.js";
import { makeOrGetOgImage } from "./make-og-image.js";

const getUrl = async (username: string): Promise<string> => {
  const stats = await getProfileStatsFromCache(username);
  if (!stats) {
    throw new Error("No image for this user");
  }

  return makeOrGetOgImage(stats);
};

export const socialMediaPreview = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) {
    throw new Error("No username provided");
  }

  const imageUrl = await getUrl(username);
  const image = await fetch(imageUrl);
  const blob = await image.arrayBuffer();

  const cacheControl = `public, max-age=${60 * 60 * 24 * 7}`;
  res.set("Cache-Control", cacheControl);
  res.set("Content-Type", "image/jpeg");
  res.end(new Uint8Array(blob));
};
