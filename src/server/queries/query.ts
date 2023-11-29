export const getQuery = (username: string | null) => (query: string) => {
  if (username === null) {
    return `{ viewer {${query}} }`;
  }

  return `{ user(login: "${username}") {${query}} }`;
};

// sponsoring(first: 100) {
// 	nodes {
// 		... on  Organization {
// 			login
// 		}
// 		... on User {
// 			login
// 		}
// 	}
// }
