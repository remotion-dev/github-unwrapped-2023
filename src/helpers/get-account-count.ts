// Define in the .env file as many AWS account credentials as possible:
// | AWS_KEY_1=
// | AWS_SECRET_1=
// | AWS_KEY_2=
// | AWS_SECRET_2=
// This method will count how many there are so they can be rotated between each other.

import { awsCredentials } from "./domain.js";

export const getAccountCount = () => {
  let count = 0;
  const credentials = awsCredentials();
  while (
    // @ts-expect-error
    credentials["AWS_KEY_" + (count + 1)] &&
    // @ts-expect-error
    credentials["AWS_SECRET_" + (count + 1)]
  ) {
    count++;
  }

  return count;
};
