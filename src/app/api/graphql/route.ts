// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from "graphql-yoga";

import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";

const typeDefs = `#graphql
    type User {
      id: String
      name: String
      email: String
      emailVerified: DateTime
      image: String
    }

    type Movie {
        title: String
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Actor {
        name: String
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }
`;

const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const { handleRequest } = createYoga({
  schema: neoSchema.getSchema(),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
