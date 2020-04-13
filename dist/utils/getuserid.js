"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(request) {
  var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var headers = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (headers) {
    var token = headers.replace("Bearer ", "");

    var decodedData = _jsonwebtoken2.default.verify(token, "secret1");

    return decodedData.userId;
  }
  if (requireAuth) {
    throw new Error("Authentication required");
  }
  return null;
};
exports.default = getUserId;