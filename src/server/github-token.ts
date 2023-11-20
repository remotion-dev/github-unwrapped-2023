import { backendCredentials } from "../helpers/domain.js";

const TOKENS = 2;

export const getRandomGithubToken = (): string => {
  const index = Math.ceil(Math.random() * TOKENS);
  if (index === 1) {
    return backendCredentials().GITHUB_TOKEN_1;
  }

  if (index === 2) {
    return backendCredentials().GITHUB_TOKEN_2;
  }

  throw new Error("GitHub token not found");
};
