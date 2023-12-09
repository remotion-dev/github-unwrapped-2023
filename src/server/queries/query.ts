export const getQuery = (username: string | null, query: string) => {
  if (username === null) {
    return `{ viewer {${query}} }`;
  }

  return `{ user(login: "${username}") {${query}} }`;
};
