import type { AwsRegion } from "@remotion/lambda";
import type { ObjectId, WithId } from "mongodb";
import { MongoClient } from "mongodb";
import type { ProfileStats, Rocket } from "../config.js";
import { backendCredentials } from "../helpers/domain.js";

type EmailCollection = {
  email: string;
};

type OgImageCollection = {
  lowercasedUsername: string;
  url: string;
};

type InstagramStoryCollection = {
  lowercasedUsername: string;
  url: string;
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
      reportedCost: number;
    }
  | {
      type: "error";
      errors: string;
    };

export type Render = {
  renderId: string;
  region: AwsRegion;
  username: string;
  theme: Rocket;
  bucketName: string;
  finality: Finality | null;
  functionName: string;
  account: number;
};

const getRendersCollection = async () => {
  const client = await clientPromise;
  return client.db(backendCredentials().DB_NAME).collection<Render>("renders");
};

export type ResetRequest = {
  lowerCaseUsername: string;
};

const getResetCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<ResetRequest>("reset");
};

type ProfileSchema =
  | {
      type: "found";
      lowercasedUsername: string;
      profile: ProfileStats;
    }
  | {
      lowercasedUsername: string;
      type: "not-found";
    };

const getStatsCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<ProfileSchema>("stats");
};

const dbEmailCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<EmailCollection>("email");
};

const getOgImageCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<OgImageCollection>("ogimage");
};

const getIgStoryImageCollection = async () => {
  const client = await clientPromise;
  return client
    .db(backendCredentials().DB_NAME)
    .collection<InstagramStoryCollection>("igstories");
};

export const getNumberOfRenders = async () => {
  const collection = await getRendersCollection();
  return collection.countDocuments();
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

export const getOgImage = async (username: string) => {
  const collection = await getOgImageCollection();
  const lowercasedUsername = username.toLowerCase();

  const image = await collection.findOne({
    lowercasedUsername,
  });
  return image;
};

export const getIgStory = async (username: string) => {
  const collection = await getIgStoryImageCollection();
  const lowercasedUsername = username.toLowerCase();

  const image = await collection.findOne({
    lowercasedUsername,
  });
  return image;
};

export const saveOgImage = async ({
  username,
  url,
}: {
  username: string;
  url: string;
}) => {
  const lowercasedUsername = username.toLowerCase();
  const collection = await getOgImageCollection();
  await collection.updateOne(
    {
      lowercasedUsername,
    },
    {
      $set: {
        lowercasedUsername,
        url,
      },
    },
    {
      upsert: true,
    },
  );
};

export const saveIgStory = async ({
  username,
  url,
}: {
  username: string;
  url: string;
}) => {
  const lowercasedUsername = username.toLowerCase();
  const collection = await getIgStoryImageCollection();
  await collection.updateOne(
    {
      lowercasedUsername,
    },
    {
      $set: {
        lowercasedUsername,
        url,
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

export const clearOgImagesForUsername = async (params: {
  username: string;
}) => {
  const lowercasedUsername = params.username.toLowerCase();
  const collection = await getOgImageCollection();
  await collection.deleteMany({
    lowercasedUsername,
  });
};

export const clearIgStoriesForUsername = async (params: {
  username: string;
}) => {
  const lowercasedUsername = params.username.toLowerCase();
  const collection = await getIgStoryImageCollection();
  await collection.deleteMany({
    lowercasedUsername,
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
  theme: Rocket;
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
  stats: ProfileSchema,
): Promise<boolean> => {
  const collection = await getStatsCollection();
  if (stats.type === "not-found") {
    const { type } = stats;
    await collection.updateOne(
      { lowercasedUsername: stats.lowercasedUsername },
      {
        $set: {
          type,
        },
      },
      { upsert: true },
    );
    return true;
  }

  const value = await collection.updateOne(
    { lowercasedUsername: stats.lowercasedUsername },
    {
      $set: {
        profile: stats.profile,
        type: stats.type,
      },
    },
    { upsert: true },
  );
  return value.acknowledged;
};

export const ensureIndices = async () => {
  const stats = await getStatsCollection();
  await stats.createIndex({ lowercasedUsername: 1 }, { unique: true });

  const renders = await getRendersCollection();
  await renders.createIndex({ username: 1, theme: 1 }, { unique: true });
};

export const getProfileStatsFromCache = async (
  username: string,
): Promise<ProfileStats | "not-found" | null> => {
  const collection = await getStatsCollection();
  const value = await collection.findOne({
    lowercasedUsername: username.toLowerCase(),
  });
  if (value === null) {
    return null;
  }

  if (value.type === "found") {
    return value.profile;
  }

  return "not-found";
};

export const getResetAttempts = async (username: string) => {
  const collection = await getResetCollection();

  return collection.countDocuments({
    lowerCaseUsername: username.toLowerCase(),
  });
};

export const registerResetAttempt = async (username: string) => {
  const collection = await getResetCollection();

  await collection.insertOne({
    lowerCaseUsername: username.toLowerCase(),
  });
};
