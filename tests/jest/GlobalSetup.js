require("babel-register"); // required for code running thru babel
require("@babel/polyfill/noConflict");
const server = require("../../src/server").default;
module.exports = async () => {
  console.log("started server");
  global.httpServer = await server.start({ port: 4000 });
};
