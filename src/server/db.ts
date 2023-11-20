import { MongoClient } from "mongodb";
import { DB } from "../config.js";
import { backendCredentials } from "../helpers/domain.js";

type ProfileStats = {
  username: string;
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

export const ensureIndices = async () => {
  const stats = await getStatsCollection();
  await stats.createIndex({ username: 1 }, { unique: true });
};
