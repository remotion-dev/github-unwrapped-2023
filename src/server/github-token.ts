import { backendCredentials } from "../helpers/domain.js";

const TOKENS = 5;

export const getRandomGithubToken = (): string => {
  const index = Math.ceil(Math.random() * TOKENS);
  if (index === 1) {
    return backendCredentials().GITHUB_TOKEN_1;
  }

  if (index === 2) {
    return backendCredentials().GITHUB_TOKEN_2;
  }

  if (index === 3) {
    return backendCredentials().GITHUB_TOKEN_3;
  }

  if (index === 4) {
    return backendCredentials().GITHUB_TOKEN_4;
  }

  if (index === 5) {
    return backendCredentials().GITHUB_TOKEN_5;
  }

  throw new Error("GitHub token not found");
};
