import type { AwsRegion } from "@remotion/lambda";
import type { ObjectId, WithId } from "mongodb";
import { MongoClient } from "mongodb";
import type { Hour, ProductivityPerHour, Weekday } from "../config.js";
import { backendCredentials } from "../helpers/domain.js";

export type ProfileStats = {
  totalPullRequests: number;
  username: string;
  lowercasedUsername: string;
  openIssues: number;
  closedIssues: number;
  fetchedAt: number;
  loggedInWithGitHub: boolean;
  totalStars: number;
  sampleStarredRepos: string[];
  totalContributions: number;
  topLanguages: Array<{ languageName: string; color: string }>;
  bestHours: Record<string, number>;
  topWeekday: Weekday;
  topHour: Hour;
  graphData: ProductivityPerHour[];
  contributionData: number[];
};

type EmailCollection = {
  email: string;
};

const mongoUrl = () => {
  const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } = backendCredentials();
  return `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
};

const clientPromise = new MongoClient(mongoUrl()).connect();

export type Finality =
  | {
      type: "success";
      url: string;
      outputSize: number;
    }
  | {
      type: "error";
      errors: string;
    };

export type Render = {
  renderId: string | null;
  region: AwsRegion;
  username: string;
  theme: string;
  bucketName: string | null;
  finality: Finality | null;
  functionName: string;
  account: number;
};

const getRendersCollection = async () => {
  const client = await clientPromise;
  return client.db(backendCredentials().DB_NAME).collection<Render>("renders");
};

const getStatsCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<ProfileStats>("stats");
};

const dbEmailCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<EmailCollection>("email");
};

export const saveEmailAdress = async (email: string) => {
  const collection = await dbEmailCollection();
  await collection.updateOne(
    {
      email: email.toLowerCase(),
    },
    {
      $set: {
        email: email.toLowerCase(),
      },
    },
    {
      upsert: true,
    },
  );
};

export const saveRender = async (render: Render, _id: ObjectId) => {
  const coll = await getRendersCollection();
  await coll.insertOne({ ...render, _id });
};

export const updateRender = async (render: Render) => {
  const coll = await getRendersCollection();
  await coll.updateOne(
    {
      region: render.region,
      username: render.username.toLowerCase(),
      theme: render.theme,
    },
    {
      $set: render,
    },
    {
      upsert: true,
    },
  );
};

export const clearRendersForUsername = async (params: { username: string }) => {
  const collection = await getRendersCollection();
  await collection.deleteMany({
    username: params.username.toLowerCase(),
  });
};

export const clearFailedRendersForUsername = async (params: {
  username: string;
}) => {
  const collection = await getRendersCollection();
  await collection.deleteMany({
    username: params.username.toLowerCase(),
    "finality.type": "error",
  });
};

export const findRender = async (params: {
  username: string;
  theme: string;
}): Promise<WithId<Render> | null> => {
  const collection = await getRendersCollection();
  const value = await collection.findOne({
    username: params.username.toLowerCase(),
    theme: params.theme,
  });
  return value;
};

export const getEmailFromDb = async (email: string) => {
  const collection = await dbEmailCollection();
  return collection.findOne({
    email: email.toLowerCase(),
  });
};

export const insertProfileStats = async (
  stats: ProfileStats,
): Promise<boolean> => {
  const collection = await getStatsCollection();
  const { lowercasedUsername, ...statsWithoutPrimary } = stats;
  const value = await collection.updateOne(
    { lowercasedUsername: stats.lowercasedUsername },
    {
      $set: statsWithoutPrimary,
    },
    { upsert: true },
  );
  return value.acknowledged;
};

export const getProfileStatsFromCache = async (
  username: string,
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

  const renders = await getRendersCollection();
  await renders.createIndex({ username: 1, theme: 1 }, { unique: true });
};
