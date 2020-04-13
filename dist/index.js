"use strict";

require("@babel/polyfill");

var _graphqlYoga = require("graphql-yoga");

var _db = require("./db");

var _db2 = _interopRequireDefault(_db);

var _index = require("./resolvers/index");

var _prisma = require("./prisma");

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubsub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: _index.resolvers,
  context: function context(request) {
    return {
      db: _db2.default,
      pubsub: pubsub,
      prisma: _prisma2.default,
      request: request
    };
  },

  fragmentReplacements: _index.fragmentReplacements
});
var options = {
  port: process.env.PORT || 4000
};
server.start(function (options) {
  console.log("The server is up!");
});