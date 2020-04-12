import getuserid from "../utils/getuserid";
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true,
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };
    return prisma.query.comments(opArgs, info);
  },
  async me(parent, args, { prisma, request }, info) {
    const userid = await getuserid(request);
    const user = await prisma.query.user(
      {
        where: {
          id: userid,
        },
      },
      info
    );
    if (!user) {
      throw new Error("No User found");
    }
    return user;
  },
  async post(parent, args, { prisma, request }, info) {
    const userid = await getuserid(request, false);

    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            { published: true },
            {
              author: { id: userid },
            },
          ],
        },
      },
      info
    );

    return posts[0];
  },
  async myposts(parent, args, { prisma, request }, info) {
    const userid = await getuserid(request);
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userid,
        },
      },
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }
    const posts = await prisma.query.posts(opArgs, info);
    if (posts.length === 0) {
      throw new Error("No posts found in your account");
    }
    return posts;
  },
};

export { Query as default };
