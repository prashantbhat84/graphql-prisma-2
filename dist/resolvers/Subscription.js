"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getuserid = require("../utils/getuserid");

var _getuserid2 = _interopRequireDefault(_getuserid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = {
  comment: {
    subscribe: function subscribe(parent, _ref, _ref2, info) {
      var postId = _ref.postId;
      var prisma = _ref2.prisma;

      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, _ref3, info) {
      var prisma = _ref3.prisma;

      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info);
    }
  },
  mypost: {
    subscribe: function subscribe(parent, args, _ref4, info) {
      var prisma = _ref4.prisma,
          request = _ref4.request;

      var userid = (0, _getuserid2.default)(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: { id: userid }
          }
        }
      }, info);
    }
  }
};

exports.default = Subscription;