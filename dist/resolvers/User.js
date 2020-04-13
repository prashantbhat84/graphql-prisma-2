"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getuserid = require("../utils/getuserid");

var _getuserid2 = _interopRequireDefault(_getuserid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  email: {
    fragment: "fragment userid on User {id}",
    resolve: function resolve(parent, args, _ref, info) {
      var request = _ref.request;

      var userid = (0, _getuserid2.default)(request, false);
      if (userid && userid === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: "fragment userid on User{id}",
    resolve: function resolve(parent, args, _ref2, info) {
      var prisma = _ref2.prisma;

      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      }, info);
    }
  }
};

exports.default = User;