import NextAuth from "next-auth";
import neo4j from "neo4j-driver";
import SlackProvider from "next-auth/providers/slack";
import { Neo4jAdapter } from "@auth/neo4j-adapter";

const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!)
);

const neo4jSession = driver.session();

export default NextAuth({
  // @ts-ignore
  adapter: Neo4jAdapter(neo4jSession),
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
  ],
});
