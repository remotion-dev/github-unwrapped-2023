import type { WithId } from "mongodb";
import { MongoClient } from "mongodb";
import { backendCredentials } from "../helpers/domain.js";

export type ProfileStats = {
  username: string;
  lowercasedUsername: string;
  openIssues: number;
  closedIssues: number;
  fetchedAt: number;
  loggedInWithGitHub: boolean;
};

const mongoUrl = () => {
  const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } = backendCredentials();
  return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
};

const clientPromise = new MongoClient(mongoUrl()).connect();

const getStatsCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<ProfileStats>("stats");
};

export const insertProfileStats = async (
  stats: ProfileStats
): Promise<boolean> => {
  const collection = await getStatsCollection();
  const value = await collection.updateOne(
    { lowercasedUsername: stats.lowercasedUsername },
    {
      $set: stats,
    },
    { upsert: true }
  );
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
