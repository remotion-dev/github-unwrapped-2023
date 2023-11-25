import { getAccountCount } from "./get-account-count.js";

export const getRandomAwsAccount = () => {
  return Math.ceil(Math.random() * getAccountCount());
};
