"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsontoken = function jsontoken(user) {
  return _jsonwebtoken2.default.sign({ user: user }, "secret1", {
    expiresIn: "7 days"
  });
};

exports.default = jsontoken;