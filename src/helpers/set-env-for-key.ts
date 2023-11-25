import { awsCredentials } from "./domain.js";

export const setEnvForKey = (key: number) => {
  process.env.REMOTION_AWS_ACCESS_KEY_ID =
    // @ts-expect-error
    awsCredentials()[`AWS_KEY_${key}`];
  process.env.REMOTION_AWS_SECRET_ACCESS_KEY =
    // @ts-expect-error
    awsCredentials()[`AWS_SECRET_${key}`];
};
