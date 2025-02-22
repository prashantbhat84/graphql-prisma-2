import "@babel/polyfill/noConflict";
// import { server } from "./server";
import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import { resolvers, fragmentReplacements } from "./resolvers/index";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  source: "",
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});
const options = {
  port: process.env.PORT || 4000,
};
server.start((options) => {
  console.log("The server is up!");
});
