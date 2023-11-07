// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from "graphql-yoga";
import { getToken } from "next-auth/jwt";

import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import slugify from "slugify";

const typeDefs = `#graphql
    type User @mutation(operations: [UPDATE, DELETE]) @authentication(operations: [UPDATE, DELETE]) {
      id: ID! @id @unique
      name: String!
      email: String!
      emailVerified: DateTime
      image: String

      username: String! @unique @populatedBy(callback: "slug", operations: [CREATE])
      header: String
      fullName: String
      bioTags: [String!]!
      roomNumber: String
      postNumber: String
      dateOfBirth: Date
      slackChannel: String
      twitter: String
      instagram: String
      facebook: String
      linkedin: String
      website: String
      paypay: String

      badges: [Badge!]! @relationship(type: "HAS", direction: OUT)
      groups: [Group!]! @relationship(type: "BELONGS_TO", direction: OUT, properties: "GroupMembership")

      schools: [School!]! @relationship(type: "ATTENDED", direction: OUT, properties: "Education")
      companies: [Company!]! @relationship(type: "WORKED_AT", direction: OUT, properties: "Experience")

      recivedQuestions: [Question!]! @relationship(type: "RECIVED", direction: IN)
      postedQuestions: [Question!]! @relationship(type: "POSTED", direction: OUT)
      answers: [Answer!]! @relationship(type: "POSTED", direction: OUT)

      photos: [Photo!]! @relationship(type: "POSTED", direction: OUT)

      reactedAnswers: [Answer!]! @relationship(type: "REACTED", direction: OUT, properties: "Reaction")
      reactedPhotos: [Photo!]! @relationship(type: "REACTED", direction: OUT, properties: "Reaction")

      isAdmin: Boolean! @default(value: false)
      lastModified: DateTime! @timestamp
    }

    interface Reaction @relationshipProperties {
      emoji: String!
    }

    type Photo {
      id: ID! @id @unique
      image: String!
      caption: String
      width: Int!
      height: Int!

      createdBy: User! @relationship(type: "POSTED", direction: IN)
      createdAt: DateTime! @timestamp(operations: [CREATE])
      reactedUsers: [User!]! @relationship(type: "REACTED", direction: IN, properties: "Reaction")
    }

    type GroupCategory {
      id: ID! @id @unique
      name: String!
      slug: String! @unique
      defaultJoinType: JoinType! @default(value: PRIVATE)
      noteOnBio: Boolean! @default(value: false)
      groups: [Group!]! @relationship(type: "BELONGS_TO", direction: IN)
    }

    enum JoinType {
      PUBLIC
      LIMITED
      PRIVATE
    }

    type Group {
      id: ID! @id @unique
      name: String!
      image: String
      fullName: String
      category: GroupCategory! @relationship(type: "BELONGS_TO", direction: OUT)
      slackChannel: String
      startDate: Date
      endDate: Date

      users: [User!]! @relationship(type: "BELONGS_TO", direction: IN, properties: "GroupMembership")
    }

    interface GroupMembership @relationshipProperties {
      startDate: Date
      endDate: Date
      position: String
    }

    type BadgeCategroy {
      id: ID! @id @unique
      name: String!
      badges: [Badge!]! @relationship(type: "BELONGS_TO", direction: OUT)
      parent: BadgeCategroy @relationship(type: "HAS", direction: IN)
    }

    type Badge {
      id: ID! @id @unique
      name: String!
      emoji: String!
      category: BadgeCategroy @relationship(type: "BELONGS_TO", direction: IN)

      users: [User!]! @relationship(type: "HAS", direction: IN)
    }

    type School {
      id: ID! @id @unique
      name: String! @unique
      createdAt: DateTime! @timestamp(operations: [CREATE])
      createdBy: User @relationship(type: "CREATED", direction: IN)

      users: [User!]! @relationship(type: "ATTENDED", direction: IN, properties: "Education")
    }

    interface Education @relationshipProperties {
      graduationDate: Date!
      faculty: String
      activitiesAndSocieties: [String!]!
    }

    type Company {
      id: ID! @id @unique
      name: String! @unique
      createdAt: DateTime! @timestamp(operations: [CREATE])
      createdBy: User @relationship(type: "CREATED", direction: IN)

      users: [User!]! @relationship(type: "WORKED_AT", direction: IN, properties: "Experience")
    }

    interface Experience @relationshipProperties {
      startDate: Date
      endDate: Date
      position: String!
      projectsAndSkills: [String!]!
    }

    type Question {
      id: ID! @id @unique
      body: String!
      createdAt: DateTime! @timestamp(operations: [CREATE])
      createdBy: User @relationship(type: "POSTED", direction: IN)
      recivedBy: User @relationship(type: "RECIVED", direction: OUT)
      answers: [Answer!]! @relationship(type: "ANSWERED", direction: OUT)
    }

    type Answer {
      id: ID! @id @unique
      body: String!
      createdAt: DateTime! @timestamp(operations: [CREATE])
      createdBy: User! @relationship(type: "POSTED", direction: IN)
      question: Question @relationship(type: "ANSWERED", direction: IN)
      noteOnBio: Boolean! @default(value: false)

      reactedUsers: [User!]! @relationship(type: "REACTED", direction: IN, properties: "Reaction")
    }
`;

async function handler(request: Request, ctx: {}) {
  const driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!)
  );

  const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
    features: {
      authorization: { key: process.env.NEXTAUTH_SECRET! },
      populatedBy: {
        callbacks: {
          slug: async (root) => {
            if (typeof root.email === "string") {
              return slugify(root.email.split("@")[0], { lower: true });
            } else {
              throw new Error("Email is not a string");
            }
          },
        },
      },
    },
  });

  const { handleRequest } = createYoga({
    schema: await neoSchema.getSchema(),
    context: async ({ request }) => ({
      token: await getToken({
        secret: process.env.NEXTAUTH_SECRET,
        // @ts-ignore
        req: request,
      }),
    }),

    // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
    graphqlEndpoint: "/api/graphql",

    // Yoga needs to know how to create a valid Next response
    fetchAPI: { Response },
  });

  await neoSchema.assertIndexesAndConstraints({ options: { create: true } });

  return handleRequest(request, ctx);
}

export { handler as GET, handler as POST };
