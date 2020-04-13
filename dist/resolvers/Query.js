"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getuserid = require("../utils/getuserid");

var _getuserid2 = _interopRequireDefault(_getuserid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  users: function users(parent, args, _ref, info) {
    var prisma = _ref.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts: function posts(parent, args, _ref2, info) {
    var prisma = _ref2.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true
      }
    };

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments: function comments(parent, args, _ref3, info) {
    var prisma = _ref3.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    return prisma.query.comments(opArgs, info);
  },
  me: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref4, info) {
      var prisma = _ref4.prisma,
          request = _ref4.request;
      var userid, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _getuserid2.default)(request);

            case 2:
              userid = _context.sent;
              _context.next = 5;
              return prisma.query.user({
                where: {
                  id: userid
                }
              }, info);

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 8;
                break;
              }

              throw new Error("No User found");

            case 8:
              return _context.abrupt("return", user);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function me(_x, _x2, _x3, _x4) {
      return _ref5.apply(this, arguments);
    }

    return me;
  }(),
  post: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref6, info) {
      var prisma = _ref6.prisma,
          request = _ref6.request;
      var userid, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _getuserid2.default)(request, false);

            case 2:
              userid = _context2.sent;
              _context2.next = 5;
              return prisma.query.posts({
                where: {
                  id: args.id,
                  OR: [{ published: true }, {
                    author: { id: userid }
                  }]
                }
              }, info);

            case 5:
              posts = _context2.sent;
              return _context2.abrupt("return", posts[0]);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function post(_x5, _x6, _x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return post;
  }(),
  myposts: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref8, info) {
      var prisma = _ref8.prisma,
          request = _ref8.request;
      var userid, opArgs, posts;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _getuserid2.default)(request);

            case 2:
              userid = _context3.sent;
              opArgs = {
                first: args.first,
                skip: args.skip,
                after: args.after,
                orderBy: args.orderBy,
                where: {
                  author: {
                    id: userid
                  }
                }
              };

              if (args.query) {
                opArgs.where.OR = [{
                  title_contains: args.query
                }, {
                  body_contains: args.query
                }];
              }
              _context3.next = 7;
              return prisma.query.posts(opArgs, info);

            case 7:
              posts = _context3.sent;

              if (!(posts.length === 0)) {
                _context3.next = 10;
                break;
              }

              throw new Error("No posts found in your account");

            case 10:
              return _context3.abrupt("return", posts);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function myposts(_x9, _x10, _x11, _x12) {
      return _ref9.apply(this, arguments);
    }

    return myposts;
  }()
};

exports.default = Query;