import type { WithId } from "mongodb";
import { MongoClient } from "mongodb";
import { DB } from "../config.js";
import { backendCredentials } from "../helpers/domain.js";

export type ProfileStats = {
  username: string;
  lowercasedUsername: string;
  openIssues: number;
  closedIssues: number;
  fetchedAt: number;
  loggedInWithGitHub: boolean;
};

const clientPromise = new MongoClient(backendCredentials().MONGO_URL).connect();

const getStatsCollection = async () => {
  const client = await clientPromise;
  return client.db(DB).collection<ProfileStats>("stats");
};

export const insertProfileStats = async (
  stats: ProfileStats
): Promise<boolean> => {
  const collection = await getStatsCollection();
  const value = await collection.insertOne(stats);
  return value.acknowledged;
};

export const getProfileStatsFromCache = async (
  username: string
): Promise<WithId<ProfileStats> | null> => {
  const collection = await getStatsCollection();
  const value = await collection.findOne({
    lowercasedUsername: username.toLowerCase(),
  });
  return value;
};

export const ensureIndices = async () => {
  const stats = await getStatsCollection();
  await stats.createIndex({ lowercasedUsername: 1 }, { unique: true });
};
