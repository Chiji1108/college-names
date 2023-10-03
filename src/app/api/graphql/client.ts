import { GraphQLClient } from "graphql-request";

export const client = (tags: string[]) =>
  new GraphQLClient("/api/graphql", {
    fetch: (url, options) => fetch(url, { ...options, next: { tags } }),
  });
