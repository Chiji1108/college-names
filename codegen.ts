import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  // documents: "src/**/*.tsx",
  generates: {
    "src/app/api/graphql/types/": {
      preset: "client",
      plugins: [],
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;